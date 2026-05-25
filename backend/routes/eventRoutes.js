const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ countdownTarget: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  const { title, description, date, time, location, imageUrl, countdownTarget } = req.body;

  if (!title || !date || !location || !countdownTarget) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      imageUrl,
      countdownTarget
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  const { title, description, date, time, location, imageUrl, countdownTarget } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      event.title = title || event.title;
      event.description = description !== undefined ? description : event.description;
      event.date = date || event.date;
      event.time = time !== undefined ? time : event.time;
      event.location = location || event.location;
      event.imageUrl = imageUrl !== undefined ? imageUrl : event.imageUrl;
      event.countdownTarget = countdownTarget || event.countdownTarget;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await Event.deleteOne({ _id: req.params.id });
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
