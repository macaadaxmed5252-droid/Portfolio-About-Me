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
            toast.success("Testimonial approved!");
            setTestimonials(prev => prev.map(t => t._id === id ? { ...t, isApproved: true } : t));
        } catch (err) {
            toast.error("Approval failed.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            await testimonialsAPI.delete(id);
            toast.success("Testimonial deleted.");
            setTestimonials(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            toast.error("Deletion failed.");
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
            <div className="flex h-[40vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-70">Total Reviews</p>
                    <h3 className="text-2xl font-black text-foreground tracking-tighter leading-none">{testimonials.length}</h3>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 opacity-70">Approved</p>
                    <h3 className="text-2xl font-black text-foreground tracking-tighter leading-none">{testimonials.filter(t => t.isApproved).length}</h3>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 opacity-70">Pending Action</p>
                    <h3 className="text-2xl font-black text-foreground tracking-tighter leading-none">{testimonials.filter(t => !t.isApproved).length}</h3>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card border border-border p-4 rounded-2xl shadow-sm">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-border pl-10 pr-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tight focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {(['all', 'pending', 'approved'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                                px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                                ${filter === f
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-muted text-muted-foreground hover:bg-secondary'
                                }
                            `}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTestimonials.length > 0 ? (
                        filteredTestimonials.map((t) => (
                            <motion.div
                                key={t._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:border-primary/20 transition-all flex flex-col group relative"
                            >
                                {/* Status Indicator */}
                                {!t.isApproved && (
                                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                                        <AlertCircle size={10} /> Pending
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 p-0.5">
                                        {t.userImage ? (
                                            <img src={t.userImage} alt="" className="w-full h-full object-cover rounded-xl" />
                                        ) : (
                                            <User size={24} className="text-primary" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-black text-foreground truncate uppercase tracking-tight">{t.username}</h4>
                                        <p className="text-[9px] text-muted-foreground truncate opacity-60 font-bold">{t.email}</p>
                                        {(t.position || t.company) && (
                                            <p className="text-[9px] text-primary truncate font-black uppercase tracking-tighter mt-0.5">
                                                {t.position} {t.company ? `@ ${t.company}` : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={`${i < t.rating ? "text-primary fill-primary" : "text-muted-foreground/20"}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-[11px] font-bold text-muted-foreground/80 leading-relaxed uppercase tracking-tight italic mb-6 flex-grow">
                                    "{t.comment}"
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                    <div className="flex items-center gap-2 text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">
                                        <Clock size={10} /> {new Date(t.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex gap-2">
                                        {!t.isApproved && (
                                            <button
                                                onClick={() => handleApprove(t._id)}
                                                className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                                title="Approve"
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(t._id)}
                                            className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-card/50 border-2 border-dashed border-border rounded-[3rem]">
                            <MessageSquare className="mx-auto mb-4 text-muted-foreground opacity-20" size={48} />
                            <h3 className="text-xl font-black text-foreground/40 uppercase tracking-tighter">No Testimonials Found</h3>
                            <p className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase mt-2">Try adjusting your filters or search term.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TestimonialsPanel;
