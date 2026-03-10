import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import Admin from './models/Admin.model.js';

async function checkAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: 'portfolio' });
        console.log('Connected to MongoDB (portfolio)');

        const admins = await Admin.find({});
        if (admins.length === 0) {
            console.log('No admins found in portfolio database.');
        } else {
            console.log(`Found ${admins.length} admin(s) in portfolio:`);
            admins.forEach(admin => {
                console.log(`- Email: ${admin.email}`);
            });
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkAdmin();
