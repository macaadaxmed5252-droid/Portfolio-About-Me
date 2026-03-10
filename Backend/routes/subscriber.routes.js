import { Router } from 'express';
import { body } from 'express-validator';
import {
    subscribe,
    getAllSubscribers,
    deleteSubscriber,
} from '../controllers/subscriber.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

// Public — subscribe
router.post(
    '/',
    contactRateLimiter,
    [
        body('email').isEmail().withMessage('Valid email address is required').normalizeEmail(),
    ],
    validate,
    subscribe
);

// Admin protected
router.get('/', protect, getAllSubscribers);
router.delete('/:id', protect, deleteSubscriber);

export default router;
