import express from "express";
import upload from "../middleware/multer.js";
import {
  createFragrance,
  getFragranceById,
  updateFragrance,
  deleteFragrance,
  getFragranceDetails,
} from "../controllers/fragrance.js";

const router = express.Router();

router.post("/", upload.array("images", 3), createFragrance);
router.get("/details/:id", getFragranceDetails);
router.get("/:id", getFragranceById);
router.put("/:id", upload.array("images", 3), updateFragrance);
router.delete("/:id", deleteFragrance);

export default router;
