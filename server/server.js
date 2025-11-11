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
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Connect DB (non-blocking, will use mock data if fails)
connectDB(process.env.MONGO_URI).catch(err => {
  console.log('⚠️ MongoDB connection failed, using mock data fallback');
});

// Middlewares
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
