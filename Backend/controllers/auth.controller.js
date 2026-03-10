import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

// ─── Helper: sign & send JWT cookie ──────────────────────────────────────────
const sendTokenResponse = (admin, statusCode, res) => {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    };

    res
        .status(statusCode)
        .cookie('adminToken', token, cookieOptions)
        .json({
            success: true,
            token,
            admin: { id: admin._id, email: admin.email, profileImage: admin.profileImage },
        });
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Include password (+password) since we set select: false on model
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        sendTokenResponse(admin, 200, res);
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
export const logout = (req, res) => {
    res
        .cookie('adminToken', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })
        .json({ success: true, message: 'Logged out successfully.' });
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
export const getMe = (req, res) => {
    res.json({
        success: true,
        admin: { id: req.admin._id, email: req.admin.email, profileImage: req.admin.profileImage },
    });
};

// ─── POST /api/auth/setup (one-time admin setup) ─────────────────────────────
export const setupAdmin = async (req, res, next) => {
    try {
        const existing = await Admin.findOne({});
        if (existing) {
            return res.status(403).json({
                success: false,
                message: 'Admin account already exists.',
            });
        }

        const admin = await Admin.create({
            email: req.body.email || process.env.ADMIN_EMAIL,
            password: req.body.password || process.env.ADMIN_PASSWORD,
        });

        sendTokenResponse(admin, 201, res);
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/auth/profile ───────────────────────────────────────────────────
export const updateProfile = async (req, res, next) => {
    try {
        const updateData = {};
        if (req.file) updateData.profileImage = req.file.path;
        if (req.body.email) updateData.email = req.body.email; // Optional email change

        const admin = await Admin.findByIdAndUpdate(req.admin._id, updateData, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            admin: { id: admin._id, email: admin.email, profileImage: admin.profileImage },
        });
    } catch (error) {
        next(error);
    }
};
