import { Router } from 'express';
import { body } from 'express-validator';
import {
    createTestimonial,
    getApprovedTestimonials,
    getAllTestimonials,
    approveTestimonial,
    deleteTestimonial
} from '../controllers/testimonial.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { uploadTestimonialImage } from '../config/cloudinary.js';

const router = Router();

// Public - submit a testimonial
router.post(
    '/',
    uploadTestimonialImage.single('image'),
    [
        body('username').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('rating').isNumeric().withMessage('Rating must be a number').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('comment').trim().notEmpty().withMessage('Message is required'),
        body('position').optional().trim(),
        body('company').optional().trim(),
    ],
    validate,
    createTestimonial
);

// Public - get approved testimonials
router.get('/', getApprovedTestimonials);

// Admin protected
router.get('/admin', protect, getAllTestimonials);
router.put('/admin/:id', protect, approveTestimonial);
router.delete('/admin/:id', protect, deleteTestimonial);

export default router;
