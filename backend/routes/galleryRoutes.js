const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const { protect } = require('../middleware/auth');

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find({}).sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/gallery
// @desc    Create a new gallery item
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  const { imageUrl, category, title } = req.body;

  if (!imageUrl || !category) {
    return res.status(400).json({ message: 'Please provide an image URL and a category' });
  }

  try {
    const galleryItem = new GalleryItem({
      imageUrl,
      category,
      title
    });

    const createdItem = await galleryItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update a gallery item
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  const { imageUrl, category, title } = req.body;

  try {
    const galleryItem = await GalleryItem.findById(req.params.id);

    if (galleryItem) {
      galleryItem.imageUrl = imageUrl || galleryItem.imageUrl;
      galleryItem.category = category || galleryItem.category;
      galleryItem.title = title !== undefined ? title : galleryItem.title;

      const updatedItem = await galleryItem.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery item
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);

    if (galleryItem) {
      await GalleryItem.deleteOne({ _id: req.params.id });
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
