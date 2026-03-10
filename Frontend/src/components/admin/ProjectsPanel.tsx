import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, ExternalLink, Github, Loader2, FolderKanban, Check } from 'lucide-react';
import { projectsAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    color?: string;
    order?: number;
}

const emptyForm = {
    title: '', description: '', techStack: '', liveUrl: '',
    githubUrl: '', color: 'from-violet-500/10 to-indigo-500/10', order: '0',
};

const ProjectsPanel = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProject, setEditProject] = useState<Project | null>(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchProjects = async () => {
        try {
            const res = await projectsAPI.getAllAdmin();
            setProjects(res.data.data);
        } catch {
            toast.error('Failed to fetch projects.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const openCreate = () => {
        setEditProject(null);
        setForm({ ...emptyForm });
        setImageFile(null);
        setImagePreview('');
        setShowModal(true);
    };

    const openEdit = (p: Project) => {
        setEditProject(p);
        setForm({
            title: p.title,
            description: p.description,
            techStack: p.techStack.join(', '),
            liveUrl: p.liveUrl || '',
            githubUrl: p.githubUrl || '',
            color: p.color || emptyForm.color,
            order: String(p.order ?? 0),
        });
        setImageFile(null);
        setImagePreview(p.imageUrl);
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!editProject && !imageFile) {
            toast.error('Please upload a project image.');
            return;
        }
        setSubmitting(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (imageFile) fd.append('image', imageFile);

            if (editProject) {
                await projectsAPI.update(editProject._id, fd);
                toast.success('Project updated!');
            } else {
                await projectsAPI.create(fd);
                toast.success('Project created!');
            }
            setShowModal(false);
            fetchProjects();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to save project.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this project permanently?')) return;
        try {
            await projectsAPI.delete(id);
            toast.success('Project deleted.');
            setProjects(prev => prev.filter(p => p._id !== id));
        } catch {
            toast.error('Failed to delete project.');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-[2rem] shadow-sm">
                <div>
                    <h2 className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">Sector Portfolio</h2>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2 opacity-60">Architectural deployment log</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap"
                >
                    <Plus size={16} /> Initialize Project
                </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-32 bg-card/50 border-2 border-dashed border-border rounded-[3rem]">
                    <FolderKanban size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-xl font-black text-foreground/40 uppercase tracking-tighter">Empty Repository</h3>
                    <p className="text-[10px] font-bold text-muted-foreground opacity-40 uppercase mt-2">Initialize your first sector identity</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <motion.div
                            key={p._id}
                            layout
                            className="bg-card border border-border/50 rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 relative flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                                    <div className="flex gap-2">
                                        {p.liveUrl && (
                                            <a href={p.liveUrl} target="_blank" className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-primary transition-all shadow-lg border border-white/10">
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                        {p.githubUrl && (
                                            <a href={p.githubUrl} target="_blank" className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-primary transition-all shadow-lg border border-white/10">
                                                <Github size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="font-black text-foreground text-sm mb-2 truncate uppercase tracking-tight">{p.title}</h3>
                                <p className="text-muted-foreground text-[11px] line-clamp-3 mb-6 font-bold opacity-70 leading-relaxed uppercase tracking-tight">{p.description}</p>
                                
                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {p.techStack.map(t => (
                                        <span key={t} className="text-[9px] px-2.5 py-1 bg-secondary border border-border/50 rounded-lg text-secondary-foreground font-black uppercase tracking-tighter">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => openEdit(p)}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[10px] font-black text-muted-foreground bg-secondary hover:bg-primary/10 hover:text-primary rounded-2xl transition-all uppercase tracking-widest active:scale-[0.98]"
                                    >
                                        <Pencil size={14} /> Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[10px] font-black text-muted-foreground bg-secondary hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all uppercase tracking-widest active:scale-[0.98]"
                                    >
                                        <Trash2 size={14} /> Purge
                                    </button>
                                </div>
                            </div>
                            
                            {/* Order indicator */}
                            <div className="absolute top-4 right-4 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white text-[9px] font-black font-mono">
                                LVL {p.order ?? 0}
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-card border border-border/50 shadow-2xl rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 border-b border-border/50">
                                <div>
                                    <h3 className="font-black text-foreground text-xl tracking-tighter uppercase leading-none">
                                        {editProject ? 'Update Identity' : 'Initialize Protocol'}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-60">Project Sector Configuration</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="bg-secondary p-2.5 rounded-2xl text-muted-foreground hover:text-foreground transition-all active:scale-95">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                                {/* Image upload */}
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    className="relative h-56 border-2 border-dashed border-border/50 rounded-3xl hover:border-primary/50 transition-all cursor-pointer overflow-hidden bg-muted/30 flex items-center justify-center group"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt="preview" />
                                    ) : (
                                        <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <div className="p-4 bg-primary/10 rounded-2xl mx-auto mb-3 w-fit">
                                                <Upload size={32} className="opacity-50 group-hover:opacity-100" />
                                            </div>
                                            <p className="text-[11px] font-black uppercase tracking-widest">Update Visual DNA</p>
                                        </div>
                                    )}
                                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { key: 'title', label: 'Primary Identifier', placeholder: 'Project Name', required: true },
                                        { key: 'techStack', label: 'Tech Protocol Stack', placeholder: 'React, Tailwind, Node', required: true },
                                        { key: 'liveUrl', label: 'External Uplink (Live)', placeholder: 'https://...' },
                                        { key: 'githubUrl', label: 'Source Repository (GitHub)', placeholder: 'https://github.com/...' },
                                        { key: 'order', label: 'Sequence Priority', placeholder: '0', type: 'number' },
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
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-2 px-1 opacity-70">Mission Scope</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                                        required
                                        rows={4}
                                        placeholder="Detailed project description..."
                                        className="w-full bg-muted/30 border border-border/50 text-foreground placeholder-slate-500 px-5 py-4 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none text-xs font-black uppercase tracking-tight leading-relaxed"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-border/50">
                                    <button type="button" onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 text-[11px] font-black text-muted-foreground bg-secondary rounded-2xl hover:bg-muted transition-all uppercase tracking-[0.2em] active:scale-95">
                                        Terminate
                                    </button>
                                    <button type="submit" disabled={submitting}
                                        className="flex-1 py-4 text-[11px] font-black bg-primary text-primary-foreground rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-95">
                                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                        {editProject ? 'Finalize Record' : 'INITIALIZE PROTOCOL'}
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


export default ProjectsPanel;
