import express from "express";
import upload from "../middleware/multer.js";
import {
  signup,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  subscriberList,
  forgotPasswordPhone,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify/:id", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password-phone", forgotPasswordPhone);
router.post("/reset-password", resetPassword);
router.post("/subscribe", subscriberList);

export default router;
