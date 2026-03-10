import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import Admin from './models/Admin.model.js';

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: 'portfolio' });
        console.log('Connected to MongoDB (portfolio)');

        const email = 'muad@admin.com';
        const password = 'Password123!';

        const existing = await Admin.findOne({ email });
        if (existing) {
            console.log(`Admin ${email} already exists in portfolio database.`);
            existing.password = password;
            await existing.save();
            console.log('Password updated.');
        } else {
            const admin = await Admin.create({
                email,
                password
            });
            console.log(`Admin ${email} created successfully in portfolio database.`);
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

createAdmin();
