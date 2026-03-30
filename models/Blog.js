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
    date: {
        type: Date,
        default: Date.now
    },
    readTime: {
        type: String,
        default: '5 Min Read'
    }
});

// Create slug from title before saving
BlogSchema.pre('save', function (next) {
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

module.exports = mongoose.model('Blog', BlogSchema);
