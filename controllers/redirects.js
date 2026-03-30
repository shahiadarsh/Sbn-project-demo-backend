const Redirect = require('../models/Redirect');

// @desc    Get all redirects
// @route   GET /api/redirects
// @access  Private
exports.getRedirects = async (req, res) => {
    try {
        const redirects = await Redirect.find();
        res.status(200).json({ success: true, count: redirects.length, data: redirects });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create a redirect
// @route   POST /api/redirects
// @access  Private
exports.createRedirect = async (req, res) => {
    try {
        const redirect = await Redirect.create(req.body);
        res.status(201).json({ success: true, data: redirect });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete a redirect
// @route   DELETE /api/redirects/:id
// @access  Private
exports.deleteRedirect = async (req, res) => {
    try {
        const redirect = await Redirect.findByIdAndDelete(req.params.id);
        if (!redirect) return res.status(404).json({ success: false, message: 'Redirect not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
