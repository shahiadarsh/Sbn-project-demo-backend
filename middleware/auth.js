const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role || 'admin';
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: `User role '${userRole}' is not authorized to access this resource`
            });
        }
        next();
    };
};

// Strict check for SEO Editor role: blocks deletion, slug mutation, and script injection
exports.restrictSeoEditor = (req, res, next) => {
    if (req.user && req.user.role === 'seo_editor') {
        // 1. Block page/blog deletion
        if (req.method === 'DELETE') {
            return res.status(403).json({
                success: false,
                message: 'SEO Editors are not permitted to delete content or pages.'
            });
        }

        // 2. Block modifying slug or URL architecture
        if (req.body && req.body.slug && req.method === 'PUT') {
            delete req.body.slug; // Strips slug tampering
        }

        // 3. Block raw HTML script injection in SEO / content fields
        const stringified = JSON.stringify(req.body);
        if (/<script|javascript:|eval\(|<iframe/i.test(stringified)) {
            return res.status(400).json({
                success: false,
                message: 'Raw script, iframe, or javascript: execution is strictly prohibited.'
            });
        }
    }
    next();
};
