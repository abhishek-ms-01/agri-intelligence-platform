const { chatWithAdvisor } = require('../services/geminiService');

const chat = async (req, res, next) => {
  try {
    const { message, history, language, location } = req.body;
    console.log('Request received:\n', req.body);

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const chatHistory = history || [];
    const response = await chatWithAdvisor(chatHistory, message, language, location);
    console.log('Response sent to frontend:\n', response);

    // Provide timestamp as requested by the user
    res.status(200).json({
        ...response,
        timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { chat };
