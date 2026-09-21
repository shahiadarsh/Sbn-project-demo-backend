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
        const { name, email, subject, message, website_url, _hp } = req.body;

        // 1. Anti-spam Honeypot detection
        if (website_url || _hp) {
            // Silently accept bots without saving to prevent spam
            return res.status(200).json({ success: true, message: 'Message received.' });
        }

        // 2. Server-side validation
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ success: false, error: 'Please provide a valid name (at least 2 characters).' });
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || !emailRegex.test(email.trim())) {
            return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
        }

        if (!subject || subject.trim().length < 2) {
            return res.status(400).json({ success: false, error: 'Please provide a valid subject.' });
        }

        if (!message || message.trim().length < 2) {
            return res.status(400).json({ success: false, error: 'Please provide a message or inquiry details.' });
        }

        // 3. Duplicate submit protection (within last 60 seconds)
        const recentDuplicate = await Contact.findOne({
            email: email.trim(),
            subject: subject.trim(),
            createdAt: { $gte: new Date(Date.now() - 60 * 1000) }
        });

        if (recentDuplicate) {
            return res.status(200).json({
                success: true,
                message: 'Your inquiry has already been submitted and is being processed.',
                data: recentDuplicate
            });
        }

        const contact = await Contact.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim()
        });

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
