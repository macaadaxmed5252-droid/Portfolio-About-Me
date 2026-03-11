import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, User, MessageSquare, Loader2, Sparkles, Send, X, CheckCircle2, Camera, Building2, Briefcase, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsAPI } from "@/lib/api";
import { toast } from "sonner";

interface Testimonial {
    _id: string;
    username: string;
    rating: number;
    comment: string;
    position?: string;
    company?: string;
    userImage?: string;
    createdAt: string;
}

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    
    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        rating: 5,
        comment: "",
        position: "",
        company: ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Responsive items count
    const getVisibleItems = useCallback(() => {
        if (windowWidth >= 1280) return 3;
        if (windowWidth >= 768) return 2;
        return 1;
    }, [windowWidth]);

    const visibleItemsCount = getVisibleItems();

    useEffect(() => {
        fetchTestimonials();
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Carousel Navigation
    const nextSlide = useCallback(() => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevSlide = useCallback(() => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    // Autoplay logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying && testimonials.length > 0 && !showForm && !showThankYou) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length, nextSlide, showForm, showThankYou]);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (showForm || showThankYou) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showForm, showThankYou]);

    const fetchTestimonials = async () => {
        try {
            const res = await testimonialsAPI.getApproved();
            const data = res.data.data;
            setTestimonials(data);
        } catch (err) {
            console.error("Failed to fetch testimonials", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRatingChange = (rating: number) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('rating', formData.rating.toString());
        data.append('comment', formData.comment);
        data.append('position', formData.position);
        data.append('company', formData.company);
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            await testimonialsAPI.submit(data);
            setFormData({ username: "", email: "", rating: 5, comment: "", position: "", company: "" });
            setSelectedFile(null);
            setPreviewUrl(null);
            setShowForm(false);
            setShowThankYou(true);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Khalad ayaa dhacay. Fadlan mar kale isku day.");
        } finally {
            setSubmitting(false);
        }
    };

    // Helper to get circular indices for infinite look
    const getVisibleTestimonials = () => {
        if (testimonials.length === 0) return [];
        const items = [];
        for (let i = 0; i < visibleItemsCount + 2; i++) {
            const index = (currentIndex + i) % testimonials.length;
            items.push({ ...testimonials[index], uniqueKey: `${testimonials[index]._id}-${index}-${i}` });
        }
        return items;
    };

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-background selection:bg-primary/30">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-[-10%] w-[350px] h-[350px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-xl"
                    >
                        <MessageSquare size={14} className="text-primary animate-pulse fill-primary/20" />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">User Feedback</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-[0.9] uppercase">
                        What People <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent italic px-2">Say.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-sm md:text-base font-medium uppercase tracking-tight opacity-80">
                        Real stories and feedback from clients and collaborators who have experienced the digital craft.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-6 flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25 border border-primary/20 group"
                    >
                        <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Give Feedback</span>
                    </button>
                </div>

                {/* --- CAROUSEL SECTION --- */}
                <div 
                    className="relative px-4 md:px-12"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <span className="text-[10px] font-black tracking-widest text-primary uppercase animate-pulse">Syncing Testimonials...</span>
                        </div>
                    ) : testimonials.length > 0 ? (
                        <>
                            <div className="overflow-hidden py-8 -mx-4">
                                <motion.div 
                                    className="flex gap-6 px-4"
                                    animate={{ x: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    {testimonials.map((testimonial, idx) => {
                                        // This is a simplified carousel for clarity, 
                                        // showing all items with layout transition or specific window
                                        const isVisible = (idx >= currentIndex && idx < currentIndex + visibleItemsCount) || 
                                                         (currentIndex + visibleItemsCount > testimonials.length && idx < (currentIndex + visibleItemsCount) % testimonials.length);
                                        
                                        return (
                                            <AnimatePresence mode="popLayout" key={testimonial._id}>
                                                {isVisible && (
                                                    <motion.div
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                                                    >
                                                        <div className="group relative h-full bg-card/40 dark:bg-card/20 border border-border/60 p-8 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:border-primary/40 shadow-xl shadow-black/[0.02] dark:shadow-none hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] backdrop-blur-md">
                                                            <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                                                                <Quote size={40} />
                                                            </div>

                                                            <div className="flex items-center gap-4 mb-6">
                                                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                                    {testimonial.userImage ? (
                                                                        <img src={testimonial.userImage} alt={testimonial.username} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <User size={28} className="text-primary/40" />
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h4 className="font-black text-foreground uppercase tracking-tight text-sm truncate">{testimonial.username}</h4>
                                                                    <div className="flex flex-col gap-0.5">
                                                                        {testimonial.position && (
                                                                            <div className="flex items-center gap-1.5 text-[8px] font-black text-primary/60 uppercase tracking-widest truncate">
                                                                                <Briefcase size={8} /> {testimonial.position}
                                                                            </div>
                                                                        )}
                                                                        {testimonial.company && (
                                                                            <div className="flex items-center gap-1.5 text-[8px] font-black text-muted-foreground uppercase tracking-widest truncate">
                                                                                <Building2 size={8} /> {testimonial.company}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-0.5 mb-4">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        size={12}
                                                                        className={`${i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground/20"}`}
                                                                    />
                                                                ))}
                                                            </div>

                                                            <p className="text-muted-foreground text-[11px] leading-relaxed font-bold uppercase tracking-tight opacity-70 flex-grow py-2">
                                                                "{testimonial.comment}"
                                                            </p>

                                                            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                                                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[8px] font-black uppercase tracking-widest text-emerald-500">
                                                                    <CheckCircle2 size={10} /> Verified Identity
                                                                </span>
                                                                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/30">
                                                                    {new Date(testimonial.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        );
                                    })}
                                </motion.div>
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex items-center justify-center gap-6 mt-12">
                                <button 
                                    onClick={prevSlide}
                                    className="p-4 bg-card border border-border/50 rounded-2xl text-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-90 shadow-lg"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {/* Pagination Dots */}
                                <div className="flex gap-2">
                                    {testimonials.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                                idx === currentIndex 
                                                ? "w-8 bg-primary" 
                                                : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button 
                                    onClick={nextSlide}
                                    className="p-4 bg-card border border-border/50 rounded-2xl text-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-90 shadow-lg"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 opacity-40">
                            <Sparkles size={48} className="mx-auto mb-4 text-primary/20" />
                            <h3 className="text-xl font-black uppercase tracking-tighter">Null Signals</h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Historical data repository is currently empty.</p>
                        </div>
                    )}
                </div>

                {/* Testimonial Form Modal */}
                <AnimatePresence>
                    {showForm && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowForm(false)}
                                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-xl bg-card border border-border/60 rounded-[2.5rem] shadow-2xl overflow-hidden"
                            >
                                <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase italic">Leave a Testimonial</h3>
                                        <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name *</label>
                                                <input
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-background/50 border border-border/80 text-foreground px-4 py-3.5 rounded-xl focus:border-primary outline-none transition-all font-bold text-xs uppercase"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Company *</label>
                                                <input
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-background/50 border border-border/80 text-foreground px-4 py-3.5 rounded-xl focus:border-primary outline-none transition-all font-bold text-xs uppercase"
                                                    placeholder="Tech Inc."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Role / Position *</label>
                                            <input
                                                name="position"
                                                value={formData.position}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-background/50 border border-border/80 text-foreground px-4 py-3.5 rounded-xl focus:border-primary outline-none transition-all font-bold text-xs uppercase"
                                                placeholder="CEO"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 text-primary">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-background/50 border border-border/80 text-foreground px-4 py-3.5 rounded-xl focus:border-primary outline-none transition-all font-bold text-xs uppercase"
                                                placeholder="Name@example.com"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Photo (Optional)</label>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden border border-border">
                                                    {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Camera size={20} className="text-muted-foreground/40" />}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-6 py-2.5 bg-muted hover:bg-muted/80 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                >
                                                    Choose File
                                                </button>
                                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Rating *</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={20}
                                                        className={`cursor-pointer transition-all ${star <= formData.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                                                        onClick={() => handleRatingChange(star)}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Message *</label>
                                            <textarea
                                                name="comment"
                                                value={formData.comment}
                                                onChange={handleInputChange}
                                                required
                                                rows={4}
                                                className="w-full bg-background/50 border border-border/80 text-foreground px-4 py-3.5 rounded-xl focus:border-primary outline-none transition-all font-bold text-xs uppercase resize-none"
                                                placeholder="Share your experience..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                            {submitting ? "Gudbinaysaa..." : "Submit Testimonial"}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Thank You Modal */}
                <AnimatePresence>
                    {showThankYou && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowThankYou(false)}
                                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative w-full max-w-sm bg-card border border-border/60 rounded-[2.5rem] shadow-2xl p-10 text-center"
                            >
                                <button onClick={() => setShowThankYou(false)} className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                                    <X size={20} />
                                </button>
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} className="text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase italic mb-3">Thank You!</h3>
                                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                                    Your testimonial has been submitted and is pending review.
                                </p>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Testimonials;
