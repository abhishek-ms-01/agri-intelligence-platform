const { predictYield } = require('../services/geminiService');

const getYieldPrediction = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.crop || !data.landArea || !data.soil || !data.season || !data.rainfall) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const prediction = await predictYield(data);
    res.status(200).json(prediction);
  } catch (error) {
    next(error);
  }
};

module.exports = { getYieldPrediction };
