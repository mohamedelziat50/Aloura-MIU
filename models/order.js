// models/Order.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      // Reference the user who ordered {another schema}
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      // Array of the ordered items
      {
        fragrance: {
          // Reference the specific fragrance {another schema}
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fragrance",
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      address: { type: String, required: true }, // General address area
      apartment: { type: String, required: true }, // Apartment suite, etc.
      city: { type: String, required: true },
      state: String,
      country: { type: String, required: true },
    },
    paid: {
      type: Boolean,
      required: true,
    },
    orderNumber: {
      type: Number,
      required: true,
    },

    paymentInfo: {
      // ✅ New field for BIN data
      type: Object,
      default: null,
    },
    // status: { // For later
    //   type: String,
    //   enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    //   default: 'Processing'
    // },
    // paymentStatus: { // For later
    //   type: String,
    //   enum: ['Pending', 'Paid', 'Failed'],
    //   default: 'Pending'
    // }
  },
  {
    timestamps: true,
  }
);

// The variable is used to export the model
// The model name inside is what the table is called in the database if you open mongodb
const Order = mongoose.model("Order", orderSchema);

// Export the model as module to be required/imported
export default Order;
