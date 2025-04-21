import express from "express";
import { signup, login, verifyEmail } from "../controllers/auth.js"; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:id", verifyEmail);

export default router;
