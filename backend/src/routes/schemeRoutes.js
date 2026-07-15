const express = require('express');
const router = express.Router();
const { fetchSchemes } = require('../controllers/schemeController');

router.get('/', fetchSchemes);

module.exports = router;
