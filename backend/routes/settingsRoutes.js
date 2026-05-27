const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect } = require('../middleware/auth');

// @route   GET /api/settings
// @desc    Get site settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // create default settings if none exist
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/settings
// @desc    Update site settings (admin only)
router.put('/', protect, async (req, res) => {
  try {
    const updates = req.body;
    const settings = await SiteSettings.findOneAndUpdate({}, updates, { new: true, upsert: true });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
