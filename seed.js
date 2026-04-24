const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Blog = require('./models/Blog');
const Seo = require('./models/Seo');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Blog.deleteMany();
        await Seo.deleteMany();

        // Create Admin User
        await User.create({
            name: 'Admin User',
            email: 'admin@sbnhealthcare.com',
            password: 'Sbn@Admin2026' // This will be hashed by the model
        });
        console.log('Admin user created (admin@sbnhealthcare.com / Sbn@Admin2026)');

        // Create Initial Blog
        const blog = new Blog({
            title: 'Optimizing Revenue Cycle Management for 2026',
            excerpt: 'Discover the key strategies to streamline your clinical integrity and maximize revenue.',
            content: 'Full content goes here...',
            category: 'RCM Strategy',
            image: '/img/bg1.webp'
        });
        await blog.save();
        console.log('Sample blog created');

        // Create Initial SEO
        const seo = new Seo({
            page: 'home',
            title: 'SBN Healthcare Solution - Expert in Healthcare Billing Services',
            description: 'Improving your financial performance aimed at reducing costs and increasing revenue.'
        });
        await seo.save();
        console.log('Initial SEO tags created');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
