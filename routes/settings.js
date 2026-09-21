const express = require('express');
const { getSetting, updateSetting } = require('../controllers/settings');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/:key', getSetting);
router.post('/', protect, authorize('admin'), updateSetting);

module.exports = router;
