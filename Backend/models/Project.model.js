import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        techStack: {
            type: [String],
            required: [true, 'Tech stack is required'],
            validate: {
                validator: (arr) => arr.length > 0,
                message: 'At least one technology is required',
            },
        },
        imageUrl: {
            type: String,
            required: [true, 'Project image is required'],
        },
        imagePublicId: {
            type: String, // Cloudinary public_id for deletion
        },
        liveUrl: {
            type: String,
            trim: true,
        },
        githubUrl: {
            type: String,
            trim: true,
        },
        color: {
            type: String,
            default: 'from-blue-500/40 to-cyan-400/40',
        },
        order: {
            type: Number,
            default: 0, // for manual sorting
        },
        isFeatured: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Sort by order then newest
projectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model('Project', projectSchema);
