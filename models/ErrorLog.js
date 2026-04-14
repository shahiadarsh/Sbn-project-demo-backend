const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    method: String,
    referer: String,
    userAgent: String,
    ip: String,
    statusCode: {
        type: Number,
        default: 404
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
