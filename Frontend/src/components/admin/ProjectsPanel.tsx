import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, ExternalLink, Github, Loader2 } from 'lucide-react';
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
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-foreground tracking-tighter uppercase">Featured Projects</h2>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-primary/10 active:scale-95"
                >
                    <Plus size={14} /> Add Project
                </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">Scanning for projects...</div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((p) => (
                        <motion.div
                            key={p._id}
                            layout
                            className="bg-card border border-border rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative h-36 overflow-hidden">
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 backdrop-blur-[2px]">
                                    {p.liveUrl && (
                                        <a href={p.liveUrl} target="_blank" className="p-2 bg-white rounded-lg text-primary hover:bg-primary hover:text-white shadow-lg transition-all">
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {p.githubUrl && (
                                        <a href={p.githubUrl} target="_blank" className="p-2 bg-white rounded-lg text-primary hover:bg-primary hover:text-white shadow-lg transition-all">
                                            <Github size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="p-3.5">
                                <h3 className="font-black text-foreground text-xs mb-1 truncate uppercase tracking-tight">{p.title}</h3>
                                <p className="text-muted-foreground text-[10px] line-clamp-2 mb-2.5 font-bold opacity-70 leading-relaxed">{p.description}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {p.techStack.slice(0, 3).map(t => (
                                        <span key={t} className="text-[8px] px-2 py-0.5 bg-secondary border border-border rounded-md text-secondary-foreground font-black uppercase tracking-tighter">{t}</span>
                                    ))}
                                    {p.techStack.length > 3 && (
                                        <span className="text-[8px] px-2 py-0.5 bg-muted border border-border rounded-md text-muted-foreground font-black">+{p.techStack.length - 3}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEdit(p)}
                                        className="flex-1 flex items-center justify-center gap-1 py-2 text-[9px] font-black text-slate-500 bg-secondary hover:bg-primary/10 hover:text-primary rounded-lg transition-all uppercase tracking-widest"
                                    >
                                        <Pencil size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="flex-1 flex items-center justify-center gap-1 py-2 text-[9px] font-black text-slate-500 bg-secondary hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all uppercase tracking-widest"
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
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
                        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-colors"
                        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.98, opacity: 0, y: 10 }}
                            className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-border">
                                <h3 className="font-black text-foreground text-base tracking-tighter uppercase">{editProject ? 'Edit Project' : 'New Project'}</h3>
                                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-muted rounded-lg transition-all">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                {/* Image upload */}
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    className="relative h-36 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-muted flex items-center justify-center group"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                                    ) : (
                                        <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
                                            <Upload size={24} className="mx-auto mb-1 opacity-50 group-hover:opacity-100" />
                                            <p className="text-[9px] font-black uppercase tracking-widest">Update Cover Identity</p>
                                        </div>
                                    )}
                                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </div>

                                {[
                                    { key: 'title', label: 'Title', placeholder: 'Project Identifier', required: true },
                                    { key: 'description', label: 'Description', placeholder: 'Scope and mission details...', required: true, textarea: true },
                                    { key: 'techStack', label: 'Tech Stack', placeholder: 'React, Node.js, MongoDB', required: true },
                                    { key: 'liveUrl', label: 'Uplink URL (Live)', placeholder: 'https://...' },
                                    { key: 'githubUrl', label: 'Local Source (GitHub)', placeholder: 'https://github.com/...' },
                                    { key: 'color', label: 'Theme Protocol', placeholder: 'violet-600' },
                                ].map(({ key, label, placeholder, required, textarea }) => (
                                    <div key={key}>
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{label}</label>
                                        {textarea ? (
                                            <textarea
                                                value={form[key as keyof typeof form]}
                                                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                                required={required}
                                                rows={3}
                                                placeholder={placeholder}
                                                className="w-full bg-muted border border-border text-foreground placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none text-[11px] font-bold"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={form[key as keyof typeof form]}
                                                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                                                required={required}
                                                placeholder={placeholder}
                                                className="w-full bg-muted border border-border text-foreground placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold"
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className="flex gap-3 pt-3">
                                    <button type="button" onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 text-[10px] font-black text-slate-500 bg-secondary rounded-xl hover:bg-muted transition-all uppercase tracking-widest">
                                        Abort
                                    </button>
                                    <button type="submit" disabled={submitting}
                                        className="flex-1 py-3 text-[10px] font-black bg-primary text-white rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95">
                                        {submitting && <Loader2 size={14} className="animate-spin" />}
                                        {editProject ? 'Update Identity' : 'Initialize Protocol'}
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
