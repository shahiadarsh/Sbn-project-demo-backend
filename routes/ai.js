const express = require('express');
const router = express.Router();
const { chat, generateSeoSuggestions } = require('../controllers/ai');

router.post('/chat', chat);
router.post('/generate-seo', generateSeoSuggestions);

module.exports = router;
