import express from "express";
import upload from "../middleware/multer.js";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";



const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id",upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
