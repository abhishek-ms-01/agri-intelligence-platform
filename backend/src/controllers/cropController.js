const { analyzeCropImage } = require('../services/geminiService');

const analyzeCrop = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const imageBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    const analysis = await analyzeCropImage(imageBuffer, mimeType);

    res.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeCrop };
