const Itinerary = require('../models/Itinerary');

// Save itinerary
const saveItinerary = async (req, res) => {
  try {
    const newPlan = new Itinerary(req.body);
    const saved = await newPlan.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save itinerary.' });
  }
};

// Get all itineraries
const getAllItineraries = async (req, res) => {
  try {
    const plans = await Itinerary.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching itineraries.' });
  }
};

module.exports = {
  saveItinerary,
  getAllItineraries
};
