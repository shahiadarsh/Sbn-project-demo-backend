const express = require('express');
const { getContacts, createContact, updateContact } = require('../controllers/contacts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getContacts)
    .post(createContact);

router.put('/:id', protect, updateContact);

module.exports = router;
