import Review from '../models/review.js';
import Fragrance from '../models/fragrance.js';

// Create review
export const createReview = async (req, res) => {
    const { rating, comment, fragranceId } = req.body;

    // Validation
    if (!rating || rating == 0) {
        return res
        .status(400)
        .json({ message: "❌ Rating is required." });
    }
    if (!comment || comment.toString().trim() === "") {
        return res
        .status(400)
        .json({ message: "❌ Review's comment is required." });
    }

    // Get the fragrance's id and validate
    const fragrance = await Fragrance.findById(fragranceId);
    if (!fragrance) {
        return res
        .status(400)
        .json({ message: "❌ Fragrance not found." });
    }

    // Create the review
    const review = new Review({
        fragrance: fragrance._id,
        user: req.user.id,
        rating,
        comment
    });

    try {
        // Save the review
        await review.save();

        // Backend must send a response (success or error) for the frontend to work.
        res.status(201).json({ message: "✅ Review added successfully" });
    } catch (error) {
        console.log(`Review Data Save Error: ${error}`);
        res.status(500).json({ error: "Failed to add review" });
    }

}

//   try {
//     const { fragrance, rating, comment } = req.body;

//     if (!res.locals.user) {
//       return res.status(401).json({ error: "Unauthorized. User not found." });
//     }

//     const review = await Review.create({
//       fragrance,
//       user: res.locals.user._id,
//       rating,
//       comment,
//     });

//     res.status(201).json(review);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Read all
// export const getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find().populate('fragrance user');
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Read one
// export const getReviewById = async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id).populate('fragrance user');
//     if (!review) return res.status(404).json({ error: 'Not found' });
//     res.json(review);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update
// export const updateReview = async (req, res) => {
//   try {
//     const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(review);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete
// export const deleteReview = async (req, res) => {
//   try {
//     await Review.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Review deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
