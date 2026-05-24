const mongoose = require('mongoose');
const uri = 'mongodb+srv://vjzest9569_db_user:qnBfvAjzgczuLKqp@cluster0.ydbo5hd.mongodb.net/sbnhealthcare';

mongoose.connect(uri).then(async () => {
    console.log('Connected to DB');
    const db = mongoose.connection.db;
    const result = await db.collection('seos').findOneAndUpdate(
        { page: 'home' },
        { 
            $set: {
                page: 'home',
                title: 'Medical Billing Services | SBN Healthcare Solution',
                description: 'Struggling with claim denials? SBN expert medical billing services help USA practices recover more revenue reduce AR days and get paid faster. Free consultation!',
                primaryKeyword: 'Medical Billing Services',
                keywords: ['Medical Billing Services'],
                updatedAt: new Date()
            }
        },
        { upsert: true, returnDocument: 'after' }
    );
    console.log('Updated SEO for home:', result);
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
