import FragranceModel from "../models/fragrance.js";
import UserModel from "../models/user.js";
import OrderModel from "../models/order.js";
import GiftingModel from "../models/gifting.js";
import moment from "moment";

// List of Arab countries close to Egypt + Egypt
var country_list = [
  "Egypt",
  "Palestine",
  "Syria",
  "Lebanon",
  "Saudi Arabia",
  "United Arab Emirates",
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
    const user = await UserModel.findById(req.user.id).populate(
      "cart.fragrance"
    );

    //  Variable for shipping fee & tax
    const shippingFee = 0;
    const tax = 0;

    // Only render checkout when cart has items
    if (user.cart.length > 0) {
      // Render the page with the user's data to be displayed inside the ejs
      res.render("checkout", {
        user: user,
        shippingFee: shippingFee,
        tax: tax,
        country_list: country_list,
      });
    } else {
      // Redirect to all-fragrances if cart is empty
      return res.redirect("/all-fragrances");
    }
  } catch (error) {
    console.log("Checkout Error: " + error);
    res.status(500).send("Server Error");
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
    const allFragrances = await FragranceModel.find({
      _id: { $ne: fragranceId },
    });

    res.render("fragrances-page", { fragrance, allFragrances });
  } catch (err) {
    console.error("Error fetching Fragrance:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getGiftingPage = async (req, res) => {
  const user = await UserModel.findById(req.user.id).populate("cart.fragrance");
  console.log(user);
  await FragranceModel.find()
    .then((fragrances) => {
      res.render("gifting", {
        fragrance: fragrances,
        user: user, // pass user here
      });
      console.log(user.gifts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
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
  try {
    // Fetch all users, fragrances, and orders with populated references
    const [users, fragrances, orders, subscribedUsers] = await Promise.all([
      UserModel.find(),
      FragranceModel.find(),
      OrderModel.find().populate("user items.fragrance"),
      UserModel.find({ subscriberList: true }), // <-- get users who subscribed
    ]);

    res.render("admin/admin", {
      arr: users,
      fragrance: fragrances,
      orders: orders,
      subscribedUsers,
      moment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
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
  // Find all orders associated with this user
  const orders = await OrderModel.find({ user: req.params.id });
  // Pass the user and the order count to the page
  res.render("account", { orderCount: orders.length });
};

export const getUserOrders = async (req, res) => {
  // Find all user orders by his id (passed through auth middleware) + Populate the order because we're about to use all the info
  const orders = await OrderModel.find({ user: req.params.id }).populate(
    "user items.fragrance"
  );

  // If order doesn't exist
  if (!orders) {
    return res.status(400).json({ message: "❌ Orders not found." });
  }

  // Otherwise pass the order that mtached the id and render the page
  res.render("user-orders", { orders: orders, moment: moment });
};

export const getOrder = async (req, res) => {
  // Populate the order because we're about to use all the info
  const order = await OrderModel.findById(req.params.id).populate(
    "user items.fragrance"
  );

  // If order doesn't exist
  if (!order) {
    return res.status(400).json({ message: "❌ Order not found." });
  }

  // Otherwise pass the order that mtached the id and render the page
  res.render("admin/viewOrder", { order: order, moment: moment });
};
