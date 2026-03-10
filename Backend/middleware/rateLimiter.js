import rateLimit from 'express-rate-limit';

// ─── Global limiter for all /api/* routes ─────────────────────────────────────
export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please try again later.' },
});

// ─── Strict limiter for auth routes ───────────────────────────────────────────
export const authRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many login attempts. Please try again in 1 hour.' },
});

// ─── Contact / Subscribe limiter ──────────────────────────────────────────────
export const contactRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many submissions. Please wait before trying again.' },
});
