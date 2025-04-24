import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import {PORT} from "./config/secrets.js";

import userRouter from "./routes/userS.js";

const app = express();

// middlewares

app.use(express.urlencoded({ extended: true })); //read the req.body
app.use(express.json()); //read the req.body
app.use(cookieParser()); // read the cookies
app.use(express.static("public")); // serve static files from public directory
app.set("view engine", "ejs"); // set the view engine to ejs

connectDB();

//routes

app.use("/api/users/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
