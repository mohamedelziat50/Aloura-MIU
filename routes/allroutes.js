import express from "express";
const router = express.Router();
import UserModel from "../models/mydataSchema.js";
import moment from "moment";
import sendEmail from "../utilities/emailService.js";

router.get("/", (req, res) => res.render("index"));
router.get("/all-fragrances", (req, res) => res.render("all-fragrances"));
router.get("/checkout", (req, res) => res.render("checkout"));
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
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    if (await UserModel.findOne({ email })) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    if (await UserModel.findOne({ tel: phone })) {
      return res.status(409).json({ message: "phone is already taken" });
    }

    const newUser = new UserModel({ name, email, tel: phone, password });
    await newUser.save();

    console.log("🎉 New user created:", newUser);
    sendEmail({to: email, subject: "Verify your email!", text: `Hello ${name}, please verify your email by clicking this link: http://localhost:3000/verify/${newUser._id}`});
    res
      .status(201)
      .json({ message: "User signed up successfully!", user: newUser });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
    //make jason a render and make a design for it
  } catch (error) {
    console.error("❌ Error during email verification:", error);
    res.status(500).json({ message: "Server error." });
  }
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
