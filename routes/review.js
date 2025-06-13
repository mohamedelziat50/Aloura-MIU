import express from "express";
import {
  createReview,
  deleteReview,
  markReviewStatus
} from "../controllers/review.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(["user", "admin"]), createReview)
router.delete("/delete/:id", auth([ "admin"]), deleteReview);
router.put("/status", auth([ "admin"]), markReviewStatus);

// router.post("/" , auth(["user"]), createReview);
// router.get("/", auth(["user" , "admin"]), getAllReviews);
// router.get("/:id", getReviewById);

export default router;
