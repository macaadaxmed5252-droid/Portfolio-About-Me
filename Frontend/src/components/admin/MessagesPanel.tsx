import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, Mail, Clock, Loader2, CheckCheck, MessageSquare } from 'lucide-react';
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
        if (!confirm('Purge this transmission?')) return;
        try {
            await messagesAPI.delete(id);
            toast.success('Transmission purged.');
            setMessages(prev => prev.filter(m => m._id !== id));
            if (selected?._id === id) setSelected(null);
        } catch {
            toast.error('Purge failed.');
        }
    };

    const unread = messages.filter(m => !m.isRead).length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-[2rem] shadow-sm">
                <div>
                    <h2 className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">Inbound Signals</h2>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2 opacity-60">Communication encrypted packets</p>
                </div>
                {unread > 0 && (
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-2xl animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{unread} UNRESOLVED SIGNALS</span>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-32 bg-card/50 border-2 border-dashed border-border rounded-[3rem]">
                    <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-xl font-black text-foreground/40 uppercase tracking-tighter">Zero Traffic</h3>
                    <p className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase mt-2">No incoming transmissions recorded</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Message List */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-3 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg._id}
                                layout
                                onClick={() => handleRead(msg)}
                                className={`
                                    relative p-6 rounded-[2rem] border cursor-pointer transition-all duration-500 group
                                    ${selected?._id === msg._id
                                        ? 'bg-primary/5 border-primary shadow-xl shadow-primary/5'
                                        : 'bg-card border-border/50 hover:border-primary/20 hover:shadow-2xl'
                                    }
                                    ${!msg.isRead ? 'ring-1 ring-primary/10' : ''}
                                `}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {!msg.isRead && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20 shrink-0" />
                                            )}
                                            <p className={`text-[12px] font-black uppercase tracking-tight truncate ${!msg.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {msg.name}
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground truncate mb-4 font-bold opacity-60 uppercase tracking-widest">{msg.subject}</p>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">
                                                <Clock size={10} />
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                                        className="p-3 rounded-2xl text-muted-foreground hover:text-red-500 bg-secondary hover:bg-red-500/10 transition-all active:scale-90"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <AnimatePresence mode="wait">
                            {selected ? (
                                <motion.div
                                    key={selected._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-card border border-border/50 rounded-[3rem] p-8 md:p-12 shadow-sm min-h-[500px] flex flex-col relative overflow-hidden"
                                >
                                    {/* Decorative background element */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                                    <div className="relative">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-border/50 mb-10">
                                            <div className="space-y-4">
                                                <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                                    Signal Identification: #{selected._id.slice(-6)}
                                                </div>
                                                <h3 className="font-black text-foreground text-3xl md:text-4xl tracking-tighter leading-none uppercase">{selected.subject}</h3>
                                                
                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex items-center gap-2.5 px-4 py-2 bg-muted/50 rounded-2xl border border-border/50">
                                                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                            <Mail size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-foreground text-[11px] font-black uppercase tracking-tight">{selected.name}</span>
                                                            <span className="text-muted-foreground text-[9px] font-bold opacity-60">{selected.email}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2.5 px-4 py-2 bg-muted/50 rounded-2xl border border-border/50">
                                                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground border border-border/50">
                                                            <Clock size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-foreground text-[11px] font-black uppercase tracking-tight">{new Date(selected.createdAt).toLocaleDateString()}</span>
                                                            <span className="text-muted-foreground text-[9px] font-bold opacity-60">{new Date(selected.createdAt).toLocaleTimeString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {selected.isRead && (
                                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-2xl border border-emerald-500/20 uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                                                    <CheckCheck size={14} /> ARCHIVED
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-12">
                                            <div className="bg-muted/30 border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-inner">
                                                <p className="text-foreground/80 leading-relaxed text-sm md:text-base whitespace-pre-wrap font-bold uppercase tracking-tight">
                                                    {selected.message}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <a
                                                href={`mailto:${selected.email}?subject=RE: ${selected.subject}`}
                                                className="flex-1 md:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary text-primary-foreground rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-2xl shadow-primary/20 active:scale-95"
                                            >
                                                <Mail size={18} /> Transmit Response
                                            </a>
                                            <button
                                                onClick={() => handleDelete(selected._id)}
                                                className="p-5 bg-secondary text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-3xl transition-all active:scale-95"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[500px] flex items-center justify-center bg-card/30 border-4 border-dashed border-border/50 rounded-[4rem]">
                                    <div className="text-center px-10">
                                        <div className="w-24 h-24 bg-muted/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-border/50 shadow-inner">
                                            <Eye size={40} className="text-muted-foreground opacity-20" />
                                        </div>
                                        <h4 className="font-black text-foreground/40 text-2xl mb-2 uppercase tracking-tighter leading-none">Awaiting Signal Selection</h4>
                                        <p className="text-[11px] text-muted-foreground/40 max-w-[240px] mx-auto font-black uppercase tracking-widest leading-relaxed">Select a communication packet from the left console to verify payload details</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
};


export default MessagesPanel;
