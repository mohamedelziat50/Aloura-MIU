import Review from '../models/review.js';
import Fragrance from '../models/fragrance.js';
import Order from '../models/order.js';

// Create review
export const createReview = async (req, res) => {
    const { rating, comment, fragranceId, orderId, itemIndex } = req.body;

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

        // Mark the order item as reviewed
        if (orderId && itemIndex !== undefined) {
            const order = await Order.findById(orderId);
            if (order && order.items[itemIndex]) {
                order.items[itemIndex].isReviewed = true;
                await order.save();
            }
        }

        // Backend must send a response (success or error) for the frontend to work.
        res.status(201).json({ message: "✅ Review added successfully" });
    } catch (error) {
        console.log(`Review Data Save Error: ${error}`);
        res.status(500).json({ error: "Failed to add review" });
    }

}


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "review not found" });
    res.status(200).json({ message: `✅ review deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const markReviewStatus = async (req, res) => {
  const { reviewId, status } = req.body;

  try {
    // Find review by id
    const review = await Review.findById(reviewId);
    if (!review) return res.status(400).json({ error: "review not found" });

    // // Update status
    // if (!status) {
    //   return res.status(400).json({ error: "Status not found" });
    // }
    if (review.status === status) {
      return res.status(400).json({ error: `review is already marked as '${status}'.` });
    }

    // If we passed all these checks now change the status
    review.status = status;
    // Save the result
    await review.save()

    res.status(200).json({ message: `✅ review is updated to ${review.status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
