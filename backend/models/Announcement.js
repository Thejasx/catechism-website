const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String, // E.g., for Bible quotes or additional descriptions
    trim: true
  },
  type: {
    type: String,
    enum: ['new', 'event', 'info', 'notice'],
    default: 'info'
  },
  dateText: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Announcement', announcementSchema);
