import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { editUser, getAdmin, getAddUser ,getAddFragrance } from "../controllers/admin.js";

router.get("/admin/:id", auth(["admin"]), getAdmin);
router.get("/addUser", auth(["admin"]), getAddUser);
router.get("/editUser/:id", auth(["admin"]), editUser);
router.get("/addFragrance", auth(["admin"]), getAddFragrance);

export default router;
