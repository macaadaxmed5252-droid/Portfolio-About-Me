import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import Admin from './models/Admin.model.js';

async function testLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'muad@admin.com';
        const password = 'Password123!';

        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            console.log('Admin not found in DB');
            return;
        }

        console.log('Admin found:', admin.email);
        const isMatch = await admin.comparePassword(password);
        console.log('Password match:', isMatch);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

testLogin();
