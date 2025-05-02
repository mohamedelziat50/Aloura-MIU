import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js"
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getaccount
} from "../controllers/users.js";



const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id",upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);
router.get("/account/:id", auth(["user" , "admin"]) ,  getaccount); // Get account details for a specific user

export default router;
