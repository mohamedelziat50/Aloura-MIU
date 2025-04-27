import express from "express";
import { JWT_SECRET } from "../config/secrets.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js"; 
import Fragrances from "../models/fragrance.js"; // Import the Fragrances model

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.locals.user = null; // No user found
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = await UserModel.findById(decoded.id);
    console.log(res.locals.user);
    next();
  } catch (error) {
    next();
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/all-fragrances", (req, res) => {
  Fragrances.find()
  .then((result) => {
    res.render("all-fragrances", { fragrances : result});
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/collections", (req, res) => {
  res.render("collections");
});

router.get("/gifting", (req, res) => {
  res.render("gifting");
});

router.get("/fragrance-quiz", (req, res) => {
  res.render("fragrance-quiz");
});

router.get("/our-story", (req, res) => {
  res.render("our-story");
});

export default router;
