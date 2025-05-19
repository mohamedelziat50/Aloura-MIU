import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { updateUser, deleteUser ,addToCart  } from "../controllers/users.js";

const router = express.Router();

router.put("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);
router.post('/addToCart', auth(["user" , "admin"]), addToCart);


export default router;
