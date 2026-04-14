const Redirect = require('../models/Redirect');
const ErrorLog = require('../models/ErrorLog');

// Middleware to handle 301 redirects from database
exports.handleRedirects = async (req, res, next) => {
    try {
        const redirect = await Redirect.findOne({ fromPath: req.originalUrl });
        if (redirect) {
            return res.redirect(redirect.code || 301, redirect.toPath);
        }
        next();
    } catch (err) {
        next();
    }
};

// Catch-all 404 logger
exports.notFoundLogger = async (req, res) => {
    try {
        // Log the 404 error
        await ErrorLog.create({
            url: req.originalUrl,
            method: req.method,
            referer: req.get('referer'),
            userAgent: req.get('user-agent'),
            ip: req.ip,
            statusCode: 404
        });
        
        res.status(404).json({
            success: false,
            message: `Resource not found: ${req.originalUrl}`
        });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Not Found' });
    }
};
