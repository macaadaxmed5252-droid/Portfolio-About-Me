import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Code, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/macaadaxmed5252-droid", color: "hover:text-primary" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa", color: "hover:text-[#0077b5]" },
    { icon: Twitter, href: "https://x.com/king_maalid", color: "hover:text-[#1da1f2]" },
  ];

  return (
    <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020308] py-20 lg:py-0 selection:bg-primary/30">
      
      {/* --- BACKGROUND DYNAMIC UPGRADE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Animated Gradient Orbs (Layrarka casriga ah) */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/20 blur-[130px] rounded-full" 
        />
        
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" 
        />

        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" 
        />

        {/* 2. Sophisticated Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 20%, transparent 100%)'
          }}
        />

        {/* 3. Noise Texture (Si uu u yeesho dareen dhab ah) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div style={{ opacity, scale, y }} className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* PROFILE SECTION - Order-1 on Mobile */}
          <div className="relative order-1 lg:order-2 flex justify-center mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-64 h-64 md:w-[400px] md:h-[400px]"
            >
              <div className="absolute inset-0 border border-primary/40 rounded-[2.5rem] lg:rounded-[3rem] rotate-12" />
              <div className="absolute inset-0 border border-blue-500/40 rounded-[2.5rem] lg:rounded-[3rem] -rotate-12" />
              
              <div className="absolute inset-3 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl group">
                <img 
                  src="/myImage.png" 
                  alt="Muad" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <TechBadge icon={Code} label="Frontend" position="-top-2 -right-2 lg:top-0 lg:-right-4" delay={0.2} />
              <TechBadge icon={Database} label="Backend" position="bottom-5 -left-5 lg:bottom-10 lg:-left-8" delay={0.4} />
              <TechBadge icon={Globe} label="FullStack" position="top-1/2 -right-8 lg:-right-12" delay={0.6} />
            </motion.div>
          </div>

          {/* TEXT CONTENT - Order-2 on Mobile */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-white/80 text-[10px] lg:text-xs font-mono tracking-widest uppercase">Available for new projects</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1] lg:leading-[0.9]"
            >
              HAY, I'M <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500">
                MUAD AHMED
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-base md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
            >
              Engineering the future of digital interaction. <span className="text-white font-medium">I specialize</span> in architecting scalable <span className="text-white font-medium">Backends</span> and crafting immersive <span className="text-white font-medium">frontends</span>.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Button 
                onClick={scrollToProjects}
                size="lg" 
                className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-black font-bold px-10 py-7 text-lg shadow-[0_0_30px_rgba(0,243,255,0.3)]"
              >
                Start a Project
              </Button>
              
              <div className="flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={`text-gray-400 transition-all duration-300 ${link.color} hover:scale-125`}>
                    <link.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        onClick={scrollToProjects}
        animate={{ y: [0, 12, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 cursor-pointer hover:text-primary transition-colors z-20"
      >
        <ArrowDown size={30} />
      </motion.div>
    </section>
  );
};

const TechBadge = ({ icon: Icon, label, position, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute ${position} z-20 flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-xl hover:border-primary/50 transition-colors cursor-default whitespace-nowrap`}
  >
    <Icon size={14} className="text-primary lg:size-[16px]" />
    <span className="text-[8px] lg:text-[10px] font-mono font-bold text-white uppercase tracking-tighter">{label}</span>
  </motion.div>
);

export default Hero;