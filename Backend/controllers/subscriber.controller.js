import Subscriber from '../models/Subscriber.model.js';

// ─── POST /api/subscribers (public) ──────────────────────────────────────────
export const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check for existing subscriber (graceful duplicate handling)
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            if (existing.isActive) {
                return res.status(409).json({
                    success: false,
                    message: 'This email is already subscribed.',
                });
            }
            // Re-activate if previously unsubscribed
            existing.isActive = true;
            existing.subscribedAt = new Date();
            await existing.save();
            return res.json({
                success: true,
                message: 'Welcome back! You have been re-subscribed.',
                data: existing,
            });
        }

        const subscriber = await Subscriber.create({ email });

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed! Thank you.',
            data: subscriber,
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/subscribers (admin) ─────────────────────────────────────────────
export const getAllSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find({ isActive: true })
            .sort({ subscribedAt: -1 })
            .lean();

        res.json({
            success: true,
            count: subscribers.length,
            data: subscribers,
        });
    } catch (error) {
        next(error);
    }
};

// ─── DELETE /api/subscribers/:id (admin) ─────────────────────────────────────
export const deleteSubscriber = async (req, res, next) => {
    try {
        const subscriber = await Subscriber.findByIdAndDelete(req.params.id);

        if (!subscriber) {
            return res.status(404).json({ success: false, message: 'Subscriber not found.' });
        }

        res.json({ success: true, message: 'Subscriber removed successfully.' });
    } catch (error) {
        next(error);
    }
};
