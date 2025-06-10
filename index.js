import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config/secrets.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import fragranceRoutes from "./routes/fragrance.js";
import reviewRoutes from "./routes/review.js";
import orderRoutes from "./routes/order.js";
import frontendRouter from "./routes/frontend.js";
import chatbotRoutes from "./routes/chatbot.js";
import giftingRoutes from "./routes/gifting.js";


const app = express();

// middlewares

app.use(express.urlencoded({ extended: true })); //read the req.body
app.use(express.json({ limit: '2mb' })); // read the req.body with a 2MB size limit
app.use(cookieParser()); // read the cookies
app.use(express.static("public")); // serve static files from public directory
app.set("view engine", "ejs"); // set the view engine to ejs
  
connectDB();

//routes
app.use(frontendRouter);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fragrances", fragranceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/gifting", giftingRoutes);


app.use((req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
