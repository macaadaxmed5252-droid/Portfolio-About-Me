import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Heart, Terminal, Sparkles } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/macaadaxmed5252-droid", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/king_maalid", label: "Twitter" },
  ];

  return (
    <footer className="py-20 relative overflow-hidden bg-[#0a0c14] border-t border-white/5">
      
      {/* --- BACKGROUND GLOWS (LIGHTER) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-48 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-16 md:gap-6">
          
          {/* 1. Left: Brand & Identity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start space-y-6"
          >
            <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
              <div className="p-2.5 bg-blue-500/10 rounded-xl group-hover:bg-primary transition-all duration-500 shadow-lg shadow-blue-500/5">
                <Terminal className="w-6 h-6 text-primary group-hover:text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                Muad<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-[280px] text-center md:text-left leading-relaxed font-light">
              Designing and developing <span className="text-white font-medium">high-performance</span> digital ecosystems with Somali passion.
            </p>
          </motion.div>

          {/* 2. Center: Social Hub & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-[1.2rem] flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 backdrop-blur-md shadow-2xl"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
            
            <div className="px-5 py-2 rounded-full bg-white/[0.02] border border-white/5 flex items-center gap-3 text-[10px] font-bold font-mono text-slate-500 tracking-[0.3em] uppercase group transition-all hover:border-primary/20">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> in Mogadishu
            </div>
          </motion.div>

          {/* 3. Right: Back to Top Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end space-y-4"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-[1px] rounded-full bg-gradient-to-tr from-blue-500/20 via-primary/20 to-emerald-500/20 hover:from-blue-500 hover:via-primary hover:to-emerald-500 transition-all duration-700 shadow-2xl shadow-primary/10"
            >
              <div className="bg-[#0a0c14] rounded-full p-5 group-hover:bg-transparent transition-all duration-500">
                <ArrowUp className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
              </div>
            </motion.button>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] group-hover:text-primary transition-colors cursor-default">
              Back to top
            </span>
          </motion.div>

        </div>

        {/* --- BOTTOM BAR (LEGAL) --- */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black font-mono text-slate-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
             <Sparkles size={12} className="text-primary/50" />
             <p>© {currentYear} Muad Ahmed. Built from scratch.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {["Clean Code", "Modern UI", "Scalable Web"].map((item) => (
              <span key={item} className="hover:text-primary transition-colors cursor-default relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;