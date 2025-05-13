import User from "../models/user.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, isVerified, oldpassword, newpassword } =
      req.body;

    // Check if the email is used by another user
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "❌ Email is already taken" });
    }
    // Check if the phone is used by another user
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res
        .status(409)
        .json({ message: "❌ Phone number is already taken" });
    }
    // Password update
    if (oldpassword && newpassword) {
      const isMatch = await bcrypt.compare(oldpassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }
      user.password = newpassword;
    }

    // Profile picture logic
    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    } else if (typeof req.body.profilePicture === "string") {
      user.profilePic = req.body.profilePicture;
    }

    // Other fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role) user.role = role;
    if (typeof isVerified !== "undefined") user.isVerified = isVerified;

    await user.save();

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
