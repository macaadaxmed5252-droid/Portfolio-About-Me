import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Terminal, Zap, MoveRight, Loader2, Globe, Cpu, Radio, Heart } from "lucide-react";
import { subscribersAPI } from "@/lib/api";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  // Update-gareynta waqtiga Mogadishu si live ah
  useEffect(() => {
    const updateTime = () => {
      const mogadishuTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Africa/Mogadishu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(mogadishuTime);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribersAPI.subscribe({ email });
      toast.success("Uplink Established: Subscribed!");
      setEmail("");
    } catch (err: any) {
      toast.error("Signal Lost: Try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-border/40 transition-colors duration-500">

      {/* --- ELITE BACKGROUND DECOR --- */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        {/* Subtle Grain Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- MAIN BENTO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-20">

          {/* 1. Brand Card (Bento Item) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 p-8 rounded-[2.5rem] bg-card dark:bg-card/30 border border-border/60 backdrop-blur-2xl flex flex-col justify-between group transition-all duration-500 hover:border-primary/30 shadow-xl shadow-black/[0.02] dark:shadow-none"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 group/logo cursor-pointer" onClick={scrollToTop}>
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl rotate-3 group-hover/logo:rotate-[12deg] transition-all duration-500 shadow-xl shadow-primary/20">
                  <Terminal className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter italic uppercase text-foreground">
                  Muad<span className="text-primary animate-pulse">.</span>
                </h2>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed tracking-[0.15em] max-w-[280px]">
                Architecting the digital frontier through <span className="text-foreground border-b border-primary/40">Full-Stack Precision</span> and high-fidelity design systems.
              </p>
            </div>

            <div className="mt-12 flex gap-3">
              {[
                { icon: Github, href: "https://github.com/macaadaxmed5252-droid" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa" },
                { icon: Twitter, href: "https://x.com/king_maalid" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-background/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300 backdrop-blur-md"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* 2. Newsletter Card (Bento Item) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 p-8 rounded-[2.5rem] bg-primary/[0.03] dark:bg-primary/5 border border-primary/10 backdrop-blur-md relative overflow-hidden group shadow-xl shadow-black/[0.01] dark:shadow-none"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
              <Radio size={60} className="text-primary animate-pulse" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-primary fill-primary/20" />
                  <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Intelligence Sync</span>
                </div>
                <h3 className="text-4xl font-black text-foreground tracking-tighter uppercase leading-[0.85]">
                  JOIN THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">UPLINK.</span>
                </h3>
              </div>

              <form onSubmit={handleSubscribe} className="mt-12 relative group/form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="SECURE_EMAIL@NETWORK.COM"
                  className="w-full bg-background dark:bg-background/80 border-2 border-border/60 text-foreground p-5 rounded-2xl focus:border-primary/60 outline-none transition-all font-black text-[10px] tracking-widest uppercase placeholder:text-muted-foreground/30 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <MoveRight size={18} />}
                </button>
              </form>
            </div>
          </motion.div>

          {/* 3. Status & CTA (Bento Items) */}
          <div className="lg:col-span-3 grid grid-rows-2 gap-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-[2.5rem] bg-card dark:bg-card/30 border border-border/60 backdrop-blur-md flex flex-col justify-center items-center text-center group shadow-xl shadow-black/[0.02] dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground">System Online</span>
              </div>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Ready for Global Missions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => window.location.href = '#projects'}
              className="p-6 rounded-[2.5rem] bg-foreground text-background flex flex-col justify-center items-center text-center group cursor-pointer overflow-hidden relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <Cpu size={24} className="animate-spin-slow group-hover:text-primary-foreground" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">Start Project</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- FOOTER BOTTOM BAR --- */}
        <div className="pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border/60 text-[9px] font-black text-muted-foreground tracking-[0.15em] uppercase shadow-sm">
              <Globe size={12} className="text-primary animate-pulse" />
              Mogadishu, SO <span className="text-primary/40">//</span> {time} EAT
            </div>
            <div className="flex items-center gap-4 text-[8px] font-bold text-muted-foreground/40 tracking-[0.4em] uppercase">
              <span>© {currentYear} MUAD AHMED</span>
              <span className="hidden sm:inline text-primary/20">•</span>
              <span className="hidden sm:flex items-center gap-1.5">
                Built with <Heart size={10} className="fill-primary text-primary animate-pulse" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex gap-8">
              {['Security', 'Privacy', 'Nodes'].map((link) => (
                <a key={link} href="#" className="text-[9px] font-black text-muted-foreground/40 hover:text-primary transition-colors uppercase tracking-[0.3em]">{link}</a>
              ))}
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 bg-card border border-border/60 py-3.5 px-7 rounded-full group hover:border-primary/40 hover:bg-background transition-all shadow-xl shadow-black/[0.03] dark:shadow-none"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Return to Orbit</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;