const mongoose = require('mongoose');

const RedirectSchema = new mongoose.Schema({
    fromPath: {
        type: String,
        required: [true, 'Please add the source path'],
        unique: true
    },
    toPath: {
        type: String,
        required: [true, 'Please add the destination path']
    },
    code: {
        type: Number,
        enum: [301, 302],
        default: 301
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Redirect', RedirectSchema);
