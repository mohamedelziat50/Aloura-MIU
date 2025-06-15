import express from "express";
import { getQuizRecommendation } from "../controllers/fragrance.js";

const router = express.Router();

// POST /api/quiz/recommend
router.post("/recommend", getQuizRecommendation);

export default router;
