const express = require('express');
const { getSetting, updateSetting } = require('../controllers/settings');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:key', getSetting);
router.post('/', protect, updateSetting);

module.exports = router;
