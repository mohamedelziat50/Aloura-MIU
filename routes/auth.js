import express from "express";
import { signup, login, verifyEmail , logout } from "../controllers/auth.js"; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify/:id", verifyEmail);

export default router;
