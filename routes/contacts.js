const express = require('express');
const { getContacts, createContact, updateContact } = require('../controllers/contacts');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, authorize('admin'), getContacts)
    .post(createContact);

router.put('/:id', protect, authorize('admin'), updateContact);

module.exports = router;
