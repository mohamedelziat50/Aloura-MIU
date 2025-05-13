import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.put("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
