const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

async function updateBlog() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const blog = await Blog.findOne({ slug: 'private-practices' });
        if (blog) {
            console.log('Found blog!');
            console.log('Old content:', blog.content.substring(0, 500)); // print first 500
            
            // let's do a replace
            blog.content = blog.content.replace(/href="[^"]*about[^"]*"/g, 'href="/services/medical-billing"');
            blog.content = blog.content.replace(/href="\/about-us"/g, 'href="/services"'); // fallback
            
            await blog.save();
            console.log('Updated blog!');
        } else {
            console.log('Blog private-practices not found');
            
            // just look at all blogs to see what's up
            const allBlogs = await Blog.find({});
            console.log('Available slugs:', allBlogs.map(b => b.slug));
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}
updateBlog();
