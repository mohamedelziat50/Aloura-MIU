import express from "express";
import upload from "../middleware/multer.js";
import {
  createFragrance,
  getAllFragrances,
  getFragranceById,
  updateFragrance,
  deleteFragrance,
} from "../controllers/fragrance.js";


const router = express.Router();

router.post("/",upload.array("images", 3), createFragrance);
router.get("/", getAllFragrances);
router.get("/:id", getFragranceById);
router.put("/:id", updateFragrance);
router.delete("/:id", deleteFragrance);

export default router;
