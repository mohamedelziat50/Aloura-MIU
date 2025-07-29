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
      previewLanding,
    } = req.body;

    // Find the fragrance first
    const fragrance = await Fragrance.findById(id);
    if (!fragrance) {
      return res.status(404).json({ message: "Fragrance not found" });
    }

    // If only updating previewLanding (from admin toggle)
    if (previewLanding !== undefined && !name) {
      fragrance.previewLanding = previewLanding;
      await fragrance.save();
      return res.json({
        message: `Fragrance ${
          previewLanding ? "added to" : "removed from"
        } landing slider successfully`,
        fragrance: {
          _id: fragrance._id,
          name: fragrance.name,
          previewLanding: fragrance.previewLanding,
        },
      });
    }

    // Check for duplicate name (only if name is being updated)
    if (name) {
      const trimmedName = name.trim().replace(/\s+/g, " ");
      const existingFragrance = await Fragrance.findOne({
        _id: { $ne: id }, // Exclude current fragrance
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
      });
      if (existingFragrance) {
        return res
          .status(400)
          .json({ message: "A Fragrance with this name already exists" });
      }
    }

    // Convert notes and tags from comma-separated strings (only if provided)
    let top, mid, base, tagList, sizeOptions;

    if (topNotes && middleNotes && baseNotes && tags) {
      top = topNotes.split(",").map((n) => n.trim());
      mid = middleNotes.split(",").map((n) => n.trim());
      base = baseNotes.split(",").map((n) => n.trim());
      tagList = tags.split(",").map((t) => t.trim());
    }

    // Convert sizes array and build sizeOptions (only if provided)
    if (sizes) {
      const sizeArray = Array.isArray(sizes) ? sizes : [sizes];
      const sizeMap = new Map();
      sizeArray.forEach((size) => {
        const sizeInt = parseInt(size);
        // Always use the latest value for a given size
        // To avoid Duplication is handled through the .set method
        sizeMap.set(sizeInt, {
          size: sizeInt,
          price: parseFloat(req.body[`price${size}`] || 0),
          quantity: parseInt(req.body[`quantity${size}`] || 0),
        });
      });
      sizeOptions = Array.from(sizeMap.values());
    }

    // Update basic info (only if provided)
    if (name) fragrance.name = name;
    if (brand) fragrance.brand = brand;
    if (gender) fragrance.gender = gender;
    if (category) fragrance.category = category;
    if (top) fragrance.topNotes = top;
    if (mid) fragrance.middleNotes = mid;
    if (base) fragrance.baseNotes = base;
    if (description) fragrance.description = description;
    if (releaseDate) fragrance.releaseDate = releaseDate;
    if (tagList) fragrance.tags = tagList;
    if (sizeOptions) fragrance.sizeOptions = sizeOptions;

    // Update previewLanding if provided
    if (previewLanding !== undefined) {
      fragrance.previewLanding = previewLanding;
    }

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
        message:
          "❌ Cannot delete: This fragrance is part of an existing order.",
      });
    }

    await Fragrance.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Fragrance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/quiz/recommend
export const getQuizRecommendation = async (req, res) => {
  try {
    const { gender, scentFamily, desiredFeeling } = req.body;
    // Build a query based on quiz answers
    const query = {};
    if (gender && gender !== "neutral") query.gender = new RegExp(gender, "i");
    if (scentFamily && scentFamily.length > 0) query.tags = { $in: scentFamily };
    // Optionally use desiredFeeling to filter or sort (e.g., by tags or popularity)
    // For demo, just use tags and gender
    let fragrance = await Fragrance.findOne(query);
    // If no match, fallback to any fragrance
    if (!fragrance) fragrance = await Fragrance.findOne();
    if (!fragrance) return res.status(404).json({ error: "No fragrance found" });
    // Return minimal info for frontend
    res.json({
      name: fragrance.name,
      description: fragrance.description,
      price: fragrance.sizeOptions?.[0]?.price || 0,
      image: fragrance.image?.[0] || "",
      id: fragrance._id,
      link: `/fragrances-page/${fragrance._id}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get fragrance details for modal (notes and sizes)
export const getFragranceDetails = async (req, res) => {
  try {
    console.log(`[DEBUG] Fetching details for fragrance ID: ${req.params.id}`);
    
    const fragrance = await Fragrance.findById(req.params.id);
    if (!fragrance) {
      console.log(`[DEBUG] Fragrance not found for ID: ${req.params.id}`);
      return res.status(404).json({ error: "Fragrance not found" });
    }

    console.log(`[DEBUG] Found fragrance: ${fragrance.name}`);
    console.log(`[DEBUG] Top notes: ${fragrance.topNotes}`);
    console.log(`[DEBUG] Middle notes: ${fragrance.middleNotes}`);
    console.log(`[DEBUG] Base notes: ${fragrance.baseNotes}`);
    console.log(`[DEBUG] Size options: ${JSON.stringify(fragrance.sizeOptions)}`);

    // Format the response for the frontend
    const response = {
      notes: {
        top: fragrance.topNotes ? fragrance.topNotes.join(", ") : "-",
        middle: fragrance.middleNotes ? fragrance.middleNotes.join(", ") : "-",
        base: fragrance.baseNotes ? fragrance.baseNotes.join(", ") : "-",
      },
      sizes: fragrance.sizeOptions.map(sizeOption => ({
        size: sizeOption.size,
        price: sizeOption.price,
        inStock: sizeOption.quantity > 0
      }))
    };

    console.log(`[DEBUG] Sending response: ${JSON.stringify(response)}`);
    res.json(response);
  } catch (err) {
    console.error(`[ERROR] Error fetching fragrance details: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
