// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      fragrance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fragrance',
        required: true
      },
      size: {
        type: String,
        enum: ['30ml', '50ml', '75ml', '100ml', '150ml'],
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: String,
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
