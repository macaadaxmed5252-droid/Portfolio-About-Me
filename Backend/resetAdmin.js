import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from './models/Admin.model.js';

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio').then(async () => {
    console.log('Connected to DB');
    await Admin.deleteMany({});
    console.log('Cleared existing admins');

    const admin = await Admin.create({
        email: 'muad@admin.com',
        password: 'Password123!',
    });
    console.log('Admin successfully created:');
    console.log('Email: muad@admin.com');
    console.log('Password: Password123!');

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
