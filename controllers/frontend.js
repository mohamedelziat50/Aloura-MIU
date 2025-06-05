import FragranceModel from "../models/fragrance.js";
import UserModel from "../models/user.js";
import OrderModel from "../models/order.js"
import moment from "moment";

// List of Arab countries close to Egypt + Egypt
var country_list = [
  "Egypt", "Palestine", "Syria", "Lebanon", "Saudi Arabia", "United Arab Emirates"
];

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

// Handle the GET Request for the checkout page
export const getCheckout = async (req, res) => {
  try {
    // Get the user's object populated with the fragrance's full details
    const user = await UserModel.findById(req.user.id).populate("cart.fragrance");
    
    //  Variable for shipping fee & tax
    const shippingFee = 0
    const tax = 0

    // Only render checkout when cart has items
    if(user.cart.length > 0) {
      // Render the page with the user's data to be displayed inside the ejs
      res.render("checkout", {user: user, shippingFee: shippingFee, tax: tax, country_list: country_list});
    }
    else {
      // Handle if there are no items what to do - will be done next commit
    }
    
  }
  catch(error) {
    console.log("Checkout Error: " + error)
    res.status(500).send("Server Error")
  }
  
};

export const getCollectionsPage = (req, res) => {
  res.render("collections");
};

export const getFragrancesPage = async (req, res) => {
  try {
    const fragranceId = req.params.id;
    const fragrance = await FragranceModel.findById(fragranceId);
    if (!fragrance) return res.status(404).send("fragrance not found");

    // Get all fragrances EXCEPT the current one
    const allFragrances = await FragranceModel.find({ _id: { $ne: fragranceId } });

    res.render("fragrances-page", { fragrance, allFragrances });
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
  Promise.all([UserModel.find(), FragranceModel.find(), OrderModel.find()])
    .then(([users, fragrances, orders]) => {
      res.render("admin/admin", {
        arr: users,
        fragrance: fragrances,
        orders: orders,
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
