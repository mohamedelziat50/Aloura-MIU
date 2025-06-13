import mongoose from "mongoose";

const fragranceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unisex"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Eau de Parfum", "Eau de Toilette", "Cologne", "Body Mist"],
      default: "Eau de Parfum",
    },
    topNotes: [String],
    middleNotes: [String],
    baseNotes: [String],
    description: {
      type: String,
    },
    sizeOptions: [
      {
        size: {
          type: Number,
          min: 0,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          required: true,
        },
        quantity: {
          type: Number,
          min: 0,
          default: 0,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    image: {
      type: [String],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 3;
        },
        message: "There must be exactly 3 images for a fragrance.",
      },
      required: true,
    },
    popularityScore: {
      type: Number,
      default: 0,
    },
    releaseDate: {
      type: Date,
    },
    tags: [String],
    previewLanding:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Fragrance =  mongoose.models.Fragrance || mongoose.model('Fragrance', fragranceSchema);
export default Fragrance;
