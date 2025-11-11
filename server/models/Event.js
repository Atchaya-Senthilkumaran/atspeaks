const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema({
  role: { type: String },
  name: { type: String, required: true },
  title: { type: String },
  bio: { type: String },
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String }, // keep as string for simple display; can be Date if needed
  type: { type: String, enum: ['Past', 'Upcoming'], default: 'Upcoming' },
  description: { type: String },
  poster: { type: String }, // URL or path to poster
  price: { type: Number, default: 0 }, // Recording price in rupees
  recordingAvailable: { type: Boolean, default: true }, // Whether recording can be booked
  highlights: [{ type: String }],
  speaker: SpeakerSchema,
  speakers: [SpeakerSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
