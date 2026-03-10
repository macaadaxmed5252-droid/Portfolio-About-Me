import Message from '../models/Message.model.js';

// ─── POST /api/messages (public) ─────────────────────────────────────────────
export const createMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = await Message.create({ name, email, subject, message });

        res.status(201).json({
            success: true,
            message: 'Message received! I will get back to you soon.',
            data: newMessage,
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/messages (admin) ───────────────────────────────────────────────
export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find()
            .sort({ createdAt: -1 })
            .lean();

        const unreadCount = await Message.countDocuments({ isRead: false });

        res.json({
            success: true,
            count: messages.length,
            unread: unreadCount,
            data: messages,
        });
    } catch (error) {
        next(error);
    }
};

// ─── PATCH /api/messages/:id/read (admin) ────────────────────────────────────
export const markAsRead = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found.' });
        }

        res.json({ success: true, data: message });
    } catch (error) {
        next(error);
    }
};

// ─── DELETE /api/messages/:id (admin) ────────────────────────────────────────
export const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found.' });
        }

        res.json({ success: true, message: 'Message deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
