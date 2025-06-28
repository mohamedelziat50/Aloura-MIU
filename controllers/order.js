// controllers/orderController.js
import Order from "../models/order.js";
import Fragrance from "../models/fragrance.js";
import User from "../models/user.js";
import moment from "moment";
import fetch from "node-fetch";

export const createOrder = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { fullName, email, phone, shippingAddress, paid, cardData, binData } =
      req.body;

    // Validate Customer Information
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
      return res
        .status(400)
        .json({
          message: "❌ Phone Number is required in customer information.",
        });
    }

    // Validate Shipping Address (note: state is optional in your schema)
    if (!shippingAddress) {
      return res
        .status(400)
        .json({ message: "❌ Shipping address is required." });
    }
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
    if (
      !shippingAddress.city ||
      shippingAddress.city.toString().trim() === ""
    ) {
      return res
        .status(400)
        .json({ message: "❌ City is required in shipping address." });
    }
    // state is optional, no check here
    if (
      !shippingAddress.country ||
      shippingAddress.country.toString().trim() === ""
    ) {
      return res
        .status(400)
        .json({ message: "❌ Country is required in shipping address." });
    }

    // Payment method validation (only if paid = true)
    if (paid) {
      if (!cardData) {
        return res
          .status(400)
          .json({
            message: "❌ Payment card data is required if order is paid.",
          });
      }
      if (
        !cardData.cardNumber ||
        cardData.cardNumber.toString().trim() === ""
      ) {
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

    // Find user and check cart
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    if (!Array.isArray(user.cart) || user.cart.length === 0) {
      return res
        .status(400)
        .json({ message: "User cart is missing or empty." });
    }

    // Map cart items to order items
    const cartItems = user.cart.map((item) => ({
      fragrance: item.fragrance,
      size: item.size || "30ml", // <-- default size if not provided
      quantity: item.quantity || 1,
      price: item.price,
      wrap: {
        name: item.wrap?.name || "",
        price: item.wrap?.price || 0,
      },
      card: {
        name: item.card?.name || "",
      },
      recipientName: item.recipientName || null,
      message: item.message || null,
      category: item.category || "regular",
    }));

    // Check stock and update fragrance quantities
    for (const item of cartItems) {
      const fragrance = await Fragrance.findById(item.fragrance);
      if (!fragrance) {
        return res
          .status(400)
          .json({ message: `Fragrance not found for id: ${item.fragrance}` });
      }

      // Find size option and check quantity
      const sizeOption = fragrance.sizeOptions.find((option) => {
        // We're comparing the fragrance's '30' to the user's cart item '30ml' so we trim it (model structure difference)
        // Remove 'ml' if present and trim
        const optionSize = String(option.size).replace(/ml/i, "").trim();
        const itemSize = String(item.size).replace(/ml/i, "").trim();
        return optionSize === itemSize;
      });

      if (!sizeOption) {
        return res
          .status(400)
          .json({
            message: `Size ${item.size} is not available for ${fragrance.name}.`,
          });
      }

      if (sizeOption.quantity < item.quantity) {
        return res.status(400).json({
          message: `Only ${sizeOption.quantity} left in stock for size ${item.size} of ${fragrance.name}.`,
        });
      }

      // Decrement stock
      sizeOption.quantity -= item.quantity;
      await fragrance.save();
    }

    // Calculate total price
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Generate order number
    const initialOrderSequenceNumber = 1000;
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const orderNumber = lastOrder?.orderNumber
      ? lastOrder.orderNumber + 1
      : initialOrderSequenceNumber;

    console.log("Order number generated:", orderNumber);
    const cleanedItems = cartItems.map((item) => ({
      fragrance: item.fragrance,
      size: item.size || "30ml",
      quantity: item.quantity,
      price: item.price,
      wrap: {
        name: item.wrap?.name || "",
        price: item.wrap?.price || 0,
      },
      card: {
        name: item.card?.name || "",
      },
      recipientName: item.recipientName || undefined,
      message: item.message || undefined,
      category: item.category || "regular",
    }));

    // Create and save order
    const order = new Order({
      user: req.user.id,
      items: cleanedItems,
      shippingAddress,
      paid,
      orderNumber,
      paymentInfo: binData || null,
      totalPrice: totalPrice,
    });

    await order.save();

    // Clear user cart
    user.cart = [];
    await user.save();

    return res
      .status(201)
      .json({ message: "✅ Order added successfully", orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
  const { search = "" } = req.query;
  const searchTerm = search.trim();

  try {
    // If search term is empty, return all orders
    if (!searchTerm) {
      const orders = await Order.find()
        .populate("items.fragrance")
        .populate("user")
        .sort({ createdAt: -1 })
        .lean();
      return res.status(200).json(orders);
    }

    // Try to parse the search term as a number for order number search
    const orderNumber = parseInt(searchTerm);
    const isOrderNumber = !isNaN(orderNumber);

    // Create the search query
    const query = {
      $or: [],
    };

    // Add order number search if the search term is a number
    if (isOrderNumber) {
      query.$or.push({ orderNumber: orderNumber });
    }

    // Add user name search
    const users = await User.find({
      name: { $regex: searchTerm, $options: "i" },
    }).select("_id");

    if (users.length > 0) {
      query.$or.push({ user: { $in: users.map((user) => user._id) } });
    }

    // If no valid search criteria, return empty array
    if (query.$or.length === 0) {
      return res.status(200).json([]);
    }

    // Execute the search
    const orders = await Order.find(query)
      .populate("items.fragrance")
      .populate("user")
      .sort({ createdAt: -1 })
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

export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    // Find order by id
    const order = await Order.findById(orderId);
    if (!order) return res.status(400).json({ error: "Order not found" });

    // Update status
    if (!status) {
      return res.status(400).json({ error: "Status not found" });
    }
    if (order.status === status) {
      return res
        .status(400)
        .json({ error: `Order is already marked as '${status}'.` });
    }
    // Prevent cancelling a delivered order
    if (order.status === "Delivered" && status === "Cancelled") {
      return res
        .status(400)
        .json({ error: "Delivered orders cannot be cancelled." });
    }
    // Prevent delivering a cancelled order
    if (order.status === "Cancelled" && status === "Delivered") {
      return res
        .status(400)
        .json({ error: "Cancelled orders cannot be delivered." });
    }

    // If changing status to "Cancelled", restore stock
    if (status === "Cancelled" && order.status !== "Cancelled") {
      console.log("Restoring stock for cancelled order:", order.orderNumber);
      
      for (const item of order.items) {
        // Use the fragrance ID directly (more efficient)
        const fragrance = await Fragrance.findById(item.fragrance);
        
        if (!fragrance) {
          console.log(`Error: Fragrance not found with ID ${item.fragrance} during stock restoration`);
          return res.status(500).json({ 
            error: `Failed to restore stock: Fragrance not found for item in order #${order.orderNumber}` 
          });
        }

        // Find the size option that matches the ordered item
        const sizeOption = fragrance.sizeOptions.find((option) => {
          const optionSize = String(option.size).replace(/ml/i, "").trim();
          const itemSize = String(item.size).replace(/ml/i, "").trim();
          return optionSize === itemSize;
        });

        if (!sizeOption) {
          console.log(`Error: Size ${item.size} not found for fragrance ${fragrance.name} during stock restoration`);
          return res.status(500).json({ 
            error: `Failed to restore stock: Size ${item.size} not found for ${fragrance.name} in order #${order.orderNumber}` 
          });
        }

        // Restore the quantity back to stock
        sizeOption.quantity += item.quantity;
        await fragrance.save();
        console.log(`Restored ${item.quantity} units of ${fragrance.name} (${item.size}) to stock [Category: ${item.category || 'regular'}]`);
      }
    }

    // If we passed all these checks now change the status
    order.status = status;
    // Save the result
    await order.save();

    res
      .status(200)
      .json({
        message: `✅ Order #${order.orderNumber} status updated to ${order.status}`,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
