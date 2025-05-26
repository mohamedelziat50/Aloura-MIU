import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import {
  updateUser,
  deleteUser,
  addToCart,
  removeFromCart,
  increaseCartItem,
  decreaseCartItem,
  getCart,
} from "../controllers/users.js";

const router = express.Router();

router.put("/increase", auth(["user", "admin"]), increaseCartItem);
router.put("/decrease", auth(["user", "admin"]), decreaseCartItem);
router.post("/addToCart", auth(["user", "admin"]), addToCart);
router.delete("/removefromcart", auth(["user", "admin"]), removeFromCart);
router.get("/cart", auth(["user", "admin"]), getCart);
router.put("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
