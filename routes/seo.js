const express = require('express');
const { getSeo, upsertSeo, getAllSeo, deleteSeo, getSitemapData } = require('../controllers/seo');
const { protect, authorize, restrictSeoEditor } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllSeo);
router.post('/', protect, restrictSeoEditor, upsertSeo);
router.get('/tools/sitemap', protect, getSitemapData);
router.get(/\/(.*)/, getSeo);
router.delete('/:id', protect, authorize('admin'), deleteSeo);

module.exports = router;
