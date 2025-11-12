const express = require('express');
const router = express.Router();
const { createRecordingRequest, getRecordingRequests } = require('../controllers/recordingController');

// Routes
router.post('/', createRecordingRequest);
router.get('/', getRecordingRequests);

module.exports = router;
