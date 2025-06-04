// controllers/orderController.js
import Order from '../models/order.js';
import Fragrance from '../models/fragrance.js';
import User from '../models/user.js'

export const createOrder = async (req, res) => {
    // // req.body only contains what you send; destructuring is for checking clarity and safety.
    // const {fullName, email, phone, address, apartment, city, state, country} = req.body

    // Get the user's id (through the middleware - user's id from auth used to find the actual user object from his schema)
    const user = await User.findById(req.user.id)

    // Defensive: check if user and user.cart exist
    if (!user || !Array.isArray(user.cart)) {
        return res.status(400).json({ error: 'User cart is missing or invalid.' });
    }

    // Get the item's array (through the middle - user's cart)
    // .map() => method that creates a new array by copying objects (Because cart & order's schema dont match)
    const cartItems = user.cart.map(item => ({ //
      fragrance: item.fragrance, // The fragrance id (not the entire object -> not populated)
      size: item.size,
      quantity: item.quantity,
      price: item.price
    }));
    
    // Calculate totalPrice (no tax or shipping fee)
    // .reduce() goes through each item in the array and keeps a sum intialized at 0 (last parameter).
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create the customer schema to add customer
    const order = new Order({
      user: user._id,
      items: cartItems,
      totalPrice,
      shippingAddress: req.body.shippingAddress
    });

     try {
        await order.save();
        // Backend must send a response (success or error) for the frontend to work.
        res.status(201).json({ message: "Order added successfully" });
    } catch (error) {
        console.log(`Order Data Save Error: ${error}`);
        res.status(500).json({ error: "Failed to add order" });
    }
};


// // Get all orders
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('user items.fragrance');
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single order by ID
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('user items.fragrance');
//     if (!order) return res.status(404).json({ error: 'Order not found' });
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update an order
// export const updateOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!order) return res.status(404).json({ error: 'Order not found' });
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete an order
// export const deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     // Restore fragrance quantities before deleting the order
//     for (const item of order.items) {
//       const fragrance = await Fragrance.findById(item.fragrance);

//       if (fragrance) {
//         // Ensure size is compared as a number
//         const sizeValue = parseInt(item.size); // just in case it’s a string like "50"
//         const sizeOption = fragrance.sizeOptions.find(option => option.size === sizeValue);

//         if (sizeOption) {
//           sizeOption.quantity += item.quantity; // Add back the quantity
//           await fragrance.save(); // Save changes
//         }
//       }
//     }

//     // Delete the order after stock is restored
//     await Order.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: 'Order deleted and stock restored successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
