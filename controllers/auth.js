import UserModel from "../models/user.js";
import sendEmail from "../utilities/emailService.js";
import jwt from "jsonwebtoken";
``;

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const cookieOptions = {
  httpOnly: true,
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  sameSite: "lax", // important!
  secure: false, // only true when using HTTPS
};

export const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const profilePicture = req.file ? req.file.filename : null;  // get uploaded picture filename if it exists


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
      profilePic: profilePicture ? `/uploads/${profilePicture}` : `/uploads/defaultProfilePic.png`
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
    // Optionally, you can send a verification email
    // sendEmail({
    //   to: email,
    //   subject: "Verify your email!",
    //   text: `Hello ${name}, please verify your email by clicking this link: http://localhost:3000/verify/${newUser._id}`,
    // });

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

    user.verified = true;
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
