// controllers/giftingController.js
import Order from "../models/order.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";
import fragranceModel from "../models/fragrance.js";

export const createGift = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      perfume, // this will be the name now
      wrap,
      card,
      recipientName,
      message,
      price,
      size,
      quantity = 1,
    } = req.body;

    // ✅ 1. Find perfume by name
    const foundPerfume = await fragranceModel.findOne({ name: perfume.name });
    if (!foundPerfume) {
      return res.status(404).json({ error: "Perfume not found by name" });
    }

    // ✅ 2. Validate values
    const priceNum = Number(price);
    const quantityNum = Number(quantity);

    if (isNaN(priceNum) || priceNum < 0) {
      return res
        .status(400)
        .json({ error: "Price must be a non-negative number." });
    }
    if (isNaN(quantityNum) || quantityNum < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1." });
    }

    // ✅ 3. Push gift to cart
    user.cart.push({
      fragrance: foundPerfume._id, // now using ID from name lookup
      size: size || "30ml",
      quantity: quantityNum,
      price: priceNum,
      wrap,
      card,
      recipientName,
      message: message || null,
      category: "gift",
    });

    await user.save();

    res.status(201).json({ message: "Gift added to cart" });
  } catch (err) {
    console.error("❌ Error in createGift:", err);
    res.status(500).json({
      error: "Something went wrong while creating the gift order",
    });
  }
};

// Get all gifts for the logged-in user
export const getAllGifts = async (req, res) => {
  try {
    console.log("Fetching gifts for user:", req.user.id);

    // First get the user with populated gifts
    const user = await UserModel.findById(req.user.id).populate("gifts");

    if (!user) {
      console.log("User not found:", req.user.id);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Found user with gifts:", user.gifts);

    // Sort gifts by creation date
    const sortedGifts = user.gifts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(sortedGifts);
  } catch (err) {
    console.error("Error fetching gifts:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get a specific gift by ID
export const getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findOne({ _id: req.params.id, user: req.user.id });
    if (!gift) return res.status(404).json({ error: "Gift not found" });
    res.status(200).json(gift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a gift (if you allow gift modifications)
export const updateGift = async (req, res) => {
  try {
    const gift = await Gift.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!gift) return res.status(404).json({ error: "Gift not found" });

    res.status(200).json(gift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a gift
export const deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findOne({ _id: req.params.id, user: req.user.id });

    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }

    await Gift.findByIdAndDelete(gift._id);

    // Remove gift from user's gifts array
    await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: { gifts: gift._id },
    });

    res.status(200).json({ message: "Gift deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
