import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken"; // Add jwt for decoding token
import auth from "../middleware/auth.js";

router.get("/", (req, res) => res.render("index"));
router.get("/gifting", (req, res) => res.render("gifting"));
router.get("/checkout", auth(["user", "admin"]), (req, res) =>
  res.render("checkout")
);
router.get("/fluid-only", (req, res) => res.render("fluid-only"));

router.get("/fragrance-quiz", (req, res) => res.render("fragrance-quiz"));

router.get("/user/:id", (req, res) => res.redirect("/"));


export default router;
