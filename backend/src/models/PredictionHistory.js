const mongoose = require('mongoose');

const predictionHistorySchema = new mongoose.Schema({
  userId: { type: String, required: false },
  inputParams: {
    crop: String,
    landArea: Number,
    soil: String,
    season: String,
    rainfall: Number
  },
  yield: String,
  revenue: String,
  profit: String,
  roi: String,
  risk: String,
  aiBusinessRecommendation: String
}, { timestamps: true });

module.exports = mongoose.model('PredictionHistory', predictionHistorySchema);
