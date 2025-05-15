// routes/chatbot.js
import express from "express";
import { handleMessage } from "../controllers/chatbot.js";

const router = express.Router();

router.post("/message", handleMessage); // /api/chatbot/message

export default router;
