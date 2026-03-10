import Tech from '../models/Tech.model.js';
import { cloudinary } from '../config/cloudinary.js';

// ─── GET /api/techs (public) ──────────────────────────────────────────────────
export const getAllTechs = async (req, res, next) => {
    try {
        const techs = await Tech.find().sort({ order: 1, name: 1 }).lean();
        res.json({ success: true, count: techs.length, data: techs });
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/techs (admin) ──────────────────────────────────────────────────
export const createTech = async (req, res, next) => {
    try {
        const { name, color, textColor, invert, order } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tech icon is required.' });
        }

        const tech = await Tech.create({
            name,
            iconUrl: req.file.path,
            iconPublicId: req.file.filename,
            color: color || 'shadow-white/10',
            textColor: textColor || 'group-hover:text-white',
            invert: invert === 'true',
            order: order ? Number(order) : 0,
        });

        res.status(201).json({ success: true, data: tech });
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/techs/:id (admin) ───────────────────────────────────────────────
export const updateTech = async (req, res, next) => {
    try {
        const tech = await Tech.findById(req.params.id);
        if (!tech) {
            return res.status(404).json({ success: false, message: 'Technology not found.' });
        }

        const { name, color, textColor, invert, order } = req.body;

        if (req.file && tech.iconPublicId) {
            await cloudinary.uploader.destroy(tech.iconPublicId);
        }

        tech.name = name ?? tech.name;
        tech.color = color ?? tech.color;
        tech.textColor = textColor ?? tech.textColor;
        tech.order = order !== undefined ? Number(order) : tech.order;
        if (invert !== undefined) tech.invert = invert === 'true';

        if (req.file) {
            tech.iconUrl = req.file.path;
            tech.iconPublicId = req.file.filename;
        }

        await tech.save();
        res.json({ success: true, data: tech });
    } catch (error) {
        next(error);
    }
};

// ─── DELETE /api/techs/:id (admin) ───────────────────────────────────────────
export const deleteTech = async (req, res, next) => {
    try {
        const tech = await Tech.findById(req.params.id);
        if (!tech) {
            return res.status(404).json({ success: false, message: 'Technology not found.' });
        }

        if (tech.iconPublicId) {
            await cloudinary.uploader.destroy(tech.iconPublicId);
        }

        await Tech.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Technology deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
