import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-500">
            {/* Background glows */}
            <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />
            <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-primary/5 blur-[80px] rounded-full pointer-events-none opacity-30" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.02] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative"
            >
                {/* Float animation for the main content */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative bg-card/80 backdrop-blur-2xl border border-border p-6 md:p-8 rounded-[2rem] shadow-xl shadow-black/5 transition-colors duration-500"
                >
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl border border-primary/20 mb-4 flex items-center justify-center relative group rotate-3 hover:rotate-6 transition-all duration-700 shadow-lg">
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-full" />
                            <Terminal className="w-7 h-7 text-primary relative z-10" />
                        </div>
                        <h1 className="text-2xl font-black text-foreground tracking-tighter text-center uppercase leading-none">
                            Admin <span className="text-primary transition-colors">Console</span>
                        </h1>
                        <p className="text-slate-400 dark:text-slate-500 text-[8px] mt-2 font-black tracking-[0.4em] uppercase opacity-70">
                            Enterprise Access Only
                        </p>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-[10px] font-bold backdrop-blur-sm">
                                    <AlertCircle size={14} className="shrink-0" />
                                    {error}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                                Entity Identifier
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="admin@enterprise.com"
                                    className="w-full bg-muted border border-border text-foreground placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-card transition-all text-[11px] font-bold uppercase tracking-tight"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                                Security Protocol
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-muted border border-border text-foreground placeholder-slate-400 pl-11 pr-11 py-3.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-card transition-all text-[11px] font-bold uppercase tracking-tight"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary p-1 hover:bg-primary/10 rounded-md transition-all"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-primary text-primary-foreground font-black py-3 rounded-lg mt-2 hover:shadow-lg transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-2.5 active:scale-95 shadow-md uppercase tracking-[0.2em] text-[10px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Initialize Connection</span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 flex items-center justify-between">
                        <div className="h-px bg-border flex-1" />
                        <span className="px-3 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono opacity-50">
                            System v2.2
                        </span>
                        <div className="h-px bg-border flex-1" />
                    </div>
                </motion.div>

                <p className="text-center text-slate-400 dark:text-slate-500 text-[8px] mt-6 font-black tracking-widest uppercase opacity-60">
                    &copy; {new Date().getFullYear()} MUAD AHMED INTERFACE
                </p>
            </motion.div>

        </div>
    );
};

export default AdminLogin;
