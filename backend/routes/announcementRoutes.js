const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { protect } = require('../middleware/auth');

// @route   GET /api/announcements
// @desc    Get all announcements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/announcements
// @desc    Create a new announcement
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  const { title, content, type, dateText } = req.body;

  if (!title || !dateText) {
    return res.status(400).json({ message: 'Please provide a title and date text' });
  }

  try {
    const announcement = new Announcement({
      title,
      content,
      type,
      dateText
    });

    const createdAnnouncement = await announcement.save();
    res.status(201).json(createdAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/announcements/:id
// @desc    Update an announcement
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  const { title, content, type, dateText } = req.body;

  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      announcement.title = title || announcement.title;
      announcement.content = content !== undefined ? content : announcement.content;
      announcement.type = type || announcement.type;
      announcement.dateText = dateText || announcement.dateText;

      const updatedAnnouncement = await announcement.save();
      res.json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/announcements/:id
// @desc    Delete an announcement
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await Announcement.deleteOne({ _id: req.params.id });
      res.json({ message: 'Announcement removed' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
