import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Calendar, Loader2, Download } from 'lucide-react';
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
        if (!confirm('Remove this subscriber?')) return;
        try {
            await subscribersAPI.delete(id);
            toast.success('Subscriber removed.');
            setSubscribers(prev => prev.filter(s => s._id !== id));
        } catch {
            toast.error('Failed to remove subscriber.');
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
        a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-black text-foreground tracking-tighter uppercase leading-none">Newsletter Community</h2>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[9px] font-black rounded-full border border-emerald-200 shadow-sm uppercase tracking-widest">
                        {subscribers.length} Nodes
                    </span>
                </div>
                {subscribers.length > 0 && (
                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-slate-500 bg-secondary hover:bg-muted rounded-lg transition-all shadow-sm active:scale-95 uppercase tracking-widest"
                    >
                        <Download size={14} /> Export Dataset
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
            ) : subscribers.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-xl text-xs font-black uppercase tracking-widest opacity-60">No active subscribers found...</div>
            ) : (
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Endpoint Identification</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Initialization Date</th>
                                    <th className="px-6 py-4 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {subscribers.map((s, i) => (
                                    <motion.tr
                                        key={s._id}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="group hover:bg-primary/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center shrink-0 border border-primary/10">
                                                    <Mail size={12} className="text-primary" />
                                                </div>
                                                <span className="text-slate-700 text-[11px] font-black uppercase tracking-tight group-hover:text-primary transition-colors">{s.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-black uppercase tracking-widest opacity-70">
                                                <Calendar size={12} />
                                                {new Date(s.subscribedAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscribersPanel;
