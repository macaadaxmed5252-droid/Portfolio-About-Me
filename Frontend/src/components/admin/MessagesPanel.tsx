import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, Mail, Clock, Loader2, CheckCheck } from 'lucide-react';
import { messagesAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

const MessagesPanel = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Message | null>(null);

    const fetchMessages = async () => {
        try {
            const res = await messagesAPI.getAll();
            setMessages(res.data.data);
        } catch {
            toast.error('Failed to load messages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleRead = async (msg: Message) => {
        setSelected(msg);
        if (!msg.isRead) {
            try {
                await messagesAPI.markAsRead(msg._id);
                setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
            } catch { /* silent */ }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this message?')) return;
        try {
            await messagesAPI.delete(id);
            toast.success('Message deleted.');
            setMessages(prev => prev.filter(m => m._id !== id));
            if (selected?._id === id) setSelected(null);
        } catch {
            toast.error('Failed to delete.');
        }
    };

    const unread = messages.filter(m => !m.isRead).length;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-black text-foreground tracking-tighter uppercase leading-none">Inbound Messages</h2>
                    {unread > 0 && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-black rounded-full border border-red-200 shadow-sm animate-pulse uppercase tracking-widest">
                            {unread} Priority
                        </span>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-xl text-xs font-black uppercase tracking-widest opacity-60">Zero traffic recorded...</div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-5 items-start">
                    {/* Message List */}
                    <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg._id}
                                layout
                                onClick={() => handleRead(msg)}
                                className={`
                                    relative p-4 rounded-xl border cursor-pointer transition-all duration-300 shadow-sm
                                    ${selected?._id === msg._id
                                        ? 'bg-primary/5 border-primary shadow-md shadow-primary/5'
                                        : 'bg-card border-border hover:border-primary/20 hover:shadow-md'
                                    }
                                    ${!msg.isRead ? 'border-l-4 border-l-primary ring-1 ring-primary/5' : ''}
                                `}
                            >
                                <div className="flex items-start justify-between gap-2.5">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            {!msg.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0 ring-4 ring-primary/10" />}
                                            <p className={`text-[11px] font-black uppercase truncate tracking-tight ${!msg.isRead ? 'text-foreground' : 'text-slate-500'}`}>
                                                {msg.name}
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground truncate mb-2 font-bold opacity-70">{msg.email}</p>
                                        <div className="inline-block px-2 py-0.5 bg-muted rounded-md text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                                            {msg.subject}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2.5 shrink-0">
                                        <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                                            className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Message Detail */}
                    <div className="bg-card border border-border rounded-xl p-6 sticky top-6 shadow-sm min-h-[350px]">
                        {selected ? (
                            <div className="space-y-5">
                                <div className="flex items-start justify-between border-b border-border pb-5">
                                    <div>
                                        <h3 className="font-black text-foreground text-xl tracking-tighter leading-tight mb-2 uppercase">{selected.subject}</h3>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                                    <Mail size={10} />
                                                </div>
                                                <span className="text-slate-700 text-[11px] font-black uppercase tracking-tight">{selected.name}</span>
                                                <span className="text-muted-foreground text-[10px] font-bold opacity-60">{selected.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                                    <Clock size={10} />
                                                </div>
                                                <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">
                                                    {new Date(selected.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {selected.isRead && (
                                        <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-600 text-[8px] font-black rounded-full border border-emerald-200 uppercase tracking-widest">
                                            <CheckCheck size={12} /> Seen
                                        </span>
                                    )}
                                </div>
                                <div className="py-1">
                                    <div className="bg-muted border border-border rounded-xl p-5">
                                        <p className="text-slate-600 leading-relaxed text-[11px] whitespace-pre-wrap font-bold">{selected.message}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/10 active:scale-95"
                                    >
                                        <Mail size={14} /> Send Response
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                <div className="text-center px-6">
                                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3 border border-border">
                                        <Eye size={24} className="opacity-40" />
                                    </div>
                                    <h4 className="font-black text-foreground text-sm mb-1 uppercase tracking-tighter">Null Selection</h4>
                                    <p className="text-[10px] text-slate-500 max-w-[180px] mx-auto font-bold uppercase tracking-widest opacity-60">Pick a transmission to audit details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesPanel;
