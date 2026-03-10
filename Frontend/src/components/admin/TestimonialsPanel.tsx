import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2, Check, Star, User, Loader2, MessageSquare,
    Filter, Search, Clock, Mail, ShieldCheck, AlertCircle
} from 'lucide-react';
import { testimonialsAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Testimonial {
    _id: string;
    username: string;
    email: string;
    rating: number;
    comment: string;
    position?: string;
    company?: string;
    userImage?: string;
    isApproved: boolean;
    createdAt: string;
}

const TestimonialsPanel = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await testimonialsAPI.getAllAdmin();
            setTestimonials(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch testimonials.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await testimonialsAPI.approve(id);
            toast.success("Identity verified!");
            setTestimonials(prev => prev.map(t => t._id === id ? { ...t, isApproved: true } : t));
        } catch (err) {
            toast.error("Verification failed.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Permanently erase this record?")) return;
        try {
            await testimonialsAPI.delete(id);
            toast.success("Record erased.");
            setTestimonials(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            toast.error("Erasure failed.");
        }
    };

    const filteredTestimonials = testimonials.filter(t => {
        const matchesSearch = t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.position && t.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (t.company && t.company.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filter === 'pending') return matchesSearch && !t.isApproved;
        if (filter === 'approved') return matchesSearch && t.isApproved;
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Dossiers', value: testimonials.length, icon: MessageSquare, color: 'text-primary' },
                    { label: 'Verified Nodes', value: testimonials.filter(t => t.isApproved).length, icon: ShieldCheck, color: 'text-emerald-500' },
                    { label: 'Pending Audit', value: testimonials.filter(t => !t.isApproved).length, icon: AlertCircle, color: 'text-amber-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm flex items-center gap-5 group hover:border-primary/20 transition-all duration-500">
                        <div className={`w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center ${stat.color} border border-border/50 group-hover:bg-primary/5 transition-all`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
                            <h3 className="text-2xl font-black text-foreground tracking-tighter leading-none">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row gap-6 items-center justify-between bg-card border border-border/50 p-6 rounded-[2.5rem] shadow-sm">
                <div className="relative w-full xl:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-muted/30 border border-border/50 pl-12 pr-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-tight focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder-slate-500"
                    />
                </div>

                <div className="flex gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
                    {(['all', 'pending', 'approved'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                                px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 border
                                ${filter === f
                                    ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20'
                                    : 'bg-muted/30 text-muted-foreground border-border/50 hover:bg-secondary'
                                }
                            `}
                        >
                            {f} AUDIT
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTestimonials.length > 0 ? (
                        filteredTestimonials.map((t) => (
                            <motion.div
                                key={t._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-card border border-border/50 rounded-[2.5rem] p-8 shadow-sm hover:border-primary/20 hover:shadow-2xl transition-all duration-500 flex flex-col group relative"
                            >
                                {/* Status Indicator */}
                                {!t.isApproved && (
                                    <div className="absolute -top-3 -right-3 bg-amber-500 text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 border-2 border-card">
                                        <AlertCircle size={12} /> Pending Audit
                                    </div>
                                )}

                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-muted/50 flex items-center justify-center border border-border/50 p-1 group-hover:scale-105 transition-transform duration-500">
                                        {t.userImage ? (
                                            <img src={t.userImage} alt="" className="w-full h-full object-cover rounded-xl" />
                                        ) : (
                                            <User size={32} className="text-muted-foreground opacity-40" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-[13px] font-black text-foreground truncate uppercase tracking-tight group-hover:text-primary transition-colors">{t.username}</h4>
                                        <p className="text-[10px] text-muted-foreground truncate opacity-60 font-bold uppercase tracking-tight">{t.email}</p>
                                        {(t.position || t.company) && (
                                            <div className="mt-1.5 inline-block px-2.5 py-1 bg-primary/5 border border-primary/10 rounded-lg text-[8px] font-black text-primary uppercase tracking-tighter">
                                                {t.position} {t.company ? `@ ${t.company}` : ''}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-6 p-3 bg-muted/20 border border-border/50 rounded-2xl w-fit">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < t.rating ? "text-primary fill-primary" : "text-muted-foreground/20"}`}
                                        />
                                    ))}
                                </div>

                                <div className="relative mb-8 flex-grow">
                                    <p className="text-[13px] font-bold text-foreground/70 leading-relaxed uppercase tracking-tight italic relative z-10">
                                        "{t.comment}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-border/50 mt-auto">
                                    <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">
                                        <Clock size={12} /> {new Date(t.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex gap-2">
                                        {!t.isApproved && (
                                            <button
                                                onClick={() => handleApprove(t._id)}
                                                className="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm active:scale-90 border border-emerald-500/20"
                                                title="Approve Protocol"
                                            >
                                                <Check size={20} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(t._id)}
                                            className="p-3.5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90 border border-red-500/20"
                                            title="Purge Dossier"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center bg-card/30 border-4 border-dashed border-border/50 rounded-[4rem]">
                            <MessageSquare className="mx-auto mb-6 text-muted-foreground opacity-10" size={64} />
                            <h3 className="text-2xl font-black text-foreground/30 uppercase tracking-tighter">No Testimonials Recorded</h3>
                            <p className="text-[11px] font-black text-muted-foreground opacity-30 uppercase mt-2 tracking-widest">Initialize audit filters to refine view</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


export default TestimonialsPanel;
