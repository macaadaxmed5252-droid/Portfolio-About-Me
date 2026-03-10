import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import techRoutes from './routes/tech.routes.js';
import messageRoutes from './routes/message.routes.js';
import subscriberRoutes from './routes/subscriber.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// ─── App Init ─────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5566;

// ─── Connect Database ─────────────────────────────────────────────────────────
connectDB();

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        // Accept all origins for development, useful when Vite runs on dynamic ports like 5253
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── General Middleware ────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
app.use('/api/', globalRateLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/techs', techRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/testimonials', testimonialRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}\n`);
});

export default app;
