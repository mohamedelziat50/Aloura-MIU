import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import moment from "moment";
// improted the moment library for formating the time user created and updated later on and will use the moment().format() , moment().FromNow()

import UserModel from "./models/mydataSchema.js";
dotenv.config();
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));
app.get("/all-fragrances", (req, res) => res.render("all-fragrances"));
// app.get("/admin", (req, res) => res.render("admin"));
app.get("/checkout", (req, res) => res.render("checkout"));
app.get("/fluid-only", (req, res) => res.render("fluid-only"));
app.get("/fragrances-for-men", (req, res) => res.render("fragrances-for-men"));
app.get("/fragrances-for-women", (req, res) =>
  res.render("fragrances-for-women")
);
app.get("/fragrances-page", (req, res) => res.render("fragrances-page"));
app.get("/our-story", (req, res) => res.render("our-story"));
app.get("/unisex-fragrances", (req, res) => res.render("unisex-fragrances"));
app.get("/fragrance-quiz", (req, res) => res.render("fragrance-quiz"));
app.get("/collections", (req, res) => res.render("collections"));

app.post("/signUp", (req, res) => {
  const User = new UserModel(req.body);

  User.save()
    .then(() => {
      console.log("User Created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/admin", (req, res) => {
  // result ==> array of objects
  console.log("--------------------------------------------");
  UserModel.find()
    .then((result) => {
      res.render("admin", { arr: result , moment : moment });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose
  .connect(process.env.monogoDb_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
