import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/" , auth(["user"]), createReview);
router.get("/", auth(["user" , "admin"]), getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
