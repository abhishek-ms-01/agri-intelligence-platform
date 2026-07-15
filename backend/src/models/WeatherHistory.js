const mongoose = require('mongoose');

const weatherHistorySchema = new mongoose.Schema({
  userId: { type: String, required: false },
  location: {
    lat: Number,
    lon: Number,
    city: String
  },
  weatherData: { type: Object },
  aiAnalysis: {
    diseaseRisk: String,
    irrigationAdvice: String,
    sprayingAdvice: String,
    harvestAdvice: String,
    aiReasoning: String
  }
}, { timestamps: true });

module.exports = mongoose.model('WeatherHistory', weatherHistorySchema);
