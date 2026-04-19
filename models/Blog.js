const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    image: {
        type: String,
        default: 'default-blog.jpg'
    },
    imageAlt: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    readTime: {
        type: String,
        default: '5 Min Read'
    },
    // Advanced SEO Fields
    metaTitle: {
        type: String,
        trim: true
    },
    metaDescription: {
        type: String,
        trim: true
    },
    focusKeywords: {
        type: [String],
        default: []
    },
    canonicalUrl: {
        type: String,
        trim: true
    },
    robotsIndex: {
        type: Boolean,
        default: true
    },
    robotsFollow: {
        type: Boolean,
        default: true
    },
    // Open Graph
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    // Twitter
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
    twitterCard: {
        type: String,
        default: 'summary_large_image'
    },
    // Schema
    schemaType: {
        type: String,
        enum: ['Article', 'BlogPosting', 'FAQ', 'HowTo', 'JobPosting', 'LocalBusiness', 'Organization', 'None'],
        default: 'BlogPosting'
    },
    // Author
    author: {
        name: {
            type: String,
            default: 'SBN Healthcare Team'
        },
        bio: String,
        image: String
    },
    // Metrics & Quality
    seoScore: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

// Create slug from title before saving if missing
BlogSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Blog', BlogSchema);
