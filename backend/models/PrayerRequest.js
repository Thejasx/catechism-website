const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  requestText: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PrayerRequest', prayerRequestSchema);
