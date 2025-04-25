// controllers/orderController.js
import Order from '../models/order.js';
import Fragrance from '../models/fragrance.js';

export const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      totalPrice,
      shippingAddress
    } = req.body;

    // Create the order
    const order = new Order({
      user,
      items,
      totalPrice,
      shippingAddress
    });

    await order.save();

    // Update the quantity in Fragrance sizeOptions
    for (const item of items) {
      const fragrance = await Fragrance.findById(item.fragrance);
      if (!fragrance) {
        return res.status(404).json({ error: 'Fragrance not found' });
      }

      // Find the sizeOption matching the ordered size
      const sizeOption = fragrance.sizeOptions.find(opt => opt.size === parseInt(item.size));
      if (!sizeOption) {
        return res.status(400).json({ error: `Size ${item.size}ml not found in fragrance` });
      }

      // Check for stock availability
      if (sizeOption.quantity < item.quantity) {
        return res.status(400).json({
          error: `Not enough quantity for ${fragrance.name} (${item.size}ml)`
        });
      }

      // Decrease quantity
      sizeOption.quantity -= item.quantity;

      await fragrance.save(); // Save updated fragrance
    }

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong creating the order' });
  }
};


// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user items.fragrance');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user items.fragrance');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Restore fragrance quantities before deleting the order
    for (const item of order.items) {
      const fragrance = await Fragrance.findById(item.fragrance);

      if (fragrance) {
        // Ensure size is compared as a number
        const sizeValue = parseInt(item.size); // just in case it’s a string like "50"
        const sizeOption = fragrance.sizeOptions.find(option => option.size === sizeValue);

        if (sizeOption) {
          sizeOption.quantity += item.quantity; // Add back the quantity
          await fragrance.save(); // Save changes
        }
      }
    }

    // Delete the order after stock is restored
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Order deleted and stock restored successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
