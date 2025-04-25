import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  fragrance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fragrance',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
