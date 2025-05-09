import FragranceModel from "../models/fragrance.js";
import UserModel from "../models/user.js";
import moment from "moment";

export const getIdex = (req, res) => {
  res.render("index");
};

export const getAllFragrances = (req, res) => {
  res.render("all-fragrances");
};

export const getCollectionsPage = (req, res) => {
  res.render("collections");
};

export const getFragrancesPage = (req, res) => {
  res.render("fragrances-page");
};

export const getGiftingPage = (req, res) => {
  res.render("gifting");
};

export const getFragranceQuizPage = (req, res) => {
  res.render("fragrance-quiz");
};

export const getOurStoryPage = (req, res) => {
  res.render("our-story");
};

export const getNightlifeCollectionPage = (req, res) => {
  res.render("nightlife-collection");
};

export const getAdmin = async (req, res) => {
  Promise.all([UserModel.find(), FragranceModel.find()])
    .then(([users, fragrances]) => {
      res.render("admin/admin", {
        arr: users,
        fragrance: fragrances,
        moment,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

export const getAddFragrance = (req, res) => {
  res.render("admin/addFragrance");
};

export const getAddUser = async (req, res) => res.render("admin/addUser");

export const geteditFragrance = async (req, res) => {
  try {
    const fragranceId = req.params.id;

    const fragrance = await FragranceModel.findById(fragranceId);
    if (!fragrance) {
      return res.status(404).send("Fragrance not found");
    }

    res.render("admin/editFragrance", { fragrance });
  } catch (err) {
    console.error("Error fetching fragrance:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("admin/editUser", { user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
};
