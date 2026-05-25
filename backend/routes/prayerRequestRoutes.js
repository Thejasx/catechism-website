const express = require('express');
const router = express.Router();
const PrayerRequest = require('../models/PrayerRequest');
const { protect } = require('../middleware/auth');

// @route   POST /api/prayer-requests
// @desc    Submit a prayer request
// @access  Public
router.post('/', async (req, res) => {
  const { name, requestText } = req.body;

  if (!name || !requestText) {
    return res.status(400).json({ message: 'Please fill in name and prayer request details' });
  }

  try {
    const newRequest = new PrayerRequest({
      name,
      requestText
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/prayer-requests
// @desc    Get all prayer requests
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const requests = await PrayerRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/prayer-requests/:id
// @desc    Delete a prayer request
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const request = await PrayerRequest.findById(req.params.id);

    if (request) {
      await PrayerRequest.deleteOne({ _id: req.params.id });
      res.json({ message: 'Prayer request removed' });
    } else {
      res.status(404).json({ message: 'Prayer request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
