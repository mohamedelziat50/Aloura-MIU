import express from "express";
const router = express.Router();
import {
  getFragrancesPage,
  getunisex_fragrance,
  getfragrances_for_women,
  getfragrances_for_men,
  getcollections,
  getour_story,
  getallFragrancesPage,

} from "../controllers/publicRouts.js";


router.get("/fragrances-page", getFragrancesPage);
router.get("/all-fragrances", getallFragrancesPage);
router.get("/our-story", getour_story);
router.get("/unisex-fragrances", getunisex_fragrance);
router.get("/fragrances-for-women", getfragrances_for_women);
router.get("/fragrances-for-men", getfragrances_for_men);
router.get("/collections", getcollections);


export default router;
