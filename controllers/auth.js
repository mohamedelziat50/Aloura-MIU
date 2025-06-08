import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utilities/emailService.js";
import {
  generateVerificationEmail,
  generatePasswordResetEmail,
  generateSubscriberWelcomeEmail,
} from "../utilities/emailtemplates.js";
import { JWT_SECRET } from "../config/secrets.js";
import { JWT_EXPIRY } from "../config/secrets.js";
import ms from "ms";
import sendSMS from "../utilities/smsService.js";
import sendSMStwilio from "../utilities/twilio.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

const cookieOptions = {
  httpOnly: true,
  maxAge: ms(JWT_EXPIRY), // 1 hour
  sameSite: "lax", // important!
  secure: false, // only true when using HTTPS
};

export const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const profilePicture = req.file ? req.file.filename : null; // get uploaded picture filename if it exists

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the email is already taken
    if (await UserModel.findOne({ email })) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    // Check if the phone number is already taken
    if (await UserModel.findOne({ phone })) {
      return res.status(409).json({ message: "Phone number is already taken" });
    }

    // Create the new user
    const newUser = new UserModel({
      name,
      email,
      phone,
      password,
      profilePic: profilePicture
        ? `/uploads/${profilePicture}`
        : `/uploads/defaultProfilePic.png`,
    });
    await newUser.save();

    // Generate a token for the new user
    const token = generateToken(newUser.id, newUser.role);

    // Check if there's already a JWT cookie (e.g., for admin user) and only set a token for the new user if no token exists
    if (!req.cookies.jwt) {
      // If there's no JWT token in the cookies, set a new token for the new user
      res.cookie("jwt", token, cookieOptions);
    } else {
      // If there's already a JWT token (e.g., admin logged in), don't overwrite it
      console.log("JWT token already exists, not overwriting it.");
    }

    console.log("🎉 New user created:", newUser);
    // so here write the html you want to be send in the email
    const htmlContent = generateVerificationEmail(newUser.name, newUser._id);

    sendEmail({
      to: email,
      subject: "Verify your email!",
      text: `Hello ${name}, please verify your email by clicking this link: http://localhost:3000/api/auth/verify/${newUser._id}`, // this will show if the user do not support html email
      html: htmlContent,
    });

    // Respond with a success message and the newly created user
    res.status(201).json({ message: "Signed up successfully!", user: newUser });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const token = generateToken(user.id, user.role);
    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("❌ Error during email verification:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt", cookieOptions);
  res.redirect("/");
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with that email." });
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let verificationCode = "";
    for (let i = 0; i < 4; i++) {
      verificationCode += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }

    user.resetPasswordCode = verificationCode;
    user.resetPasswordCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();
    // Now send the email
    const htmlContent = generatePasswordResetEmail(user.name, verificationCode);

    await sendEmail({
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your verification code is: ${verificationCode}`,
      html: htmlContent,
    });

    res.status(200).json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error("❌ Error during forgot password:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Inside auth.js controller
export const resetPassword = async (req, res) => {
  const { code, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ resetPasswordCode: code });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    if (
      !user.resetPasswordCodeExpires ||
      user.resetPasswordCodeExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Code has expired." });
    }

    user.password = await newPassword;

    // Clear the reset code and expiry
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpires = null;

    await user.save();

    res.status(200).json({ message: "Password successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const subscriberList = async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.subscriberList) {
      return res
        .status(400)
        .json({ message: "This User is already subscribed." });
    }

    user.subscriberList = true;
    await user.save();

    const htmlContent = generateSubscriberWelcomeEmail(user.name);

    await sendEmail({
      to: email,
      subject: "Welcome to Our Subscriber List! 🎉",
      text: `Thank you for subscribing to our newsletter!`,
      html: htmlContent,
    });

    return res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const forgotPasswordPhone = async (req, res) => {
  let { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    const user = await UserModel.findOne({ phone });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with that phone number." });
    }

    // Generate 4-letter verification code
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let verificationCode = "";
    for (let i = 0; i < 4; i++) {
      verificationCode += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }

    // Save to user model
    user.resetPasswordCode = verificationCode;
    user.resetPasswordCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send SMS
    const normalizedPhone = user.phone.startsWith("+")
      ? user.phone
      : `+20${user.phone}`;
    await sendSMS(
      normalizedPhone,
      `Your password reset verification code is: ${verificationCode}`
    );

    // Uncomment the line below if you want to use Twilio for sending SMS
    // await sendSMStwilio(
    //   normalizedPhone,
    //   `Your password reset verification code is: ${verificationCode}`
    // );

    res.status(200).json({ message: "Verification code sent to your phone." });
  } catch (error) {
    console.error("❌ Error during forgot password via phone:", error);
    res.status(500).json({ message: "Server error." });
  }
};
