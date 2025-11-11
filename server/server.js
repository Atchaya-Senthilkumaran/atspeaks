require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const eventRoutes = require('./routes/eventRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const recordingRoutes = require('./routes/recordingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB (non-blocking, will use mock data if fails)
connectDB(process.env.MONGO_URI).catch(err => {
  console.log('⚠️ MongoDB connection failed, using mock data fallback');
});

// Middlewares - CORS configured to allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/recordings', recordingRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve (if you later build frontend into server/public)
// app.use(express.static(path.join(__dirname, 'public')));

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
