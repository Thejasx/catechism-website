const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: String, // String representation e.g. "20 - 22 June 2025"
    required: true,
    trim: true
  },
  time: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  countdownTarget: {
    type: Date, // Explicit target date/time for countdown countdown timer, e.g. ISODate "2025-06-07T00:00:00"
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
