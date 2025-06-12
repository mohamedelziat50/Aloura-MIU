import express from "express";
import {
  createReview,
  deleteReview
} from "../controllers/review.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(["user", "admin"]), createReview)
router.delete("/delete/:id", auth([ "admin"]), deleteReview);

// router.post("/" , auth(["user"]), createReview);
// router.get("/", auth(["user" , "admin"]), getAllReviews);
// router.get("/:id", getReviewById);
// router.put("/:id", updateReview);

export default router;
