import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  perfume: {
    name: String,
    price: Number,
    image: String,
  },
  wrap: {
    name: String,
    price: Number,
    image: String,
  },
  card: {
    name: String,
    image: String,
  },
  recipientName: { type: String, required: true },
  message: { type: String, maxlength: 200 },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Gifting', giftSchema);
export default Order;
