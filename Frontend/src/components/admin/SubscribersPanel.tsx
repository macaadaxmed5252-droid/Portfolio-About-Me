import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Calendar, Loader2, Download, Users } from 'lucide-react';
import { subscribersAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Subscriber {
    _id: string;
    email: string;
    subscribedAt: string;
    isActive: boolean;
}

const SubscribersPanel = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = async () => {
        try {
            const res = await subscribersAPI.getAll();
            setSubscribers(res.data.data);
        } catch {
            toast.error('Failed to load subscribers.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSubscribers(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Erase this node from the community?')) return;
        try {
            await subscribersAPI.delete(id);
            toast.success('Node erased.');
            setSubscribers(prev => prev.filter(s => s._id !== id));
        } catch {
            toast.error('Erasure failed.');
        }
    };

    const exportCSV = () => {
        const csv = ['Email,Subscribed At', ...subscribers.map(s =>
            `${s.email},${new Date(s.subscribedAt).toLocaleString()}`
        )].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `community-dataset-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-card border border-border/50 p-6 rounded-[2rem] shadow-sm">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shrink-0">
                        <Users size={28} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">Community Network</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                                {subscribers.length} ACTIVE NODES
                            </p>
                        </div>
                    </div>
                </div>
                {subscribers.length > 0 && (
                    <button
                        onClick={exportCSV}
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-secondary text-muted-foreground hover:text-foreground rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-sm active:scale-95 whitespace-nowrap border border-border/50"
                    >
                        <Download size={16} /> Download Dataset
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : subscribers.length === 0 ? (
                <div className="text-center py-32 bg-card/50 border-2 border-dashed border-border rounded-[3rem]">
                    <Mail size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-xl font-black text-foreground/40 uppercase tracking-tighter">Zero Nodes</h3>
                    <p className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase mt-2">No active community subscriptions</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {subscribers.map((s, i) => (
                        <motion.div
                            key={s._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="bg-card border border-border/50 rounded-[2rem] p-5 flex items-center justify-between group hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center shrink-0 border border-border/50 group-hover:bg-primary/5 transition-all">
                                    <Mail size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[12px] font-black text-foreground uppercase tracking-tight truncate group-hover:text-primary transition-colors">
                                        {s.email}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 opacity-50">
                                        <Calendar size={10} className="text-muted-foreground" />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                            {new Date(s.subscribedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(s._id)}
                                className="p-3 rounded-2xl text-muted-foreground hover:text-red-500 bg-secondary hover:bg-red-500/10 transition-all active:scale-90 opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default SubscribersPanel;
