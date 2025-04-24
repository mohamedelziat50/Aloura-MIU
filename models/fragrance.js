import mongoose from 'mongoose';

const fragranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: true
  },
  category: {
    type: String,
    enum: ['Eau de Parfum', 'Eau de Toilette', 'Cologne', 'Body Mist'],
    default: 'Eau de Parfum'
  },
  topNotes: [String],
  middleNotes: [String],
  baseNotes: [String],
  ingredients: [String],
  description: {
    type: String
  },
  sizeOptions: [
    {
      size: {
        type: String,
        enum: ['30ml', '50ml', '75ml', '100ml', '150ml']
      },
      price: {
        type: Number,
        min: 0
      },
      inStock: {
        type: Boolean,
        default: true
      }
    }
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  imageUrl: {
    type: String
  },
  popularityScore: {
    type: Number,
    default: 0
  },
  releaseDate: {
    type: Date
  },
  tags: [String]
}, {
  timestamps: true
});

const Fragrance = mongoose.model('Fragrance', fragranceSchema);
export default Fragrance;
