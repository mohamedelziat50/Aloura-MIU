import Fragrance from "../models/fragrance.js";

// Create
export const createFragrance = async (req, res) => {
  try {
    const {
      name,
      brand,
      gender,
      category,
      description,
      topNotes,
      middleNotes,
      baseNotes,
      sizes = [],
      price30,
      price50,
      price100,
      quantity30,
      quantity50,
      quantity100,
      releaseDate,
      tags,
    } = req.body;

    // Build public image paths from Multer
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    // Handle size options manually
    const selectedSizes = Array.isArray(sizes) ? sizes : [sizes];
    const sizeOptions = [];

    if (selectedSizes.includes("30")) {
      sizeOptions.push({
        size: 30,
        price: price30,
        quantity: quantity30,
      });
    }
    if (selectedSizes.includes("50")) {
      sizeOptions.push({
        size: 50,
        price: price50,
        quantity: quantity50,
      });
    }
    if (selectedSizes.includes("100")) {
      sizeOptions.push({
        size: 100,
        price: price100,
        quantity: quantity100,
      });
    }

    // Create fragrance document
    const newFragrance = await Fragrance.create({
      name,
      brand,
      gender,
      category,
      description,
      image: imagePaths,
      sizeOptions,
      topNotes: topNotes?.split(",").map((s) => s.trim()),
      middleNotes: middleNotes?.split(",").map((s) => s.trim()),
      baseNotes: baseNotes?.split(",").map((s) => s.trim()),
      tags: tags?.split(",").map((s) => s.trim()),
      releaseDate,
    });

    res.status(201).json(newFragrance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Read all
export const getAllFragrances = async (req, res) => {
  try {
    const fragrances = await Fragrance.find().populate("reviews");
    res.status(200).json(fragrances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
export const getFragranceById = async (req, res) => {
  try {
    const fragrance = await Fragrance.findById(req.params.id).populate(
      "reviews"
    );
    if (!fragrance) return res.status(404).json({ error: "Not found" });
    res.json(fragrance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(fragrance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteFragrance = async (req, res) => {
  try {
    await Fragrance.findByIdAndDelete(req.params.id);
    res.json({ message: "Fragrance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
