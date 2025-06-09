// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      shippingAddress,
      paid,
      cardData,
      binData,
      gifts
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !shippingAddress) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get user's cart items
    const user = await User.findById(req.user._id).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get gift items if any
    let giftItems = [];
    if (gifts && gifts.length > 0) {
      giftItems = await Gift.find({ _id: { $in: gifts } });
    }

    // Calculate total price including gifts
    const cartTotal = user.cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const giftsTotal = giftItems.reduce((total, gift) => {
      return total + gift.totalPrice;
    }, 0);

    const totalPrice = cartTotal + giftsTotal;

    // Create order
    const order = new Order({
      user: req.user._id,
      items: user.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      gifts: giftItems.map(gift => ({
        gift: gift._id,
        price: gift.totalPrice
      })),
      totalPrice,
      shippingAddress,
      paymentMethod: paid ? "card" : "cash",
      paymentStatus: paid ? "paid" : "pending",
      orderStatus: "pending",
      cardInfo: cardData ? {
        last4: cardData.cardNumber.slice(-4),
        brand: binData?.scheme || "unknown",
        country: binData?.country?.name || "unknown"
      } : undefined
    });

    // Save order
    await order.save();

    // Clear user's cart
    user.cart = [];
    await user.save();

    // Remove gifts from user's gifts array
    if (gifts && gifts.length > 0) {
      user.gifts = user.gifts.filter(giftId => !gifts.includes(giftId.toString()));
      await user.save();
    }

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
}; 