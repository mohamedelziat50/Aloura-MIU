import express from "express";
const router = express.Router();
import UserModel from "../models/user.js";
import moment from "moment";
import jwt from "jsonwebtoken"; // Add jwt for decoding token
import auth from "../middleware/auth.js";

router.use(async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      res.locals.user = null; // No user found
      next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    next();
  }
});

router.get("/", (req, res) => res.render("index"));
router.get("/gifting", (req, res) => res.render("gifting"));
router.get("/checkout", auth(["user", "admin"]), (req, res) =>
  res.render("checkout")
);
router.get("/fluid-only", (req, res) => res.render("fluid-only"));

router.get("/fragrance-quiz", (req, res) => res.render("fragrance-quiz"));

router.get("/user/:id", (req, res) => res.redirect("/"));

router.get("/admin/:id", auth(["admin"]), (req, res) => {
  UserModel.find()
    .then((result) => {
      res.render("admin", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" }); // ✅ JSON response
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" }); // ✅ JSON error
    });
});


export default router;
