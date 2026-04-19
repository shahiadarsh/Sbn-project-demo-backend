const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Seo = require('../models/Seo');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pagesToFix = [
    {
        page: 'home',
        title: 'Medical Insurance Verification Service in New York | SBN',
        description: 'SBN provides medical insurance verification service in New York. Reduce claim denials with real-time checks and accurate eligibility verification.',
        primaryKeyword: 'Medical Insurance Verification Services',
        slug: ''
    },
    {
        page: 'about-us',
        title: 'About SBN Healthcare | RCM Experts for Medical Practices',
        description: 'Learn about SBN Healthcare, a trusted RCM partner delivering efficient, compliant, and performance-driven billing solutions for healthcare providers.',
        primaryKeyword: 'About SBN Healthcare',
        slug: 'about-us'
    },
    {
        page: 'pricing',
        title: 'Pricing Philosophy | Flexible RCM Pricing Models',
        description: 'Explore a flexible pricing philosophy with scalable RCM models. Improve revenue, reduce costs, and choose pricing strategies that fit your practice growth.',
        primaryKeyword: 'Pricing Philosophy',
        slug: 'pricing'
    },
    {
        page: 'rcm-calculator',
        title: 'RCM Calculator | Estimate Revenue Loss & Recovery',
        description: 'Use our RCM calculator to estimate revenue loss, denial impact, and recovery potential. Get instant insights to improve your billing performance.',
        primaryKeyword: 'RCM Calculator',
        slug: 'rcm-calculator'
    },
    {
        page: 'security',
        title: 'Compliance & Security Services | Secure Healthcare Systems',
        description: 'Ensure compliance & security with HIPAA-aligned systems. Protect data, control access, and meet security compliance standards with confidence.',
        primaryKeyword: 'Compliance & Security',
        slug: 'security'
    },
    {
        page: 'resources',
        title: 'Resource Guide: Hidden Revenue Leakage in Healthcare',
        description: 'Discover how the right resource helps reduce revenue leakage and why the best resource medical billing service for small clinics improves cash flow.',
        slug: 'resources'
    },
    {
        page: 'services',
        title: 'More Solutions for Easy Revenue Cycle Management',
        description: 'Discover more solutions for full RCM support. Reduce errors, improve cash flow, and manage your billing process in a simple and smooth way.',
        slug: 'services'
    },
    {
        page: 'patient-collections-ar-recovery',
        title: 'Fast and Simple Patient Collections System',
        description: 'Make collections easy with quick follow-ups and faster A/R recovery. Reduce unpaid balances and improve cash flow with a simple system.',
        slug: 'services/patient-collections-ar-recovery'
    },
    {
        page: 'consulting',
        title: 'RCM Consulting That Helps You Grow Faster',
        description: 'Get practical consulting services to improve your revenue cycle. Fix gaps, reduce errors, and build a smooth, reliable billing process.',
        slug: 'services/consulting'
    }
];

const fixAllSeo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to fix All SEO entries...');

        for (const data of pagesToFix) {
            await Seo.findOneAndUpdate(
                { page: data.page },
                { $set: data },
                { upsert: true, returnDocument: 'after' }
            );
            console.log(`SEO for ${data.page} fixed!`);
        }

        console.log('ALL SEO ENTRIES SYNCHRONIZED WITH REQUESTED CONTENT!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixAllSeo();
