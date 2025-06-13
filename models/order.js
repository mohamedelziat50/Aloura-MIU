import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    

    // Array of purchased items (used in both regular and gift orders)
    items: [
      {
        fragrance: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fragrance",
          required: true,
        },
        size: {
          type: String,
         
        },
        quantity: {
          type: Number,
          min: 1,
        },
        price: {
          type: Number,
          min: 0,
          required: true,
        },
        wrap: {
          name: {
            type: String,
            default: "",       // ✅ default to empty string
          },
          price: {
            type: Number,
            default: 0,        // ✅ default to 0
          },
        },

        card: {
          name: {
            type: String,
            default: "",       // ✅ default to empty string
          },
        },
    recipientName: {
      type: String,
    },
    message: {
      type: String,
      maxlength: 100,
    },
    category: {
      type: String,
      enum: ["regular", "gift"],
      required: true,
    },

      },
    ],

    
   

    shippingAddress: {
      address: { type: String, required: true },
      apartment: { type: String, required: true },
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
      type: Object,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
     totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
