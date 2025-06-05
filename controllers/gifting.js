// controllers/giftingController.js
import Gift from '../models/gifting.js';
import UserModel from '../models/user.js';

// Create a new gift
export const createGift = async (req, res) => {
  try {
    console.log("Authenticated user:", req.user); // Debug

    const { perfume, wrap, card, recipientName, message, totalPrice } = req.body;

    if (!perfume?.name || !wrap?.name || !card?.name || !recipientName || !totalPrice) {
      return res.status(400).json({ 
        error: 'All fields are required',
        receivedData: req.body // For debugging
      });
    }

    const gift = new Gift({
      user: req.user.id, // Changed from _id to id to match your auth middleware
      perfume,
      wrap,
      card,
      recipientName,
      message: message || '',
      totalPrice
    });

    const savedGift = await gift.save();
    res.status(201).json(savedGift);
    
  } catch (err) {
    console.error("Gift creation error:", err);
    res.status(500).json({ 
      error: 'Failed to create gift',
      details: err.message
    });
  }
};

// Get all gifts for the logged-in user
export const getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(gifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific gift by ID
export const getGiftById = async (req, res) => {
  try {
    const gift = await Gift.findOne({ _id: req.params.id, user: req.user._id });
    if (!gift) return res.status(404).json({ error: 'Gift not found' });
    res.status(200).json(gift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a gift (if you allow gift modifications)
export const updateGift = async (req, res) => {
  try {
    const gift = await Gift.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!gift) return res.status(404).json({ error: 'Gift not found' });

    res.status(200).json(gift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a gift
export const deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findOne({ _id: req.params.id, user: req.user._id });

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    await Gift.findByIdAndDelete(gift._id);

    res.status(200).json({ message: 'Gift deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
