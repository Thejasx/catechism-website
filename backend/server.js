const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Await DB connection for serverless
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// CORS — allow all origins (update to your frontend URL in production if needed)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Create uploads directory only in local dev (Vercel filesystem is read-only)
try {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  app.use('/uploads', express.static(uploadsDir));
} catch (e) {
  console.log('Uploads directory skipped (serverless env).');
}

// Route mapping
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/leaders', require('./routes/leaderRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/prayer-requests', require('./routes/prayerRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Root health check
app.get('/', (req, res) => {
  res.json({ message: 'Ernakulam Catechism Unit API is running ✓' });
});

// Listen only in local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
