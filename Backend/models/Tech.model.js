import mongoose from 'mongoose';

const techSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Technology name is required'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        iconUrl: {
            type: String,
            required: [true, 'Icon URL is required'],
        },
        iconPublicId: {
            type: String, // Cloudinary public_id
        },
        color: {
            type: String,
            default: 'shadow-white/10',
        },
        textColor: {
            type: String,
            default: 'group-hover:text-white',
        },
        invert: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

techSchema.index({ order: 1, name: 1 });

export default mongoose.model('Tech', techSchema);
