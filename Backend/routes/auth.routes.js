import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, getMe, setupAdmin, updateProfile } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

// POST /api/auth/setup  — One-time admin creation
router.post('/setup', setupAdmin);

// POST /api/auth/login
router.post(
    '/login',
    authRateLimiter,
    [
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validate,
    login
);

// POST /api/auth/logout
router.post('/logout', protect, logout);

// GET /api/auth/me
router.get('/me', protect, getMe);

// PUT /api/auth/profile
router.put('/profile', protect, upload.single('image'), updateProfile);

export default router;
