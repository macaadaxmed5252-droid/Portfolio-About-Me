import Testimonial from '../models/Testimonial.model.js';

// ─── POST /api/testimonials (public) ─────────────────────────────────────────
export const createTestimonial = async (req, res, next) => {
    try {
        const { username, email, rating, comment, position, company } = req.body;

        const newTestimonial = await Testimonial.create({
            username,
            email,
            rating: Number(rating),
            comment,
            position,
            company,
            userImage: req.file ? req.file.path : ''
        });

        res.status(201).json({
            success: true,
            message: 'Waad ku mahadsantahay! Ra\'yigaaga waa la diray, waxaana la soo saari doonaa marka la eego.',
            data: newTestimonial
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/testimonials (public) ──────────────────────────────────────────
export const getApprovedTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/admin/testimonials (admin) ──────────────────────────────────────
export const getAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/admin/testimonials/:id (admin) ───────────────────────────────────
export const approveTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }

        res.json({
            success: true,
            message: 'Testimonial approved successfully.',
            data: testimonial
        });
    } catch (error) {
        next(error);
    }
};

// ─── DELETE /api/admin/testimonials/:id (admin) ────────────────────────────────
export const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }

        res.json({
            success: true,
            message: 'Testimonial deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};
