const Contact = require('../models/Contact');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort('-createdAt');
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create contact
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, data: contact });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update contact status
// @route   PUT /api/contacts/:id
// @access  Private
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
        res.status(200).json({ success: true, data: contact });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
