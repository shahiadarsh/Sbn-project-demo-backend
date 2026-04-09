const express = require('express');
const { getSeo, upsertSeo, getAllSeo, deleteSeo, getSitemapData } = require('../controllers/seo');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllSeo);
router.post('/', protect, upsertSeo);
router.get('/tools/sitemap', protect, getSitemapData);
router.get('/:page', getSeo);
router.delete('/:id', protect, deleteSeo);

module.exports = router;
