import User from "../models/user.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, isVerified, oldpassword, newpassword } =
      req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the email is used by another user
    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== id) {
      return res.status(409).json({ message: "❌ Email is already taken" });
    }

    // Check if the phone is used by another user
    const existingPhone = await User.findOne({ phone });
    if (existingPhone && existingPhone._id.toString() !== id) {
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

export const addToCart = async (req, res) => {
  const { productId, size, price } = req.body;

  // Check if all required data is provided
  if (!productId || !size || price == null) {
    return res.status(400).json({
      success: false,
      message: "Product ID, size, and price are required.",
    });
  }

  try {
    // Ensure the user is authenticated
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if item with same productId + size already exists in cart
    const existingCartItem = user.cart.find(
      (item) => item.fragrance.toString() === productId && item.size === size
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1; // Just increase quantity
    } else {
      // Add new cart item with price if needed
      user.cart.push({
        fragrance: productId,
        size,
        price, // If you store price per unit in the cart
        quantity: 1,
      });
    }

    await user.save();

    // Optional: return updated cart count
    const cartCount = user.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    res.json({
      success: true,
      message: "Product added to cart.",
      cartCount, // used for live cart updates
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred on the server." });
  }
};
