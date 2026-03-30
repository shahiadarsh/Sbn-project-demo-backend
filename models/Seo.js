const mongoose = require('mongoose');

const SeoSchema = new mongoose.Schema({
    page: {
        type: String,
        required: [true, 'Please add a page identifier (e.g. home, about, blog-slug)'],
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please add SEO title']
    },
    description: {
        type: String,
        required: [true, 'Please add SEO description']
    },
    keywords: {
        type: String
    },
    primaryKeyword: {
        type: String
    },
    slug: {
        type: String
    },
    canonicalUrl: {
        type: String
    },
    robots: {
        type: String,
        default: 'index, follow'
    },
    // Social Media / Open Graph
    ogTitle: {
        type: String
    },
    ogDescription: {
        type: String
    },
    ogImage: {
        type: String
    },
    twitterCard: {
        type: String,
        default: 'summary_large_image'
    },
    // Schema
    schemaType: {
        type: String,
        enum: ['Article', 'Product', 'FAQ', 'Breadcrumb', 'Organization', 'Local Business', 'None'],
        default: 'None'
    },
    imageAlt: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Seo', SeoSchema);
