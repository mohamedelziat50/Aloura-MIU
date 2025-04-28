import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import multer from "multer";  

import { editUser, getAdmin, getAddUser ,getAddFragrance } from "../controllers/admin.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // folder where images will be saved (you can change it)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });







router.get("/admin/:id", auth(["admin"]), getAdmin);
router.get("/addUser", auth(["admin"]), getAddUser);
router.get("/editUser/:id", auth(["admin"]), editUser);
router.get("/addFragrance", auth(["admin"]), getAddFragrance);

export default router;
