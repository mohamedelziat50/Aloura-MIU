import express from "express";
import upload from "../middleware/multer.js";
import {
  createFragrance,
  getFragranceById,
  updateFragrance,
  deleteFragrance,
  getFragranceDetails,
  getTransitionSliderFragrances,
} from "../controllers/fragrance.js";

const router = express.Router();

// Upload configuration - supports both regular images and transition image
const uploadFields = upload.fields([
  { name: 'images', maxCount: 3 },
  { name: 'transitionImage', maxCount: 1 }
]);

router.post("/", uploadFields, createFragrance);
router.get("/details/:id", getFragranceDetails);
router.get("/transition-slider/:gender", getTransitionSliderFragrances);
router.get("/:id", getFragranceById);
router.put("/:id", uploadFields, updateFragrance);
router.delete("/:id", deleteFragrance);

export default router;
