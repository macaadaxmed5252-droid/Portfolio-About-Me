import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

export const protect = async (req, res, next) => {
    try {
        // 1. Get token from httpOnly cookie or Authorization header
        let token = req.cookies?.adminToken;

        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated. Please log in.',
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Check if admin still exists
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'The admin belonging to this token no longer exists.',
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
        }
        next(error);
    }
};
