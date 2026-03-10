import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name too long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            maxlength: [200, 'Subject too long'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            maxlength: [2000, 'Message too long'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

messageSchema.index({ isRead: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
