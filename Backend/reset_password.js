import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import Admin from './models/Admin.model.js';

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'muad@admin.com';
        const newPassword = 'Password123!';

        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log(`Admin with email ${email} not found.`);
        } else {
            admin.password = newPassword;
            await admin.save();
            console.log(`Password for ${email} has been reset to: ${newPassword}`);
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

resetPassword();
