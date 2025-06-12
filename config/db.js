// Connect database here
import mongoose from "mongoose";
import { MONGO_DB_URI } from "./secrets.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
