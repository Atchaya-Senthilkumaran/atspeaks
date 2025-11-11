const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial } = require('../controllers/testimonialController');

router.get('/', getTestimonials);
router.post('/', createTestimonial);

module.exports = router;
