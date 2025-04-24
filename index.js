import express from "express";

import allRoutes from "./routes/allroutes.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import publicRoutes from "./routes/publicRoutes.js";


const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser())


app.use(authRoutes);
app.use(allRoutes);
app.use(publicRoutes);


