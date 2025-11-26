const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// POST /api/registrations - Create new registration
router.post('/', registrationController.createRegistration);

// GET /api/registrations - Get all registrations (can filter by eventId)
router.get('/', registrationController.getRegistrations);

// GET /api/registrations/:id - Get single registration
router.get('/:id', registrationController.getRegistrationById);

module.exports = router;
