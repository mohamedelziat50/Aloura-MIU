import express from "express";
const router = express.Router();
import UserModel from "../models/mydataSchema.js";
import moment from "moment";


router.get("/", (req, res) => res.render("index"));
router.get("/all-fragrances", (req, res) => res.render("all-fragrances"));
router.get("/checkout", (req, res) => res.render("checkout"));
router.get("/fluid-only", (req, res) => res.render("fluid-only"));
router.get("/fragrances-for-men", (req, res) => res.render("fragrances-for-men"));
router.get("/fragrances-for-women", (req, res) =>
  res.render("fragrances-for-women")
);
router.get("/fragrances-page", (req, res) => res.render("fragrances-page"));
router.get("/our-story", (req, res) => res.render("our-story"));
router.get("/unisex-fragrances", (req, res) => res.render("unisex-fragrances"));
router.get("/fragrance-quiz", (req, res) => res.render("fragrance-quiz"));
router.get("/collections", (req, res) => res.render("collections"));
router.post("/signUp", (req, res) => {
  UserModel.create(req.body)
    .then(() => {
      console.log("User Created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/admin", (req, res) => {
  UserModel.find()
    .then((result) => {
      res.render("admin", { arr: result, moment: moment });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/delete/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.error(err);
    });
});


export default router;