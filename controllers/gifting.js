// controllers/giftingController.js
import Gift from "../models/gifting.js";
import UserModel from "../models/user.js";

export const createGift = async (req, res) => {
  try {
    const {
      perfume,
      wrap,
      card,
      recipientName,
      message,
      totalPrice,
    } = req.body;

    // Log the incoming data
    console.log("Received gift data:", req.body);
    console.log("User from request:", req.user);

    // Validate required fields
    if (!perfume?.name || !wrap?.name || !card?.name) {
      return res.status(400).json({
        error: "Missing required fields",
        details: ["Perfume, wrap, and card names are required"]
      });
    }

    if (!recipientName) {
      return res.status(400).json({
        error: "Missing required fields",
        details: ["Recipient name is required"]
      });
    }

    // Ensure prices are numbers
    const perfumePrice = Number(perfume.price) || 0;
    const wrapPrice = Number(wrap.price) || 0;
    const finalTotalPrice = Number(totalPrice) || 0;

    // Create the gift
    const gift = new Gift({
      user: req.user.id,
      perfume: {
        name: perfume.name,
        price: perfumePrice,
        image: perfume.image
      },
      wrap: {
        name: wrap.name,
        price: wrapPrice
      },
      card: {
        name: card.name
      },
      recipientName,
      message: message || "",
      totalPrice: finalTotalPrice
    });

    // Log the gift object before saving
    console.log("Creating gift:", gift);

    // Save the gift
    const savedGift = await gift.save();
    console.log("Saved gift:", savedGift);

    // Add gift to user's gifts array
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $push: { gifts: savedGift._id } },
      { new: true }
    ).populate('gifts');

    console.log("Updated user with gifts:", updatedUser);

    res.status(201).json(savedGift);
  } catch (err) {
    console.error("Gift creation error:", err);
    
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      console.error("Validation errors:", validationErrors);
      return res.status(400).json({ 
        error: "Invalid gift data", 
        details: validationErrors
      });
    }

    if (err.name === 'CastError') {
      return res.status(400).json({
        error: "Invalid data format",
        details: [err.message]
      });
    }

    res.status(500).json({ 
      error: "Something went wrong while creating the gift order",
      details: [err.message]
    });
  }
};

// Get all gifts for the logged-in user
export const getAllGifts = async (req, res) => {
  try {
    console.log("Fetching gifts for user:", req.user.id);
    
    // First get the user with populated gifts
    const user = await UserModel.findById(req.user.id).populate('gifts');
    
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
    await UserModel.findByIdAndUpdate(
      req.user.id,
      { $pull: { gifts: gift._id } }
    );

    res.status(200).json({ message: "Gift deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
