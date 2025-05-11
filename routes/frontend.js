import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import auth from "../middleware/auth.js"; // Import the auth middleware
import Fragrances from "../models/fragrance.js"; // Import the Fragrances model
import {
  getIdex,
  getAllFragrances,
  getAdmin,
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
} from "../controllers/frontend.js"; // Import the getAdmin function
const router = express.Router();
router.use(async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.locals.user = null; // No user found
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    next();
  }
});
router.get("/", getIdex);
router.get("/all-fragrances", getAllFragrances);
router.get("/collections", getCollectionsPage);
router.get("/fragrances-page/:id", getFragrancesPage);
router.get("/gifting", getGiftingPage);
router.get("/fragrance-quiz", getFragranceQuizPage);
router.get("/our-story", getOurStoryPage);
router.get("/nightlife-collection", getNightlifeCollectionPage);
router.get("/checkout", auth(["user", "admin"]),getCheckout);
router.get("/admin/:id", auth(["admin"]), getAdmin);
router.get("/addFragrance", auth(["admin"]), getAddFragrance);
router.get("/editUser/:id", auth(["admin"]), editUser);
router.get("/editFragrance/:id", auth(["admin"]), geteditFragrance);
export default router;
