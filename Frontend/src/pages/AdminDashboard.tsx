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
            <AnimatePresence>
                {(sidebarOpen || true) && (
                    <motion.aside
                        initial={{ x: -240 }}
                        animate={{ x: 0 }}
                        className={`
              fixed lg:relative z-40 h-screen w-56 bg-card/80 backdrop-blur-2xl
              border-r border-border flex flex-col
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              transition-transform duration-300
            `}
                    >
                        {/* Brand & Profile */}
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-upload')?.click()}>
                                    <div className={`
                                        w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center transition-all
                                        group-hover:border-primary/50
                                    `}>
                                        {admin?.profileImage ? (
                                            <img src={admin.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <Terminal className="w-5 h-5 text-primary" />
                                        )}

                                        {isUpdatingProfile && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <Loader2 className="w-3 h-3 text-white animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 p-0.5 bg-primary rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus size={8} className="text-primary-foreground" />
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
                                    <span className="font-bold text-xs tracking-tighter block text-foreground uppercase">
                                        Muad<span className="text-primary">.</span>Admin
                                    </span>
                                    <p className="text-muted-foreground text-[9px] font-mono truncate max-w-[100px]">
                                        {admin?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                            {navItems.map((item) => {
                                const isActive = activePanel === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => { setActivePanel(item.id as Panel); setSidebarOpen(false); }}
                                        className={`
                       w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold
                       transition-all duration-200 group
                       ${isActive
                                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/5'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                            }
                     `}
                                    >
                                        <item.icon size={16} className="shrink-0" />
                                        {item.label}
                                        {isActive && <ChevronRight size={12} className="ml-auto" />}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Logout */}
                        <div className="p-3 border-t border-border">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ─── Main Content ─────────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-h-screen overflow-auto">
                {/* Top bar */}
                <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border px-5 py-3 flex items-center justify-between transition-colors duration-300">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                            {sidebarOpen ? <X size={18} className="text-foreground" /> : <Menu size={18} className="text-foreground" />}
                        </button>
                        <div>
                            <h1 className="font-bold text-base tracking-tighter capitalize text-foreground uppercase">
                                {activePanel === 'overview' ? 'Dashboard Overview' : navItems.find(n => n.id === activePanel)?.label}
                            </h1>
                            <p className="text-muted-foreground text-[10px] font-mono opacity-80 uppercase tracking-widest">Portfolio Management System</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <a
                            href="/"
                            target="_blank"
                            className="text-[10px] text-muted-foreground hover:text-primary transition-colors font-mono font-bold flex items-center gap-1 uppercase tracking-widest"
                        >
                            View Site <ChevronRight size={10} />
                        </a>
                    </div>
                </header>

                {/* Panel */}
                <main className="flex-1 p-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePanel}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderPanel()}
                        </motion.div>
                    </AnimatePresence>
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
        <div className="space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Projects', value: counts.projects, icon: FolderKanban, color: 'text-violet-600', bg: 'bg-violet-50' },
                    { label: 'Technologies', value: counts.techs, icon: Cpu, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Messages', value: counts.messages, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Subscribers', value: counts.subscribers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Reviews', value: counts.testimonials, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-500 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 ${stat.bg} rounded-lg group-hover:scale-110 transition-transform duration-500 border border-transparent group-hover:border-primary/10`}>
                                <stat.icon size={16} className={stat.color} />
                            </div>
                            <span className="flex items-center gap-1 text-emerald-600 text-[8px] font-black bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100/50 uppercase">
                                <ArrowUpRight size={8} /> Live
                            </span>
                        </div>
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5 opacity-70">{stat.label}</p>
                        <h3 className="text-xl font-black text-foreground tracking-tighter leading-none">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* System Overview Graph */}
            <div className="bg-card border border-border rounded-2xl p-5 lg:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 shadow-sm relative overflow-hidden group">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 blur-[70px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-600/5 blur-[50px] rounded-full pointer-events-none" />

                {/* Custom Donut Chart */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        {(() => {
                            const dataFields = [
                                { label: 'Projects', value: counts.projects, color: '#7C3AED' },
                                { label: 'Techs', value: counts.techs, color: '#6366F1' },
                                { label: 'Messages', value: counts.messages, color: '#A855F7' },
                                { label: 'Subs', value: counts.subscribers, color: '#3B82F6' },
                                { label: 'Reviews', value: counts.testimonials, color: '#F59E0B' }
                            ];
                            const total = dataFields.reduce((sum, item) => sum + item.value, 0);
                            const r = 55;
                            const c = 2 * Math.PI * r;
                            let currentOffset = 0;

                            return total === 0 ? (
                                <circle cx="50%" cy="50%" r={r} stroke="var(--muted)" strokeWidth="14" fill="none" />
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
                                            strokeWidth="14"
                                            fill="none"
                                            strokeDasharray={`${dashArray} ${c}`}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-in-out origin-center"
                                        />
                                    );
                                })
                            );
                        })()}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-foreground tracking-tighter leading-none">
                            {counts.projects + counts.techs + counts.messages + counts.subscribers + counts.testimonials}
                        </span>
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mt-0.5 opacity-70">
                            Records
                        </span>
                    </div>
                </div>

                {/* Graph Data Breakdown */}
                <div className="flex-1 w-full relative z-10">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 shadow-sm">
                                <LayoutDashboard size={14} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-foreground text-sm font-black tracking-tighter uppercase leading-none">Database Pulse</h3>
                                <p className="text-[8px] text-slate-500 font-bold opacity-70 uppercase tracking-widest mt-1">Structural distribution</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {[
                            { label: 'Projects', value: counts.projects, color: 'bg-violet-600' },
                            { label: 'Arsenal', value: counts.techs, color: 'bg-indigo-600' },
                            { label: 'Signals', value: counts.messages, color: 'bg-purple-600' },
                            { label: 'Agents', value: counts.subscribers, color: 'bg-blue-600' },
                            { label: 'Opinions', value: counts.testimonials, color: 'bg-amber-500' }
                        ].map((item, idx) => {
                            const total = counts.projects + counts.techs + counts.messages + counts.subscribers + counts.testimonials;
                            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
                            return (
                                <div key={idx} className="flex flex-col gap-1 group/item">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full ${item.color} group-hover/item:scale-125 transition-transform duration-300`} />
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest opacity-80">{item.label}</span>
                                    </div>
                                    <div className="flex items-end gap-1.5">
                                        <span className="text-lg font-black text-foreground leading-none">{item.value}</span>
                                        <span className="text-[9px] font-black text-primary font-mono bg-primary/5 px-1 py-0.5 rounded-md border border-primary/10">{percent}%</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Subscriber List */}
                <div className="bg-card border border-border rounded-2xl p-5 flex flex-col shadow-sm hover:border-primary/10 transition-all duration-500 overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-sm font-black text-foreground tracking-tighter uppercase leading-none">Recent Signals</h3>
                        <button onClick={() => setActivePanel('subscribers')} className="p-1.5 bg-muted rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="space-y-3 flex-1 relative z-10">
                        <div className="grid grid-cols-2 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] pb-2 border-b border-border opacity-70">
                            <span>Uplink Identifier</span>
                            <span className="text-right">Timestamp</span>
                        </div>

                        <div className="space-y-2.5 pt-0.5">
                            {recentSubscribers.length === 0 && (
                                <p className="text-[10px] text-slate-400 text-center py-4 font-bold uppercase tracking-widest italic">Scanning...</p>
                            )}
                            {recentSubscribers.map((sub, i) => (
                                <div key={i} className="grid grid-cols-2 items-center group/row">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 text-[10px] font-black text-primary uppercase transition-all group-hover/row:bg-primary group-hover/row:text-white">
                                            {sub.email.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-black text-foreground truncate transition-colors group-hover/row:text-primary uppercase tracking-tight">{sub.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right text-[9px] text-slate-400 font-bold font-mono group-hover/row:text-foreground">
                                        {new Date(sub.subscribedAt).toISOString().split('T')[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications Card */}
                <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900/40 dark:via-background dark:to-indigo-950/20 border border-primary/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg">
                    {/* Background glow effects */}
                    <div className="absolute top-[-30%] right-[-5%] w-[250px] h-[250px] bg-primary/10 blur-[90px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md dark:bg-primary/20 border border-primary/20 px-2.5 py-1 rounded-full text-primary text-[8px] font-black inline-flex shadow-sm uppercase tracking-widest">
                                <Sparkles size={12} /> Latest Infiltration
                            </div>
                            <button onClick={() => setActivePanel('messages')} className="p-1.5 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-end gap-2 mb-0.5">
                                <h2 className="text-3xl font-black text-foreground tracking-tighter leading-none">{recentMessages.length}</h2>
                                <span className="text-[9px] text-primary font-black uppercase tracking-widest pb-0.5 opacity-80">Unread</span>
                            </div>
                            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest opacity-70">Signal interception history</p>
                        </div>

                        <div className="space-y-2.5 mb-6">
                            {recentMessages.length === 0 && (
                                <p className="text-[8px] text-primary/50 py-4 font-black uppercase tracking-widest text-center border-2 border-dashed border-primary/10 rounded-xl">Silence Confirmed</p>
                            )}
                            {recentMessages.map((msg, idx) => (
                                <div key={idx} className="flex flex-col bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-primary/10 rounded-xl p-2.5 hover:border-primary/30 transition-all cursor-pointer shadow-sm group/msg" onClick={() => setActivePanel('messages')}>
                                    <div className="flex items-start justify-between gap-2.5">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            {!msg.isRead && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />}
                                            <p className="text-[10px] font-black text-foreground truncate group-hover/msg:text-primary transition-colors uppercase tracking-tight">{msg.name}</p>
                                        </div>
                                        <span className="text-[8px] text-slate-400 font-bold font-mono shrink-0 pt-0.5 opacity-70">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-[9px] text-slate-500 font-bold truncate mt-1 opacity-80 uppercase tracking-tighter">{msg.subject}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setActivePanel('messages')}
                        className="relative z-10 w-full py-3 bg-primary text-white font-black tracking-[0.2em] text-[9px] rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 uppercase"
                    >
                        COMMAND CENTER <ArrowRight size={14} />
                    </button>
                </div>

            </div>
        </div>

    );
};

export default AdminDashboard;
