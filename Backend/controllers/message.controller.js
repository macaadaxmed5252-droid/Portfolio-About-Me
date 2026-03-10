import Message from '../models/Message.model.js';
import sendEmail from '../utils/email.util.js';

// ─── POST /api/messages (public) ─────────────────────────────────────────────
export const createMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = await Message.create({ name, email, subject, message });

        // Send confirmation email
        try {
            await sendEmail({
                email: email,
                subject: `Waad ku mahadsantahay: ${subject}`,
                message: `Salaan mudane/marwo ${name},\n\nFarriintaadii waan helnay. Waxaan kuugu soo jawaabi doonaa sida ugu dhaqsaha badan.\n\nMahadsanid.`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #7C3AED;">Salaan Mudane/Marwo ${name}</h2>
                        <p>Farriintaadii oo ku saabsanayd <b>"${subject}"</b> si guul leh ayaan u helnay.</p>
                        <p>Waxaan kuugu soo jawaabi doonaa sida ugu dhaqsaha badan ee suuragalka ah.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 0.8rem; color: #666;">Fariintan waxaa soo dirtay nidaamka portfolio-ga Muad Ahmed.</p>
                    </div>
                `
            });
        } catch (emailErr) {
            console.error('Email failed to send:', emailErr);
        }

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
