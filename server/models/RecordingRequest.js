const mongoose = require('mongoose');

const RecordingRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    yearOrRole: { type: String, required: true },
    heardFrom: { type: String, required: true },
    eventId: { type: String },
    paymentScreenshot: { type: String, required: true }, // Filename
    paymentScreenshotPath: { type: String }, // Full path (/uploads/filename)
    paymentScreenshotBase64: { type: String }, // For Vercel deployment (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model('RecordingRequest', RecordingRequestSchema);
