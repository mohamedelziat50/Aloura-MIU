import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import auth from "../middleware/auth.js"; // Import the auth middleware
import {
  getIndex,
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
  getaccount,
} from "../controllers/frontend.js"; // Import the getAdmin function
const router = express.Router();
router.use(async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.locals.user = null; // No user found
      return next(); // ⛔ prevent the rest of the function from running
    }
    // This line won't be reached if there's no token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    next();
  }
});
router.get("/", getIndex);
router.get("/all-fragrances", getAllFragrances);
router.get("/collections", getCollectionsPage);
router.get("/fragrances-page/:id", getFragrancesPage);
router.get("/gifting", getGiftingPage);
router.get("/fragrance-quiz", getFragranceQuizPage);
router.get("/our-story", getOurStoryPage);
router.get("/nightlife-collection", getNightlifeCollectionPage);
router.get("/account/:id", auth(["user", "admin"]), getaccount);
router.get("/checkout", auth(["user", "admin"]),getCheckout);
router.get("/admin/:id", auth(["admin"]), getAdmin);
router.get("/editUser/:id", auth(["admin"]), editUser);
router.get("/addFragrance", auth(["admin"]), getAddFragrance);
router.get("/editFragrance/:id", auth(["admin"]), geteditFragrance);
export default router;
