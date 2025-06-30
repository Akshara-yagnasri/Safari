

// models/Itinerary.js
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  originalPrompt: String,
  days: Number, // ✅ Fix here
  places: [String],
  accommodation: String,
  budget: String,
  tip: String,
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);

