const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeCrop } = require('../controllers/cropController');

// Multer config for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/analyze', upload.single('image'), analyzeCrop);

module.exports = router;
