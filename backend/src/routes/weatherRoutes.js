const express = require('express');
const router = express.Router();
const { getWeather, analyzeWeather } = require('../controllers/weatherController');
const rateLimit = require('express-rate-limit');

// Rate limiting for API to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.get('/', apiLimiter, getWeather);
router.post('/analyze', analyzeWeather);

module.exports = router;
