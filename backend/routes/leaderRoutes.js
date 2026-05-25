const express = require('express');
const router = express.Router();
const Leader = require('../models/Leader');
const { protect } = require('../middleware/auth');

// @route   GET /api/leaders
// @desc    Get all leaders
// @access  Public
router.get('/', async (req, res) => {
  try {
    const leaders = await Leader.find({}).sort({ order: 1 });
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/leaders
// @desc    Create a new leader
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  const { name, role, imageUrl, order } = req.body;

  if (!name || !role || !imageUrl) {
    return res.status(400).json({ message: 'Please provide name, role, and image URL' });
  }

  try {
    const leader = new Leader({
      name,
      role,
      imageUrl,
      order: order !== undefined ? order : 0
    });

    const createdLeader = await leader.save();
    res.status(201).json(createdLeader);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/leaders/:id
// @desc    Update a leader
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  const { name, role, imageUrl, order } = req.body;

  try {
    const leader = await Leader.findById(req.params.id);

    if (leader) {
      leader.name = name || leader.name;
      leader.role = role || leader.role;
      leader.imageUrl = imageUrl || leader.imageUrl;
      leader.order = order !== undefined ? order : leader.order;

      const updatedLeader = await leader.save();
      res.json(updatedLeader);
    } else {
      res.status(404).json({ message: 'Leader not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/leaders/:id
// @desc    Delete a leader
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);

    if (leader) {
      await Leader.deleteOne({ _id: req.params.id });
      res.json({ message: 'Leader removed' });
    } else {
      res.status(404).json({ message: 'Leader not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
