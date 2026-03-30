const Seo = require('../models/Seo');

// @desc    Get SEO for a page
// @route   GET /api/seo/:page
// @access  Public
exports.getSeo = async (req, res) => {
    try {
        const seo = await Seo.findOne({ page: req.params.page });
        if (!seo) return res.status(404).json({ success: false, message: 'SEO not found' });
        res.status(200).json({ success: true, data: seo });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Upsert SEO (Create or Update)
// @route   POST /api/seo
// @access  Private
exports.upsertSeo = async (req, res) => {
    try {
        const { page } = req.body;
        const seo = await Seo.findOneAndUpdate(
            { page },
            { ...req.body, updatedAt: Date.now() },
            { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: seo });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all SEO entries
// @route   GET /api/seo
// @access  Private
exports.getAllSeo = async (req, res) => {
    try {
        const seos = await Seo.find();
        res.status(200).json({ success: true, count: seos.length, data: seos });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
// @desc    Delete SEO entry
exports.deleteSeo = async (req, res) => {
    try {
        const seo = await Seo.findByIdAndDelete(req.params.id);
        if (!seo) return res.status(404).json({ success: false, message: 'SEO entry not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Generate Sitemap Data
// @route   GET /api/seo/tools/sitemap
// @access  Private
exports.getSitemapData = async (req, res) => {
    try {
        const seos = await Seo.find().select('page updatedAt');
        // Basic logic: return list of URLs for frontend to generate XML
        const urls = seos.map(s => ({
            url: `/${s.page}`,
            lastmod: s.updatedAt,
            changefreq: 'weekly',
            priority: s.page === 'home' ? 1.0 : 0.8
        }));
        res.status(200).json({ success: true, data: urls });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Placeholder for Redirects and Robots management
// Since these involve file system or complex logic, we'll use a Redirect model if needed later.
