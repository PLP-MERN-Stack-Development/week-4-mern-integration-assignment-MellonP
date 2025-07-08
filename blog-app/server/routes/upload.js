const express = require('express');
const upload = require('../middleware/upload');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Upload image
router.post('/image', auth, upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'Image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;