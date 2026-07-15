const mongoose = require('mongoose');

const cropHistorySchema = new mongoose.Schema({
  userId: { type: String, required: false }, // For future auth
  cropName: { type: String, required: true },
  disease: { type: String },
  confidence: { type: String },
  symptoms: [String],
  treatment: [String],
  prevention: [String],
  severity: { type: String },
  healthScore: { type: String },
  aiRecommendation: { type: String },
  imageUrl: { type: String }, // If uploaded to cloudinary
}, { timestamps: true });

module.exports = mongoose.model('CropHistory', cropHistorySchema);
