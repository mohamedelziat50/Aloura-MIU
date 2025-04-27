import express from "express";
const router = express.Router();
import UserModel from "../models/user.js";
import moment from "moment";
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

router.get("/admin/:id", auth(["admin"]), (req, res) => {
  UserModel.find()
  .then((result) => {
    res.render("admin/admin", { arr: result, moment: moment });
  })
  .catch((err) => {
    console.log(err);
  });
});
router.get("/addUser",auth(["admin"]), (req, res) => res.render("admin/addUser"));
router.get("/editUser/:id", auth(["admin"]), async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Editing user with ID:", userId);

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("admin/editUser", { user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
});


export default router;
