import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Heart, Terminal } from "lucide-react";

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
    <footer className="py-16 relative overflow-hidden bg-background border-t border-white/5">
      {/* 1. Background Glows */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-48 bg-primary/20 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 md:gap-6">
          
          {/* Left Side: Brand & Identity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start space-y-4"
          >
            <div className="flex items-center gap-2 group cursor-default">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors duration-500">
                <Terminal className="w-6 h-6 text-primary group-hover:text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                Muad<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-[250px] text-center md:text-left leading-relaxed font-light">
              Crafting high-performance digital solutions with passion and precision.
            </p>
          </motion.div>

          {/* Center: Social Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-xl"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-widest uppercase">
               Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> in Mogadishu
            </div>
          </motion.div>

          {/* Right Side: Navigation & Back to Top */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end space-y-4"
          >
            <button
              onClick={scrollToTop}
              className="group relative p-1 rounded-full bg-gradient-to-tr from-primary/20 to-blue-500/20 hover:from-primary hover:to-blue-500 transition-all duration-500"
            >
              <div className="bg-background rounded-full p-4 group-hover:bg-transparent transition-colors duration-500">
                <ArrowUp className="w-6 h-6 text-primary group-hover:text-black" />
              </div>
            </button>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
              Back to top
            </span>
          </motion.div>

        </div>

        {/* 2. Bottom Bar (Legal/Copyright) */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
          <p>© {currentYear} Muad Ahmed. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-default transition-colors">Clean Code</span>
            <span className="hover:text-primary cursor-default transition-colors">Modern UI</span>
            <span className="hover:text-primary cursor-default transition-colors">Scalable Web</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;