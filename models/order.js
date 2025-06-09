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
        product: {
          // Reference the specific product {another schema}
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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
        },
      },
    ],
    gifts: [
      {
        gift: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Gift",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      apartment: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    cardInfo: {
      last4: String,
      brand: String,
      country: String,
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
    status: {
      type: String,
      enum: ['Pending', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
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
