import express from "express";
import {
  createFragrance,
  getAllFragrances,
  getFragranceById,
  updateFragrance,
  deleteFragrance,
} from "../controllers/fragrance.js";

const router = express.Router();

router.post("/", createFragrance);
router.get("/", getAllFragrances);
router.get("/:id", getFragranceById);
router.put("/:id", updateFragrance);
router.delete("/:id", deleteFragrance);

export default router;
