import express from "express";
const router = express.Router();
import UserModel from "../models/user.js";
import moment from "moment";
import jwt from "jsonwebtoken"; // Add jwt for decoding token
import auth from "../middleware/auth.js";

router.use(async (req, res, next) => {
  try{
  const token = req.cookies?.jwt;

  if (!token) {
    res.locals.user = null; // No user found
    next();
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);


  res.locals.user = await UserModel.findById(decoded.id);
  next();
  }
  catch (error) {
    next();
  }
});

router.get("/", (req, res) => res.render("index"));
router.get("/all-fragrances", (req, res) => res.render("all-fragrances"));
router.get("/gifting", (req, res) => res.render("gifting"));
router.get("/checkout", auth(["user", "admin"]), (req, res) =>
  res.render("checkout")
);
router.get("/fluid-only", (req, res) => res.render("fluid-only"));
router.get("/fragrances-for-men", (req, res) =>
  res.render("fragrances-for-men")
);
router.get("/fragrances-for-women", (req, res) =>
  res.render("fragrances-for-women")
);
router.get("/fragrances-page", (req, res) => res.render("fragrances-page"));
router.get("/our-story", (req, res) => res.render("our-story"));
router.get("/unisex-fragrances", (req, res) => res.render("unisex-fragrances"));
router.get("/fragrance-quiz", (req, res) => res.render("fragrance-quiz"));
router.get("/collections", (req, res) => res.render("collections"));

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
      res.redirect("/admin");
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
