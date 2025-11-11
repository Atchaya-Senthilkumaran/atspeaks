const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');

router.post('/', createContact);
router.get('/', getContacts); // optional admin route

module.exports = router;
