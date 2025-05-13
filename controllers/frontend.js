import FragranceModel from "../models/fragrance.js";
import UserModel from "../models/user.js";
import moment from "moment";

export const getIndex = (req, res) => {
  res.render("index");
};

export const getAllFragrances = async (req, res) => {
  FragranceModel.find()
    .then((fragrances) => {
      res.render("all-fragrances", {
        fragrance: fragrances,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

export const getCheckout = (req, res) => {
  res.render("checkout");
};

export const getCollectionsPage = (req, res) => {
  res.render("collections");
};

export const getFragrancesPage = async (req, res) => {
  try {
    const fragranceId = req.params.id;
    const fragrance = await FragranceModel.findById(fragranceId);
    if (!fragrance) {
      return res.status(404).send("fragrance not found");
    }

    res.render("fragrances-page", { fragrance });
  } catch (err) {
    console.error("Error fetching Fragrance:", err);
    res.status(500).send("Internal Server Error");
  }
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

export const getaccount = async (req, res) => {
  res.render("account");
};
