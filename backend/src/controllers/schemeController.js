const NodeCache = require('node-cache');
const { getSchemes } = require('../services/geminiService');

const schemeCache = new NodeCache({ stdTTL: 3600 }); // cache for 1 hour

const fetchSchemes = async (req, res, next) => {
  try {
    const cachedSchemes = schemeCache.get('schemes');
    if (cachedSchemes) {
      return res.status(200).json(cachedSchemes);
    }

    const schemes = await getSchemes();
    schemeCache.set('schemes', schemes);
    
    res.status(200).json(schemes);
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchSchemes };
