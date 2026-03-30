const express = require('express');
const { getRedirects, createRedirect, deleteRedirect } = require('../controllers/redirects');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All redirect routes are private

router.get('/', getRedirects);
router.post('/', createRedirect);
router.delete('/:id', deleteRedirect);

module.exports = router;
