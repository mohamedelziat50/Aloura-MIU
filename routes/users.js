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

router.get("/account/:id", auth(["user"]) ,  getaccount)
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id",upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
