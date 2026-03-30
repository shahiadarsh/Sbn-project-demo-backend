const Setting = require('../models/Setting');

// @desc    Get a setting by key
// @route   GET /api/settings/:key
// @access  Public
exports.getSetting = async (req, res) => {
    try {
        const setting = await Setting.findOne({ key: req.params.key });
        if (!setting) {
            // Return default for robots.txt if not found
            if (req.params.key === 'robots_txt') {
                return res.status(200).json({ success: true, data: { value: 'User-agent: *\nAllow: /' } });
            }
            return res.status(404).json({ success: false, message: 'Setting not found' });
        }
        res.status(200).json({ success: true, data: setting });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update or create a setting
// @route   POST /api/settings
// @access  Private
exports.updateSetting = async (req, res) => {
    try {
        const { key, value } = req.body;
        const setting = await Setting.findOneAndUpdate(
            { key },
            { value, updatedAt: Date.now() },
            { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: setting });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
