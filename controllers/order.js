// controllers/order.js
import Order from "../models/order.js";
import Fragrance from "../models/fragrance.js";
import User from "../models/user.js";
import Gift from "../models/gifting.js";
import moment from "moment";
import fetch from "node-fetch";

// Cache for BIN validation
const binCache = {};

export const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      shippingAddress,
      paid,
      cardData,
      binData,
      gifts,
    } = req.body;

    // Customer Information Validation
    if (!fullName || fullName.toString().trim() === "") {
      return res.status(400).json({ message: "❌ Full Name is required in customer information." });
    }
    if (!email || email.toString().trim() === "") {
      return res.status(400).json({ message: "❌ Email is required in customer information." });
    }
    if (!phone || phone.toString().trim() === "") {
      return res.status(400).json({ message: "❌ Phone Number is required in customer information." });
    }

    // Shipping Address Validation
    if (!shippingAddress.address || shippingAddress.address.toString().trim() === "") {
      return res.status(400).json({ message: "❌ Address is required in shipping address." });
    }
    if (!shippingAddress.apartment || shippingAddress.apartment.toString().trim() === "") {
      return res.status(400).json({ message: "❌ Apartment is required in shipping address." });
    }
    if (!shippingAddress.city || shippingAddress.city.toString().trim() === "") {
      return res.status(400).json({ message: "❌ City is required in shipping address." });
    }
    if (!shippingAddress.state || shippingAddress.state.toString().trim() === "") {
      return res.status(400).json({ message: "❌ State is required in shipping address." });
    }
    if (!shippingAddress.country || shippingAddress.country.toString().trim() === "") {
      return res.status(400).json({ message: "❌ Country is required in shipping address." });
    }

    // Payment Method Validation (If not COD)
    if (paid) {
      if (!cardData.cardNumber || cardData.cardNumber.toString().trim() === "") {
        return res.status(400).json({ message: "❌ Card Number is required in payment method." });
      }
      if (!cardData.expiry || cardData.expiry.toString().trim() === "") {
        return res.status(400).json({ message: "❌ Card Expiry is required in payment method." });
      }
      if (!cardData.cvv || cardData.cvv.toString().trim() === "") {
        return res.status(400).json({ message: "❌ Card CVV is required in payment method." });
      }
      if (!cardData.cardName || cardData.cardName.toString().trim() === "") {
        return res.status(400).json({ message: "❌ Card Name is required in payment method." });
      }
    }

    // Get user and validate cart
    const user = await User.findById(req.user.id);
    if (!user || !Array.isArray(user.cart)) {
      return res.status(400).json({ error: "User cart is missing or invalid." });
    }

    // Get gift items if any
    let giftItems = [];
    if (gifts && gifts.length > 0) {
      giftItems = await Gift.find({ _id: { $in: gifts } });
    }

    // Process cart items and update stock
    const cartItems = user.cart.map((item) => ({
      fragrance: item.fragrance,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }));

    // Update fragrance stock
    for (const item of cartItems) {
      const fragrance = await Fragrance.findById(item.fragrance);
      if (fragrance) {
        const sizeOption = fragrance.sizeOptions.find((option) => {
          const optionSize = String(option.size).replace(/ml/i, "").trim();
          const itemSize = String(item.size).replace(/ml/i, "").trim();
          return optionSize === itemSize;
        });

        if (!sizeOption) {
          return res.status(400).json({
            message: `Size ${item.size} is not available for ${fragrance.name}.`,
          });
        }

        if (sizeOption.quantity < item.quantity) {
          return res.status(400).json({
            message: `Only ${sizeOption.quantity} left in stock for size ${item.size} of ${fragrance.name}.`,
          });
        }
        sizeOption.quantity -= item.quantity;
        await fragrance.save();
      }
    }

    // Calculate total price including gifts
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const giftsTotal = giftItems.reduce((total, gift) => total + gift.totalPrice, 0);
    const totalPrice = cartTotal + giftsTotal;

    // Generate order number
    const initialOrderSequenceNumber = 1000;
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const orderNumber = lastOrder && lastOrder.orderNumber ? lastOrder.orderNumber + 1 : initialOrderSequenceNumber;

    // Create order
    const order = new Order({
      user: user._id,
      items: cartItems,
      gifts: giftItems.map((gift) => ({
        gift: gift._id,
        price: gift.totalPrice,
      })),
      totalPrice,
      shippingAddress,
      orderNumber,
      paymentMethod: paid ? "card" : "cash",
      paymentStatus: paid ? "paid" : "pending",
      orderStatus: "pending",
      cardInfo: cardData ? {
        last4: cardData.cardNumber.slice(-4),
        brand: binData?.scheme || "unknown",
        country: binData?.country?.name || "unknown",
      } : undefined,
    });

    // Save order
    await order.save();

    // Clear user's cart and remove gifts
    user.cart = [];
    if (gifts && gifts.length > 0) {
      user.gifts = user.gifts.filter((giftId) => !gifts.includes(giftId.toString()));
    }
    await user.save();

    res.status(201).json({
      message: "✅ Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

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
      return res.status(400).json({ message: "Invalid BIN or unsupported card." });
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
  const { search = "" } = req.query;
  const searchTerm = search.trim();

  try {
    // If search term is empty, return all orders
    if (!searchTerm) {
      const orders = await Order.find()
        .populate("items.fragrance")
        .populate("gifts.gift")
        .populate("user")
        .sort({ createdAt: -1 })
        .lean();
      return res.status(200).json(orders);
    }

    // Try to parse the search term as a number for order number search
    const orderNumber = parseInt(searchTerm);
    const isOrderNumber = !isNaN(orderNumber);

    // Build search query
    const query = isOrderNumber
      ? { orderNumber }
      : {
          $or: [
            { "shippingAddress.fullName": { $regex: searchTerm, $options: "i" } },
            { "shippingAddress.email": { $regex: searchTerm, $options: "i" } },
            { "shippingAddress.phone": { $regex: searchTerm, $options: "i" } },
          ],
        };

    const orders = await Order.find(query)
      .populate("items.fragrance")
      .populate("gifts.gift")
      .populate("user")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error searching orders:", error);
    res.status(500).json({ error: "Error searching orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Error updating order status" });
  }
};
