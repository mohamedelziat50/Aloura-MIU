// controllers/orderController.js
import Order from "../models/order.js";
import Fragrance from "../models/fragrance.js";
import User from "../models/user.js";
import moment from "moment";
import fetch from "node-fetch";

export const createOrder = async (req, res) => {
  // // req.body only contains what you send; destructuring is for checking clarity and safety.
  const { fullName, email, phone, shippingAddress, paid, cardData, binData } =
    req.body;

  // Customer Information Validation
  if (!fullName || fullName.toString().trim() === "") {
    return res
      .status(400)
      .json({ message: "❌ Full Name is required in customer information." });
  }
  if (!email || email.toString().trim() === "") {
    return res
      .status(400)
      .json({ message: "❌ Email is required in customer information." });
  }
  if (!phone || phone.toString().trim() === "") {
    return res.status(400).json({
      message: "❌ Phone Number is required in customer information.",
    });
  }

  // Shipping Address Validation
  if (
    !shippingAddress.address ||
    shippingAddress.address.toString().trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "❌ Address is required in shipping address." });
  }
  if (
    !shippingAddress.apartment ||
    shippingAddress.apartment.toString().trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "❌ Apartment is required in shipping address." });
  }
  if (!shippingAddress.city || shippingAddress.city.toString().trim() === "") {
    return res
      .status(400)
      .json({ message: "❌ City is required in shipping address." });
  }
  if (
    !shippingAddress.state ||
    shippingAddress.state.toString().trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "❌ State is required in shipping address." });
  }
  if (
    !shippingAddress.country ||
    shippingAddress.country.toString().trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "❌ Country is required in shipping address." });
  }

  // Payment Method Validation (If not COD)
  if (paid) {
    if (!cardData.cardNumber || cardData.cardNumber.toString().trim() === "") {
      return res
        .status(400)
        .json({ message: "❌ Card Number is required in payment method." });
    }
    if (!cardData.expiry || cardData.expiry.toString().trim() === "") {
      return res
        .status(400)
        .json({ message: "❌ Card Expiry is required in payment method." });
    }
    if (!cardData.cvv || cardData.cvv.toString().trim() === "") {
      return res
        .status(400)
        .json({ message: "❌ Card CVV is required in payment method." });
    }
    if (!cardData.cardName || cardData.cardName.toString().trim() === "") {
      return res
        .status(400)
        .json({ message: "❌ Card Name is required in payment method." });
    }
  }

  // Get the user's id (through the middleware - user's id from auth used to find the actual user object from his schema)
  const user = await User.findById(req.user.id);

  // Defensive: check if user and user.cart exist
  if (!user || !Array.isArray(user.cart)) {
    return res.status(400).json({ error: "User cart is missing or invalid." });
  }

  // Get the item's array (through the middle - user's cart)
  // .map() => method that creates a new array by copying objects (Because cart & order's schema dont match)
  const cartItems = user.cart.map((item) => ({
    //
    fragrance: item.fragrance, // The fragrance id (not the entire object -> not populated)
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));

  // Find which fragrance that is and lower it's stock based on size and quanitity
  for (const item of cartItems) {
    const fragrance = await Fragrance.findById(item.fragrance);
    if (fragrance) {
      // Match the ml (size) using .find() and robust parsing for 'ml' suffix
      const sizeOption = fragrance.sizeOptions.find((option) => {
        // We're comparing the fragrance's '30' to the user's cart item '30ml' so we trim it (model structure difference)
        // Remove 'ml' if present and trim
        const optionSize = String(option.size).replace(/ml/i, "").trim();
        const itemSize = String(item.size).replace(/ml/i, "").trim();

        return optionSize === itemSize;
      });

      // If no size option matches (somehow)
      if (!sizeOption) {
        return res.status(400).json({
          message: `Size ${item.size} is not available for ${fragrance.name}.`,
        });
      }

      // If the stock is lower than the requested order's quantity
      if (sizeOption.quantity < item.quantity) {
        return res.status(400).json({
          message: `Only ${sizeOption.quantity} left in stock for size ${item.size} of ${fragrance.name}.`,
        });
      }
      sizeOption.quantity -= item.quantity;
      await fragrance.save();
    }
  }

  // Calculate totalPrice (no tax or shipping fee)
  // .reduce() goes through each item in the array and keeps a sum intialized at 0 (last parameter).
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Incase there are no orders
  const intialOrderSequenceNumber = 1000;

  // Find the latest/highest orderNumber and increment
  // sort() takes an object as an argument, where each field to sort by is a key and the value is either 1 for ascending order or -1 for descending order.
  // takes the objectNumber as the object to sort by, and sort it descendingly
  const lastOrder = await Order.findOne().sort({ orderNumber: -1 });

  // Then increment the order we're currently creating
  const orderNumber =
    lastOrder && lastOrder.orderNumber
      ? lastOrder.orderNumber + 1
      : intialOrderSequenceNumber;

  // Create the customer schema to add customer
  const order = new Order({
    user: user._id,
    items: cartItems,
    totalPrice,
    shippingAddress: req.body.shippingAddress,
    paid: req.body.paid,
    orderNumber,
    paymentInfo: binData || null,
  });

  try {
    // Save the order
    await order.save();

    // Clear the user's cart after successful order
    user.cart = [];
    await user.save();

    // Backend must send a response (success or error) for the frontend to work.
    res.status(201).json({ message: "✅ Order added successfully" });
  } catch (error) {
    console.log(`Order Data Save Error: ${error}`);
    res.status(500).json({ error: "Failed to add order" });
  }
};

// Controller to validate BIN (first 6 digits of a card number)
const binCache = {};

export const validateCardBin = async (req, res) => {
  const { bin } = req.params;

  if (binCache[bin]) {
    return res.status(200).json(binCache[bin]);
  }

  try {
    const binRes = await fetch(`https://lookup.binlist.net/${bin}`, {
      headers: {
        "User-Agent": "AlouraApp/1.0",
      },
    });

    if (!binRes.ok) {
      return res
        .status(400)
        .json({ message: "Invalid BIN or unsupported card." });
    }

    const binData = await binRes.json();
    binCache[bin] = binData; // Cache the result
    res.status(200).json(binData);
  } catch (err) {
    console.error("BIN check failed:", err);
    res.status(500).json({ message: "Server error validating card." });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: `✅ Order #${order.orderNumber} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchOrders = async (req, res) => {
  const { _id: userId } = req.user;
  const { q = "" } = req.query;
  const regex = new RegExp(q, "i");

  const isNumeric = !isNaN(q);
  const orderNumberQuery = isNumeric ? parseInt(q) : null;

  try {
    const orders = await Order.find({
      user: userId,
      $or: [
        ...(isNumeric ? [{ orderNumber: orderNumberQuery }] : []),
        { "items.fragrance.name": regex },
      ],
    })
      .populate("items.fragrance")
      .lean();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Search Orders Error:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

//     // Delete the order after stock is restored
//     await Order.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: 'Order deleted and stock restored successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
