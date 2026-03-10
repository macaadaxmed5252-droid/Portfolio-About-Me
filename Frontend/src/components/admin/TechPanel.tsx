import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, Loader2 } from 'lucide-react';
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
                toast.success('Technology updated!');
            } else {
                await techsAPI.create(fd);
                toast.success('Technology added!');
            }
            setShowModal(false);
            fetchTechs();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to save.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Remove this technology?')) return;
        try {
            await techsAPI.delete(id);
            toast.success('Technology removed.');
            setTechs(prev => prev.filter(t => t._id !== id));
        } catch {
            toast.error('Failed to delete.');
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-foreground tracking-tighter uppercase">Digital Arsenal</h2>
                <button onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-primary/10 active:scale-95">
                    <Plus size={14} /> Add Tech
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {techs.map((tech) => (
                        <motion.div
                            key={tech._id}
                            layout
                            className="group bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2.5 hover:border-primary/20 hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                                <img src={tech.iconUrl} alt={tech.name}
                                    className={`w-7 h-7 object-contain ${tech.invert ? 'invert opacity-80' : ''}`} />
                            </div>
                            <span className="text-[10px] font-black text-foreground text-center uppercase tracking-tight truncate w-full">{tech.name}</span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEdit(tech)}
                                    className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                                    <Pencil size={12} />
                                </button>
                                <button onClick={() => handleDelete(tech._id)}
                                    className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all">
                                    <Trash2 size={12} />
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
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-colors"
                        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    >
                        <motion.div initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }}
                            className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-sm">
                            <div className="flex items-center justify-between p-5 border-b border-border">
                                <h3 className="font-black text-foreground text-base tracking-tighter uppercase">{editTech ? 'Update Arsenal' : 'New Technology'}</h3>
                                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-muted rounded-lg transition-all"><X size={18} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                {/* Icon upload */}
                                <div onClick={() => fileRef.current?.click()}
                                    className="h-28 border-2 border-dashed border-border rounded-xl hover:border-primary/50 cursor-pointer flex items-center justify-center bg-muted transition-colors overflow-hidden group">
                                    {iconPreview ? (
                                        <img src={iconPreview} className="w-12 h-12 object-contain" alt="icon preview" />
                                    ) : (
                                        <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <Upload size={20} className="mx-auto mb-1 opacity-50 group-hover:opacity-100" />
                                            <p className="text-[9px] font-black uppercase tracking-widest">Update Icon Identity</p>
                                        </div>
                                    )}
                                    <input ref={fileRef} type="file" accept="image/*" onChange={handleIconChange} className="hidden" />
                                </div>

                                {[
                                    { key: 'name', label: 'Identifier', placeholder: 'React', required: true },
                                    { key: 'color', label: 'Shadow Protocol', placeholder: 'shadow-violet-600/20' },
                                    { key: 'textColor', label: 'Hover Text Signature', placeholder: 'group-hover:text-violet-600' },
                                ].map(({ key, label, placeholder, required }) => (
                                    <div key={key}>
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{label}</label>
                                        <input type="text" value={form[key as keyof typeof form]}
                                            onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            required={required} placeholder={placeholder}
                                            className="w-full bg-muted border border-border text-foreground placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold" />
                                    </div>
                                ))}

                                <div className="flex items-center gap-3 py-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Invert Icon Protocol</label>
                                    <input type="checkbox" checked={form.invert === 'true'}
                                        onChange={(e) => setForm(f => ({ ...f, invert: String(e.target.checked) }))}
                                        className="w-4 h-4 accent-primary rounded-md" />
                                </div>

                                <div className="flex gap-3 pt-3">
                                    <button type="button" onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 text-[10px] font-black text-slate-500 bg-secondary rounded-xl hover:bg-muted transition-all uppercase tracking-widest">
                                        Abort
                                    </button>
                                    <button type="submit" disabled={submitting}
                                        className="flex-1 py-3 text-[10px] font-black bg-primary text-white rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95">
                                        {submitting && <Loader2 size={14} className="animate-spin" />}
                                        {editTech ? 'Update Record' : 'Initialize Tech'}
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
