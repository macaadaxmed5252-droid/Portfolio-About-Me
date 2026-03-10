import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, Loader2, Check } from 'lucide-react';
import { techsAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Tech {
    _id: string;
    name: string;
    iconUrl: string;
    color?: string;
    textColor?: string;
    invert?: boolean;
    order?: number;
}

const emptyForm = {
    name: '', color: 'shadow-white/10',
    textColor: 'group-hover:text-white', invert: 'false', order: '0',
};

const TechPanel = () => {
    const [techs, setTechs] = useState<Tech[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editTech, setEditTech] = useState<Tech | null>(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchTechs = async () => {
        try {
            const res = await techsAPI.getAll();
            setTechs(res.data.data);
        } catch {
            toast.error('Failed to load technologies.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTechs(); }, []);

    const openCreate = () => {
        setEditTech(null);
        setForm({ ...emptyForm });
        setIconFile(null);
        setIconPreview('');
        setShowModal(true);
    };

    const openEdit = (t: Tech) => {
        setEditTech(t);
        setForm({
            name: t.name,
            color: t.color || emptyForm.color,
            textColor: t.textColor || emptyForm.textColor,
            invert: String(t.invert ?? false),
            order: String(t.order ?? 0),
        });
        setIconFile(null);
        setIconPreview(t.iconUrl);
        setShowModal(true);
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIconFile(file);
        setIconPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!editTech && !iconFile) {
            toast.error('Please upload a tech icon.');
            return;
        }
        setSubmitting(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (iconFile) fd.append('icon', iconFile);

            if (editTech) {
                await techsAPI.update(editTech._id, fd);
                toast.success('Record updated!');
            } else {
                await techsAPI.create(fd);
                toast.success('Entity initialized!');
            }
            setShowModal(false);
            fetchTechs();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Update failed.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this tech entity?')) return;
        try {
            await techsAPI.delete(id);
            toast.success('Entity purged.');
            setTechs(prev => prev.filter(t => t._id !== id));
        } catch {
            toast.error('Purge failed.');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-[2rem] shadow-sm">
                <div>
                    <h2 className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">Digital Arsenal</h2>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2 opacity-60">System core competencies</p>
                </div>
                <button 
                    onClick={openCreate}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap"
                >
                    <Plus size={16} /> Integrate Tech
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {techs.sort((a,b) => (a.order || 0) - (b.order || 0)).map((tech) => (
                        <motion.div
                            key={tech._id}
                            layout
                            className="group bg-card border border-border/50 rounded-3xl p-5 flex flex-col items-center gap-4 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-border/50 group-hover:bg-primary/5">
                                    <img src={tech.iconUrl} alt={tech.name}
                                        className={`w-9 h-9 object-contain transition-all duration-500 ${tech.invert ? 'invert opacity-80' : ''}`} />
                                </div>
                                {/* Rank badge */}
                                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary text-white text-[8px] font-black rounded-lg flex items-center justify-center shadow-lg border-2 border-card uppercase">
                                    {tech.order ?? 0}
                                </div>
                            </div>

                            <span className="text-[11px] font-black text-foreground text-center uppercase tracking-tight truncate w-full group-hover:text-primary transition-colors">
                                {tech.name}
                            </span>

                            <div className="flex gap-2.5">
                                <button onClick={() => openEdit(tech)}
                                    className="p-2 rounded-xl text-muted-foreground hover:text-primary bg-secondary hover:bg-primary/10 transition-all active:scale-90">
                                    <Pencil size={14} />
                                </button>
                                <button onClick={() => handleDelete(tech._id)}
                                    className="p-2 rounded-xl text-muted-foreground hover:text-red-500 bg-secondary hover:bg-red-500/10 transition-all active:scale-90">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] flex items-center justify-center p-4 transition-colors"
                        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card border border-border/50 shadow-2xl rounded-[2.5rem] w-full max-w-sm overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 border-b border-border/50">
                                <div>
                                    <h3 className="font-black text-foreground text-xl tracking-tighter uppercase leading-none">
                                        {editTech ? 'Update Record' : 'New Entity'}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-60">Competency Specification</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="bg-secondary p-2.5 rounded-2xl text-muted-foreground hover:text-foreground transition-all active:scale-95">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                {/* Icon upload */}
                                <div onClick={() => fileRef.current?.click()}
                                    className="h-32 border-2 border-dashed border-border/50 rounded-[2rem] hover:border-primary/50 cursor-pointer flex items-center justify-center bg-muted/30 transition-all overflow-hidden group mb-2"
                                >
                                    {iconPreview ? (
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                            <img src={iconPreview} className="w-14 h-14 object-contain" alt="preview" />
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <div className="p-4 bg-primary/10 rounded-2xl mx-auto mb-2 w-fit">
                                                <Upload size={24} className="opacity-50 group-hover:opacity-100" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest">Update Signature</p>
                                        </div>
                                    )}
                                    <input ref={fileRef} type="file" accept="image/*" onChange={handleIconChange} className="hidden" />
                                </div>

                                {[
                                    { key: 'name', label: 'Primary Alias', placeholder: 'React', required: true },
                                    { key: 'order', label: 'Priority Rank', placeholder: '0', type: 'number' },
                                ].map(({ key, label, placeholder, required, type }) => (
                                    <div key={key}>
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-2 px-1 opacity-70">{label}</label>
                                        <input 
                                            type={type || 'text'} 
                                            value={form[key as keyof typeof form]}
                                            onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            required={required} 
                                            placeholder={placeholder}
                                            className="w-full bg-muted/30 border border-border/50 text-foreground placeholder-slate-500 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-xs font-black uppercase tracking-tight" 
                                        />
                                    </div>
                                ))}

                                <div className="flex items-center justify-between bg-muted/30 border border-border/50 rounded-2xl px-5 py-3">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-70">Invert Protocol</label>
                                    <input type="checkbox" checked={form.invert === 'true'}
                                        onChange={(e) => setForm(f => ({ ...f, invert: String(e.target.checked) }))}
                                        className="w-5 h-5 accent-primary rounded-lg" />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-border/50">
                                    <button type="button" onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 text-[11px] font-black text-muted-foreground bg-secondary rounded-2xl hover:bg-muted transition-all uppercase tracking-[0.2em] active:scale-95">
                                        Abort
                                    </button>
                                    <button type="submit" disabled={submitting}
                                        className="flex-1 py-4 text-[11px] font-black bg-primary text-primary-foreground rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95">
                                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                        {editTech ? 'Finalize' : 'Integrate'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default TechPanel;
