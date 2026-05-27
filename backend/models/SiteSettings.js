const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  // Social Media Links
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  // Statistics Numbers (students, teachers, etc.)
  stats: {
    students: { type: Number, default: 0 },
    teachers: { type: Number, default: 0 },
    families: { type: Number, default: 0 }
  },
  // Contact Information
  contactInfo: {
    location: { type: String, default: '' },
    emailPrimary: { type: String, default: '' },
    emailSecondary: { type: String, default: '' },
    phonePrimary: { type: String, default: '' },
    phoneSecondary: { type: String, default: '' },
    officeTime: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    mapLink: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
