const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogs');
const { protect, authorize, restrictSeoEditor } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, restrictSeoEditor, createBlog);

router.route('/:id')
    .put(protect, restrictSeoEditor, updateBlog)
    .delete(protect, authorize('admin'), deleteBlog);

router.get('/slug/:slug', getBlog);

module.exports = router;
