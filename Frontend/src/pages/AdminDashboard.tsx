import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, FolderKanban, Cpu, MessageSquare,
    Mail, LogOut, Menu, X, Terminal, ChevronRight,
    Plus, Trash2, Eye, Check, Users, Bell, ArrowUpRight, Loader2, ArrowRight, Sparkles, Star
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectsPanel from '@/components/admin/ProjectsPanel';
import TechPanel from '@/components/admin/TechPanel';
import MessagesPanel from '@/components/admin/MessagesPanel';
import SubscribersPanel from '@/components/admin/SubscribersPanel';
import TestimonialsPanel from '@/components/admin/TestimonialsPanel';
import { projectsAPI, techsAPI, messagesAPI, subscribersAPI, authAPI, testimonialsAPI } from '@/lib/api';
import ThemeToggle from '@/components/ui/ThemeToggle';

type Panel = 'overview' | 'projects' | 'techs' | 'messages' | 'subscribers' | 'testimonials';

const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'techs', label: 'Digital Arsenal', icon: Cpu },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'testimonials', label: 'Reviews', icon: Star },
] as const;

const AdminDashboard = () => {
    const [activePanel, setActivePanel] = useState<Panel>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setIsUpdatingProfile(true);
        try {
            const res = await authAPI.updateProfile(formData);
            if (res.data.success) {
                // Updating admin state is tricky since it's in context. 
                // However, most of the time you can just refresh the page or update the context if implemented.
                // For simplicity here, let's assume we can notify the user to refresh or use local storage if we want it instant.
                // Better yet, since it's a small app, we can just trigger a reload or wait for next Auth check.
                window.location.reload();
            }
        } catch (err) {
            console.error('Failed to update profile image', err);
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const renderPanel = () => {
        switch (activePanel) {
            case 'projects': return <ProjectsPanel />;
            case 'techs': return <TechPanel />;
            case 'messages': return <MessagesPanel />;
            case 'subscribers': return <SubscribersPanel />;
            case 'testimonials': return <TestimonialsPanel />;
            default: return <OverviewPanel setActivePanel={setActivePanel} />;
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">

            {/* ─── Sidebar ─────────────────────────────────────────────────────── */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-card/80 backdrop-blur-2xl border-r border-border flex flex-col
                    transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
                `}
            >
                {/* Brand & Profile */}
                <div className="p-6 border-b border-border/50">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-upload')?.click()}>
                            <div className={`
                                w-12 h-12 rounded-xl overflow-hidden border border-border/50 bg-muted flex items-center justify-center transition-all
                                group-hover:border-primary/50 shadow-sm
                            `}>
                                {admin?.profileImage ? (
                                    <img src={admin.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Terminal className="w-6 h-6 text-primary" />
                                )}

                                {isUpdatingProfile && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 p-1 bg-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <Plus size={10} className="text-primary-foreground" />
                            </div>
                            <input
                                type="file"
                                id="profile-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                            />
                        </div>
                        <div className="min-w-0">
                            <span className="font-black text-sm tracking-tighter block text-foreground uppercase">
                                Muad<span className="text-primary">.</span>Admin
                            </span>
                            <p className="text-muted-foreground text-[10px] font-mono truncate max-w-[120px] opacity-70">
                                {admin?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = activePanel === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActivePanel(item.id as Panel); setSidebarOpen(false); }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black
                                    transition-all duration-300 group uppercase tracking-widest
                                    ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                    }
                                `}
                            >
                                <item.icon size={18} className={`${isActive ? 'text-primary-foreground' : 'text-primary/60 group-hover:text-primary'} transition-colors`} />
                                {item.label}
                                {isActive && <motion.div layoutId="activeNav" className="ml-auto"><ChevronRight size={14} /></motion.div>}
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-border/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ─── Main Content ─────────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 lg:px-8 py-4 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2.5 rounded-xl bg-secondary hover:bg-muted text-foreground transition-all active:scale-95 border border-border/50"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <h1 className="font-black text-lg tracking-tighter capitalize text-foreground uppercase">
                                    {activePanel === 'overview' ? 'Dashboard' : navItems.find(n => n.id === activePanel)?.label}
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-[9px] font-mono opacity-60 uppercase tracking-[0.3em] font-bold">Admin Protocol v2.0</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4 pr-4 border-r border-border/50">
                            <a
                                href="/"
                                target="_blank"
                                className="group text-[10px] text-muted-foreground hover:text-primary transition-all font-black flex items-center gap-2 uppercase tracking-widest"
                            >
                                <span className="px-2 py-1 bg-secondary rounded-md group-hover:bg-primary/10 transition-colors">Live View</span>
                                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                {/* Panel */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 bg-muted/30">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePanel}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            >
                                {renderPanel()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

// ─── Overview Panel ────────────────────────────────────────────────────────────
const OverviewPanel = ({ setActivePanel }: { setActivePanel: (p: Panel) => void }) => {
    const [counts, setCounts] = useState({ projects: 0, techs: 0, messages: 0, subscribers: 0, testimonials: 0 });
    const [recentSubscribers, setRecentSubscribers] = useState<any[]>([]);
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [projRes, techRes, msgRes, subRes, testimonialRes] = await Promise.all([
                    projectsAPI.getAllAdmin().catch(() => projectsAPI.getAll()),
                    techsAPI.getAll(),
                    messagesAPI.getAll(),
                    subscribersAPI.getAll(),
                    testimonialsAPI.getAllAdmin()
                ]);

                const msgs = msgRes.data.data || [];
                const subs = subRes.data.data || [];

                setCounts({
                    projects: projRes.data.data?.length || 0,
                    techs: techRes.data.data?.length || 0,
                    messages: msgs.length,
                    subscribers: subs.length,
                    testimonials: testimonialRes.data.data?.length || 0,
                });

                setRecentSubscribers(subs.slice(0, 5));
                setRecentMessages(msgs.slice(0, 4));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Projects', value: counts.projects, icon: FolderKanban, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                    { label: 'Arsenal', value: counts.techs, icon: Cpu, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    { label: 'Signals', value: counts.messages, icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Agents', value: counts.subscribers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Reviews', value: counts.testimonials, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border/50 rounded-2xl p-5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={`p-2.5 ${stat.bg} rounded-xl group-hover:scale-110 transition-transform duration-500 border border-border/10`}>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                            <span className="flex items-center gap-1 text-emerald-500 text-[9px] font-black bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-tighter">
                                <ArrowUpRight size={10} /> Live
                            </span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
                            <h3 className="text-2xl font-black text-foreground tracking-tighter leading-none">{stat.value}</h3>
                        </div>
                        
                        {/* Decorative background element for each card */}
                        <div className={`absolute -right-4 -bottom-4 w-16 h-16 ${stat.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    </motion.div>
                ))}
            </div>

            {/* System Overview Graph */}
            <div className="bg-card border border-border/50 rounded-[2rem] p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 shadow-sm relative overflow-hidden group">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

                {/* Custom Donut Chart */}
                <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        {(() => {
                            const dataFields = [
                                { label: 'Projects', value: counts.projects, color: '#8b5cf6' },
                                { label: 'Techs', value: counts.techs, color: '#6366f1' },
                                { label: 'Messages', value: counts.messages, color: '#a855f7' },
                                { label: 'Subs', value: counts.subscribers, color: '#3b82f6' },
                                { label: 'Reviews', value: counts.testimonials, color: '#f59e0b' }
                            ];
                            const total = dataFields.reduce((sum, item) => sum + item.value, 0);
                            const r = 70;
                            const c = 2 * Math.PI * r;
                            let currentOffset = 0;

                            return total === 0 ? (
                                <circle cx="50%" cy="50%" r={r} stroke="currentColor" className="text-muted/20" strokeWidth="18" fill="none" />
                            ) : (
                                dataFields.map((item, i) => {
                                    if (item.value === 0) return null;
                                    const dashArray = (item.value / total) * c;
                                    const offset = -currentOffset;
                                    currentOffset += dashArray;
                                    return (
                                        <circle
                                            key={i}
                                            cx="50%"
                                            cy="50%"
                                            r={r}
                                            stroke={item.color}
                                            strokeWidth="18"
                                            fill="none"
                                            strokeDasharray={`${dashArray} ${c}`}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-in-out origin-center hover:stroke-[22px] cursor-pointer"
                                        />
                                    );
                                })
                            );
                        })()}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-4xl font-black text-foreground tracking-tighter leading-none">
                            {counts.projects + counts.techs + counts.messages + counts.subscribers + counts.testimonials}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-1 opacity-60">
                            Total Units
                        </span>
                    </div>
                </div>

                {/* Graph Data Breakdown */}
                <div className="flex-1 w-full relative z-10">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
                                <LayoutDashboard size={20} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-foreground text-lg font-black tracking-tighter uppercase leading-none">Infrastructure Pulse</h3>
                                <p className="text-[10px] text-muted-foreground font-bold opacity-60 uppercase tracking-[0.2em] mt-1.5">Database sector distribution</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-6">
                        {[
                            { label: 'Projects', value: counts.projects, color: 'bg-violet-500' },
                            { label: 'Tech Arsenal', value: counts.techs, color: 'bg-indigo-500' },
                            { label: 'Inbound Signals', value: counts.messages, color: 'bg-purple-500' },
                            { label: 'Field Agents', value: counts.subscribers, color: 'bg-blue-500' },
                            { label: 'Public Opinions', value: counts.testimonials, color: 'bg-amber-500' }
                        ].map((item, idx) => {
                            const total = counts.projects + counts.techs + counts.messages + counts.subscribers + counts.testimonials;
                            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
                            return (
                                <div key={idx} className="flex flex-col gap-2 group/item">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2.5 h-2.5 rounded-full ${item.color} group-hover/item:scale-125 transition-transform duration-300 shadow-sm`} />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-80">{item.label}</span>
                                    </div>
                                    <div className="flex items-end gap-2.5">
                                        <span className="text-2xl font-black text-foreground leading-none tracking-tighter">{item.value}</span>
                                        <span className="text-[10px] font-black text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">{percent}%</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Subscriber List */}
                <div className="bg-card border border-border/50 rounded-3xl p-6 flex flex-col shadow-sm hover:border-primary/20 transition-all duration-500 overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center gap-2">
                            <Users size={18} className="text-primary" />
                            <h3 className="text-base font-black text-foreground tracking-tighter uppercase leading-none">Recent Infiltrations</h3>
                        </div>
                        <button onClick={() => setActivePanel('subscribers')} className="p-2 bg-secondary rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all active:scale-95">
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="space-y-4 flex-1 relative z-10">
                        <div className="grid grid-cols-2 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pb-3 border-b border-border/50 opacity-60">
                            <span>Signal Identifier</span>
                            <span className="text-right">Timestamp</span>
                        </div>

                        <div className="space-y-3 pt-1">
                            {recentSubscribers.length === 0 && (
                                <p className="text-[11px] text-muted-foreground text-center py-8 font-bold uppercase tracking-widest italic opacity-40">Scanning for signals...</p>
                            )}
                            {recentSubscribers.map((sub, i) => (
                                <div key={i} className="grid grid-cols-2 items-center group/row p-2 rounded-xl hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-xs font-black text-primary uppercase transition-all group-hover/row:bg-primary group-hover/row:text-white shadow-sm">
                                            {sub.email.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-black text-foreground truncate group-hover/row:text-primary transition-colors uppercase tracking-tight">{sub.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right text-[10px] text-muted-foreground font-bold font-mono group-hover/row:text-foreground">
                                        {new Date(sub.subscribedAt).toISOString().split('T')[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications Card */}
                <div className="bg-gradient-to-br from-primary/5 via-card to-indigo-500/5 dark:from-primary/10 dark:via-card dark:to-indigo-500/10 border border-border/50 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-xl">
                    {/* Background glow effects */}
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md dark:bg-primary/20 border border-primary/20 px-3 py-1.5 rounded-full text-primary text-[10px] font-black inline-flex shadow-sm uppercase tracking-widest">
                                <Sparkles size={14} className="animate-spin-slow" /> Signal Intelligence
                            </div>
                            <button onClick={() => setActivePanel('messages')} className="p-2 text-primary/40 hover:text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95">
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-end gap-3 mb-1">
                                <h2 className="text-5xl font-black text-foreground tracking-tighter leading-none">{recentMessages.length}</h2>
                                <span className="text-[12px] text-primary font-black uppercase tracking-widest pb-1 opacity-80">Unread</span>
                            </div>
                            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest opacity-60">Signal interception buffer</p>
                        </div>

                        <div className="space-y-3.5 mb-8">
                            {recentMessages.length === 0 && (
                                <p className="text-[10px] text-primary/40 py-6 font-black uppercase tracking-widest text-center border-2 border-dashed border-primary/20 rounded-2xl">Buffer Clear</p>
                            )}
                            {recentMessages.map((msg, idx) => (
                                <div key={idx} className="flex flex-col bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-primary/10 rounded-2xl p-4 hover:border-primary/40 transition-all cursor-pointer shadow-sm group/msg hover:-translate-y-1" onClick={() => setActivePanel('messages')}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {!msg.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]" />}
                                            <p className="text-xs font-black text-foreground truncate group-hover/msg:text-primary transition-colors uppercase tracking-tight">{msg.name}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-black font-mono shrink-0 pt-0.5 opacity-60">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground font-bold truncate mt-2 opacity-80 uppercase tracking-tight leading-none">{msg.subject}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setActivePanel('messages')}
                        className="relative z-10 w-full py-4 bg-primary text-primary-foreground font-black tracking-[0.3em] text-[10px] rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 active:scale-[0.98] uppercase group"
                    >
                        INITIATE COMMAND <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </div>


    );
};

export default AdminDashboard;
