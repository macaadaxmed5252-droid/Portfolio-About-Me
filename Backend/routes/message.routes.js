import { Router } from 'express';
import { body } from 'express-validator';
import {
    createMessage,
    getAllMessages,
    markAsRead,
    deleteMessage,
} from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

// Public — submit a contact message
router.post(
    '/',
    contactRateLimiter,
    [
        body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
        body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    ],
    validate,
    createMessage
);

// Admin protected
router.get('/', protect, getAllMessages);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

export default router;
