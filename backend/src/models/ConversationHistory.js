const mongoose = require('mongoose');

const conversationHistorySchema = new mongoose.Schema({
  userId: { type: String, required: false },
  sessionId: { type: String, required: true },
  messages: [{
    role: { type: String, enum: ['user', 'model'], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('ConversationHistory', conversationHistorySchema);
