import express from "express";
import multer from "multer"; // import multer here
import { signup, login, verifyEmail, logout } from "../controllers/auth.js";

const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // folder to save profile pics
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, '-').toLowerCase(); // replace spaces with "-" and lowercase
    cb(null, `${timestamp}-${cleanName}`);
  },
});

const upload = multer({ storage: storage });
router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify/:id", verifyEmail);

export default router;
