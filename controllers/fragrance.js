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

    const trimmedName = name.trim().replace(/\s+/g, " ");
    const fragrance = await Fragrance.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
    });
    if (fragrance) {
      return res.status(400).json({ error: "Fragrance already exists" });
    }

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
    const { id } = req.params;
    const {
      name,
      brand,
      gender,
      category,
      topNotes,
      middleNotes,
      baseNotes,
      description,
      releaseDate,
      tags,
      sizes,
      image,
      backgroundImage1,
      backgroundImage2,
    } = req.body;

    //Check for duplicate name
    const trimmedName = name.trim().replace(/\s+/g, " ");
    const existingFragrance = await Fragrance.findOne({
     _id: { $ne: id }, // Exclude current fragrance
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
    });
    if (existingFragrance) {
      return res.status(400).json({ message: "A Fragrance with this name already exists" });
    }

    // Convert notes and tags from comma-separated strings
    const top = topNotes.split(",").map((n) => n.trim());
    const mid = middleNotes.split(",").map((n) => n.trim());
    const base = baseNotes.split(",").map((n) => n.trim());
    const tagList = tags.split(",").map((t) => t.trim());

    // Convert sizes array and build sizeOptions
    const sizeArray = Array.isArray(sizes) ? sizes : [sizes];
    const sizeOptions = sizeArray.map((size) => ({
      size: parseInt(size),
      price: parseFloat(req.body[`price${size}`] || 0),
      quantity: parseInt(req.body[`quantity${size}`] || 0),
    }));

    // Find the fragrance
    const fragrance = await Fragrance.findById(id);
    if (!fragrance) {
      return res.status(404).json({ message: "Fragrance not found" });
    }

    // Update basic info
    fragrance.name = name;
    fragrance.brand = brand;
    fragrance.gender = gender;
    fragrance.category = category;
    fragrance.topNotes = top;
    fragrance.middleNotes = mid;
    fragrance.baseNotes = base;
    fragrance.description = description;
    fragrance.releaseDate = releaseDate;
    fragrance.tags = tagList;
    fragrance.sizeOptions = sizeOptions;

    // Update images if values provided
    if (image || backgroundImage1 || backgroundImage2) {
      const updatedImages = [...fragrance.image]; // Keep old if not replaced

      if (image) updatedImages[0] = image;
      if (backgroundImage1) updatedImages[1] = backgroundImage1;
      if (backgroundImage2) updatedImages[2] = backgroundImage2;

      fragrance.image = updatedImages;
    }

    // Save changes
    await fragrance.save();
    res.status(200).json({
      message: "✅ Fragrance updated successfully",
      fragrance,
    });
  } catch (error) {
    console.error("❌ Error updating fragrance:", error);
    res.status(500).json({
      message: "❌ Server Error: Failed to update fragrance",
      error: error.message,
    });
  }
};

// Delete
export const deleteFragrance = async (req, res) => {
  try {
    // Check if this fragrance is in any order
    const Order = (await import("../models/order.js")).default;
    const ordersWithFragrance = await Order.find({
      "items.fragrance": req.params.id,
    }).limit(1); // Only need to know if at least one exists

    if (ordersWithFragrance.length > 0) {
      return res.status(400).json({
        message: "❌ Cannot delete: This fragrance is part of an existing order.",
      });
    }

    await Fragrance.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Fragrance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
