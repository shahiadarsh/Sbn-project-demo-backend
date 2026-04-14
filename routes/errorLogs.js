const express = require('express');
const router = express.Router();
const ErrorLog = require('../models/ErrorLog');

// @desc    Get all error logs
// @route   GET /api/error-logs
// @access  Private
router.get('/', async (req, res) => {
    try {
        const logs = await ErrorLog.find().sort({ timestamp: -1 }).limit(100);
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// @desc    Clear logs
router.delete('/', async (req, res) => {
    try {
        await ErrorLog.deleteMany();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = router;
