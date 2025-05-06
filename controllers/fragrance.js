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

export const updateFragrance = async (req, res) => {
  try {
    const fragranceId = req.params.id;
    const { name, brand, gender, category, topNotes, middleNotes, baseNotes, description, sizeOptions, releaseDate, tags , image ,backgroundImage1 , backgroundImage2 } = req.body;

    // Handle image upload (multer automatically adds files to req.files)
    let imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Get the current fragrance data to check which images should stay
    const fragrance = await Fragrance.findById(fragranceId);

    if (!fragrance) {
      return res.status(404).json({ message: "Fragrance not found" });
    }

    const updatedImages = [...fragrance.image]; // Copy existing images

    // If there are new images uploaded, update the specific fields
    if (imagePaths.length > 0) {
      updatedImages[0] = image
      updatedImages[1] = backgroundImage1
      updatedImages[2] = backgroundImage2
    }

    const updateData = {
      name,
      brand,
      gender,
      category,
      topNotes: topNotes ? topNotes.split(",").map(s => s.trim()) : [],
      middleNotes: middleNotes ? middleNotes.split(",").map(s => s.trim()) : [],
      baseNotes: baseNotes ? baseNotes.split(",").map(s => s.trim()) : [],
      description,
      sizeOptions,
      releaseDate,
      tags: tags ? tags.split(",").map(s => s.trim()) : [],
      image: updatedImages, // Only update the image array with new values where available
    };

    const updatedFragrance = await Fragrance.findByIdAndUpdate(fragranceId, updateData, { new: true });

    if (!updatedFragrance) {
      return res.status(404).json({ message: "Fragrance not found" });
    }

    res.status(200).json(updatedFragrance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
