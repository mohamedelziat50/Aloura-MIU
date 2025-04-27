import User from "../models/user.js";

// Create new user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const userId = req.params.id;

    // Check if email already exists for another user
    if (email) {
      const existingEmailUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingEmailUser) {
        return res.status(400).json({ message: "Email is already in use by another user" });
      }
    }

    // Check if phone already exists for another user
    if (phone) {
      const existingPhoneUser = await User.findOne({ phone, _id: { $ne: userId } });
      if (existingPhoneUser) {
        return res.status(400).json({ message: "Phone number is already in use by another user" });
      }
    }

    // Now safe to update
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
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
