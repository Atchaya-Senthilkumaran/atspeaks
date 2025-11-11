const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createRecordingRequest, getRecordingRequests } = require('../controllers/recordingController');

// Setup file upload using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Allow common image formats and PDFs
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf'
    ];
    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|pdf)$/i;

    const hasValidMimetype = allowedMimeTypes.includes(file.mimetype);
    const hasValidExtension = allowedExtensions.test(file.originalname);

    if (hasValidMimetype || hasValidExtension) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, gif, webp) and PDFs are allowed'));
    }
  }
});

// Routes
router.post('/', upload.single('paymentScreenshot'), createRecordingRequest);
router.get('/', getRecordingRequests);

module.exports = router;
