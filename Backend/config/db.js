import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'portfolio',
            serverSelectionTimeoutMS: 5000, // Fail fast if IP is blocked
        });
        isConnected = true;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        // In serverless, we don't necessarily want to kill the process
        throw error;
    }
};
