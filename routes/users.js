import express from "express";
import multer from "multer";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, `${timestamp}-${cleanName}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id",upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
