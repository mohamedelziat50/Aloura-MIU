import express from "express";
import upload from "../middleware/multer.js";
import { signup, login, verifyEmail, logout ,forgotPassword } from "../controllers/auth.js";

const router = express.Router();



router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify/:id", verifyEmail);
router.post("/api/auth/forgot-password", forgotPassword);

export default router;
