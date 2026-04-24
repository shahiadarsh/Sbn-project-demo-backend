const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { handleRedirects, notFoundLogger } = require('./middleware/errorMonitor');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Redirection Manager
app.use(handleRedirects);

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes placeholders
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/seo', require('./routes/seo'));
app.use('/api/redirects', require('./routes/redirects'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/error-logs', require('./routes/errorLogs'));
app.use('/api/upload', require('./routes/upload'));

// Catch-all 404
app.use(notFoundLogger);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
