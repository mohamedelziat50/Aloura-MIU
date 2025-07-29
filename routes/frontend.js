import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import auth from "../middleware/auth.js"; // Import the auth middleware
import { JWT_SECRET } from "../config/secrets.js";

import {
  getIndex,
  getAllFragrances,
  getAdmin,
  getOrder,
  getAddFragrance,
  editUser,
  geteditFragrance,
  getCollectionsPage,
  getFragrancesPage,
  getGiftingPage,
  getFragranceQuizPage,
  getOurStoryPage,
  getNightlifeCollectionPage,
  getCheckout,
  getaccount,
  getUserOrders,
  getUserReviews,
} from "../controllers/frontend.js"; // Import the getAdmin function

// Import fragrance details controller
import { getFragranceDetails } from "../controllers/fragrance.js";
const router = express.Router();
router.use(async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.locals.user = null;
      return next();
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    // Populate cart.fragrance
    res.locals.user = await UserModel.findById(decoded.id).populate(
      "cart.fragrance"
    );
    next();
  } catch (error) {
    next();
  }
});
router.get("/", getIndex);
router.get("/all-fragrances", getAllFragrances);
router.get("/collections", getCollectionsPage);
router.get("/fragrances-page/:id", getFragrancesPage);
router.get("/gifting", auth(["user", "admin"]), getGiftingPage);
router.get("/fragrance-quiz", auth(["user", "admin"]), getFragranceQuizPage);
router.get("/fragrance/details/:id", getFragranceDetails);
router.get("/debug/fragrances", async (req, res) => {
  try {
    const { default: Fragrance } = await import("../models/fragrance.js");
    const fragrances = await Fragrance.find({}).select("name topNotes middleNotes baseNotes previewLanding sizeOptions");
    res.json(fragrances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/our-story", getOurStoryPage);
router.get("/nightlife-collection", getNightlifeCollectionPage);
router.get("/account/:id", auth(["user", "admin"]), getaccount);
router.get("/user-orders/:id", auth(["user", "admin"]), getUserOrders);
router.get("/user-reviews/:id/:orderId/:itemIndex", getUserReviews);
router.get("/checkout", auth(["user", "admin"]), getCheckout);
router.get("/admin/:id", auth(["admin"]), getAdmin);
router.get("/order/:id", auth(["admin"]), getOrder);
router.get("/editUser/:id", auth(["admin"]), editUser);
router.get("/addFragrance", auth(["admin"]), getAddFragrance);
router.get("/editFragrance/:id", auth(["admin"]), geteditFragrance);
export default router;
