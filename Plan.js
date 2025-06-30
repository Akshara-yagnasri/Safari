const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  prompt: String,
  suggestion: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plan', planSchema);
