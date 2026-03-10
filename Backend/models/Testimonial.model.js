import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        lowercase: true
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please provide a comment'],
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    userImage: {
        type: String,
        default: ''
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;
