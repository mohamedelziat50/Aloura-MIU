import Fragrance from "../models/Fragrance.js";

// Create
export const createFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.create(req.body);
    return res.status(201).json(fragrance); // Use return to prevent further execution
  } catch (err) {
    return res.status(400).json({ error: err.message }); // Use return to prevent further execution
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
