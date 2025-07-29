// controllers/chatbotController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GENAI } from "../config/secrets.js";

const genAI = new GoogleGenerativeAI(GENAI);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Example product list (can be replaced with DB query)
const products = [
  {
    name: "Spicebomb Extreme",
    gender: "Male",
    sizes: [
      { size: "30ml", price: "600 LE" },
      { size: "50ml", price: "1200 LE" },
      { size: "100ml", price: "1500 LE" },
    ],
  },
  {
    name: "Black Orchid",
    gender: "Unisex",
    sizes: [
      { size: "30ml", price: "600 LE" },
      { size: "50ml", price: "1200 LE" },
      { size: "100ml", price: "1500 LE" },
    ],
  },
  {
    name: "Dior Sauvage",
    gender: "Male",
    sizes: [
      { size: "30ml", price: "600 LE" },
      { size: "50ml", price: "1200 LE" },
      { size: "100ml", price: "1500 LE" },
    ],
  },
  {
    name: "Libre by YSL",
    gender: "Female",
    sizes: [
      { size: "30ml", price: "600 LE" },
      { size: "50ml", price: "1200 LE" },
      { size: "100ml", price: "1500 LE" },
    ],
  },
  {
    name: "Aventus by Creed",
    gender: "Male",
    sizes: [
      { size: "30ml", price: "600 LE" },
      { size: "50ml", price: "1200 LE" },
      { size: "100ml", price: "1500 LE" },
    ],
  },
];

export const handleMessage = async (req, res) => {
  const { message, pageUrl } = req.body;

  // Format product info for the prompt
  const productInfo = products
    .map((p) => {
      const sizeList = p.sizes.map((s) => `${s.size}ml – EGP${s.price}`).join(", ");
      return `- ${p.name} (${p.gender}): ${sizeList}`;
    })
    .join("\n");

  try {
    const result = await model.generateContent([
      `You are Aloura Assistant, an AI assistant for the Aloura fragrance website.
      Respond to user questions briefly and simply.
      Focus on fragrance products, pricing, gender preferences, and recommendations and the founders of Aloura fragrance are Ramy Slait and Mohamed nasser.
      The meaning of aloura is that my GOD is my light.
      

      The user is currently visiting: ${pageUrl}.
      
     Website Structure:
      - Home: Highlights featured fragrances and includes gender-based sections (For Him & For Her).
      - Collections: Showcases different fragrance categories such as seasonal or themed collections.
      - Fragrances: This is our official shop page where users can browse and purchase all available fragrances.
      - Fragrance Quiz: Offers personalized perfume recommendations based on the user's preferences.
      - Gifting: Contains special gift bundles and curated sets for occasions.
      - Nightlife Collection: A dedicated section for bold and evening-ready scents.
      - Our Story: Explains Aloura’s brand identity, values, and origin.
      - Account: Lets users manage their profiles and orders.
      - Cart / Checkout: Users can review selected items and place their orders.
      - all these pages can be found in the navigation bar for helping the user if asked
      
      Key Features:
      - User authentication (signup/login)
      - Product browsing by gender and collection
      - Personalized fragrance recommendations
      - Gift wrapping and customization
      - Express delivery in Cairo and Giza
      - Dark mode support
      - Responsive design for all devices
      
      Here are the current available fragrances:
      ${productInfo}

      Now answer this question in a friendly tone,and with emoji when helpful:
      ${message}`,
    ]);

    const response = await result.response;
    const rawText = response.text();
    const text = rawText.replace(/\*/g, "");

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini SDK Error:", error.message || error);
    res.status(500).json({ reply: "AI error occurred. Please try again." });
  }
};
