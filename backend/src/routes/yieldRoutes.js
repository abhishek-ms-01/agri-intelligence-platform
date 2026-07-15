const express = require('express');
const router = express.Router();
const { getYieldPrediction } = require('../controllers/yieldController');

router.post('/predict', getYieldPrediction);

module.exports = router;
