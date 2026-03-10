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
// ─── DB Connection Middleware (Robust for Serverless) ──────────────────────
app.use(async (req, res, next) => {
    // Skip DB for health check or root if preferred, but usually health needs DB
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error (DB)' });
    }
});

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());
const allowedOrigins = [
    'http://localhost:5252',
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        // Allow any vercel.app subdomain automatically
        if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
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

// ─── Health Check & Root ───────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({ message: 'Muad Ahmed Portfolio API is active', node_env: process.env.NODE_ENV });
});

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
// ─── Start Server (Local Only) ────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 Server running on port ${PORT}\n`);
    });
}

export default app;
