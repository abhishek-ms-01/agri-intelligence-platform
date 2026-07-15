const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/advisorController');

router.post('/chat', chat);

module.exports = router;
