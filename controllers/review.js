import Review from '../models/review.js';

// Create
export const createReview = async (req, res) => {
  try {
    const { fragrance, rating, comment } = req.body;

    if (!res.locals.user) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const review = await Review.create({
      fragrance,
      user: res.locals.user._id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('fragrance user');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('fragrance user');
    if (!review) return res.status(404).json({ error: 'Not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
