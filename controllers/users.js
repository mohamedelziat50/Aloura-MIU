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

// Delete user (prevent deletion if user has orders)
export const deleteUser = async (req, res) => {
  try {
    // Check first whether the user getting deleted is associated with an order
    const Order = (await import("../models/order.js")).default;
    const ordersWithUser = await Order.find({ user: req.params.id }).limit(1);
    if (ordersWithUser.length > 0) {
      return res.status(400).json({
        message: "❌ Cannot delete: This user has existing orders.",
      });
    }

    // If not then delete user
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchUsers = async (req, res) => {
  const search = req.query.search || "";
  const regex = new RegExp(search, "i");

  try {
    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
    }).lean();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
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

export const increaseCartItem = async (req, res) => {
  const { productId, size } = req.body;

  if (!productId || !size) {
    return res.status(400).json({
      success: false,
      message: "Product ID and size are required.",
    });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const item = user.cart.find(
      (i) => i.fragrance.toString() === productId && i.size === size
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found." });
    }

    item.quantity += 1;
    await user.save();

    return res.json({ success: true, message: "Quantity increased." });
  } catch (error) {
    console.error("Increase quantity error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const decreaseCartItem = async (req, res) => {
  const { productId, size } = req.body;

  if (!productId || !size) {
    return res.status(400).json({
      success: false,
      message: "Product ID and size are required.",
    });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const item = user.cart.find(
      (i) => i.fragrance.toString() === productId && i.size === size
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found." });
    }

    if (item.quantity <= 1) {
      return res
        .status(400)
        .json({ success: false, message: "Minimum quantity reached." });
    }

    item.quantity -= 1;
    await user.save();

    return res.json({ success: true, message: "Quantity decreased." });
  } catch (error) {
    console.error("Decrease quantity error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fragranceId, size } = req.body;

    if (!fragranceId) {
      return res.status(400).json({
        success: false,
        message: "Missing fragranceId.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          cart: {
            fragrance: fragranceId,
            ...(size ? { size } : {}), // only match size if provided
          },
        },
      }
    );

    return res.json({
      success: true,
      message: "Item removed from cart successfully.",
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while removing item from cart.",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.fragrance");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching cart.",
    });
  }
};
