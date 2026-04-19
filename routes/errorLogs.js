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

// @desc    Report an error (Public)
// @route   POST /api/error-logs/report
router.post('/report', async (req, res) => {
    try {
        const { url, referer, userAgent, statusCode } = req.body;
        const log = await ErrorLog.create({
            url,
            referer,
            userAgent,
            statusCode: statusCode || 404,
            timestamp: Date.now(),
            ip: req.ip
        });
        res.status(201).json({ success: true, data: log });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = router;
