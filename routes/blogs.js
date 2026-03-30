const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogs');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, createBlog);

router.route('/:id')
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);

router.get('/slug/:slug', getBlog);

module.exports = router;
