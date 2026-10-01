const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const region = process.env.REGION || 'US';
        let uri = process.env.MONGO_URI;

        if (region.toUpperCase() === 'UAE' && process.env.MONGO_URI_UAE) {
            uri = process.env.MONGO_URI_UAE;
            console.log('Connecting to UAE Database Environment...');
        } else if (region.toUpperCase() === 'US' && process.env.MONGO_URI_US) {
            uri = process.env.MONGO_URI_US;
            console.log('Connecting to US Database Environment...');
        } else {
            console.log(`Connecting to default Database Environment (Region: ${region})...`);
        }

        if (!uri) {
            throw new Error('Database URI is not defined in the environment variables.');
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
