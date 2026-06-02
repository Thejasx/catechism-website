const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');

// Use memory storage instead of disk — works on Vercel's read-only filesystem
const storage = multer.memoryStorage();

// File filter (images only)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(
    file.originalname.split('.').pop().toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpg, jpeg, png, webp, gif)!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// @route   POST /api/upload
// @desc    Upload an image and return it as a base64 data URI
// @access  Private (Admin)
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Convert the in-memory buffer to a base64 data URI
  const base64 = req.file.buffer.toString('base64');
  const dataUri = `data:${req.file.mimetype};base64,${base64}`;

  res.json({
    message: 'Image uploaded successfully',
    imageUrl: dataUri
  });
});

module.exports = router;
