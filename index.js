import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));
app.get("/all-fragrances", (req, res) => res.render("all-fragrances"));
app.get("/admin", (req, res) => res.render("admin"));
app.get("/checkout", (req, res) => res.render("checkout"));
app.get("/fluid-only", (req, res) => res.render("fluid-only"));
app.get("/fragrances-for-men", (req, res) => res.render("fragrances-for-men"));
app.get("/fragrances-for-women", (req, res) =>
  res.render("fragrances-for-women")
);
app.get("/fragrances-page", (req, res) => res.render("fragrances-page"));
app.get("/our-story", (req, res) => res.render("our-story"));
app.get("/unisex-fragrances", (req, res) => res.render("unisex-fragrances"));

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
