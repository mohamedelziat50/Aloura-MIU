import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "User ID is required"] 
  },
  perfume: {
    name: {
      type: String,
      required: [true, "Perfume name is required"]
    },
    price: {
      type: Number,
      required: [true, "Perfume price is required"],
      min: [0, "Price cannot be negative"]
    },
    image: {
      type: [String],
      required: [true, "Perfume image is required"]
    }
  },
  wrap: {
    name: {
      type: String,
      required: [true, "Wrap name is required"]
    },
    price: {
      type: Number,
      required: [true, "Wrap price is required"],
      min: [0, "Price cannot be negative"]
    }
  },
  card: {
    name: {
      type: String,
      required: [true, "Card name is required"]
    }
  },
  recipientName: { 
    type: String, 
    required: [true, "Recipient name is required"],
    trim: true,
    minlength: [2, "Recipient name must be at least 2 characters long"],
    maxlength: [50, "Recipient name cannot exceed 50 characters"]
  },
  message: { 
    type: String, 
    maxlength: [100, "Message cannot exceed 100 characters"],
    trim: true
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price cannot be negative"]
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Gift = mongoose.model("Gifting", giftSchema);
export default Gift;
