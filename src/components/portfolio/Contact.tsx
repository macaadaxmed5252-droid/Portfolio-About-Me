import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Me",
    value: "macaadaxmed5252@gmail.com",
    href: "mailto:macaadaxmed5252@gmail.com",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    icon: Phone,
    label: "Call Me",
    value: "+252 614395252",
    href: "tel:+252614395252",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mogadishu, Somalia",
    href: "#",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/macaadaxmed5252-droid", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/king_maalid", label: "Twitter" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#0a0c14]">
      
      {/* --- BACKGROUND DYNAMIC EFFECTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c14] via-[#111827] to-[#0a0c14]" />
        
        {/* Animated Mesh Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase">
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-tight">
            LET'S BUILD THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400">
              FUTURE TOGETHER
            </span>
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
          
          {/* 1. Contact Info (Left) */}
          <div className="lg:col-span-3 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg ${info.color}`}>
                    <info.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">{info.value}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </motion.a>
            ))}

            {/* Social Connect Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-6 p-8 bg-primary/[0.02] rounded-[2.5rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <span className="font-bold text-slate-400 text-lg">Digital Footprint:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-1 border border-white/5"
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 2. CTA Card (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
            <div className="relative h-full bg-[#111827]/50 backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] flex flex-col items-center text-center justify-center overflow-hidden">
              
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/40 blur-[50px] rounded-full animate-pulse" />
                <div className="relative w-28 h-28 bg-primary rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500">
                  <Send className="w-12 h-12 text-black" />
                </div>
              </div>

              <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
                HAVE A VISION?<br />LET'S TALK!
              </h3>
              <p className="text-slate-400 mb-12 text-base leading-relaxed font-light">
                Haddii aad rabto inaad i weydiiso su'aal ama aad rabto inaan wada shaqeyno, ha ka waaban inaad farriin ii soo dirto.
              </p>

              <Button
                asChild
                className="w-full bg-white text-black hover:bg-primary hover:text-black font-black py-8 rounded-2xl text-lg transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <a href="mailto:macaadaxmed5252@gmail.com" className="flex items-center justify-center gap-3">
                  Send Message
                  <ArrowRight size={20} />
                </a>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;