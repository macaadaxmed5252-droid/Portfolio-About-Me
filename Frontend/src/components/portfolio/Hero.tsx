import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Code, Database, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 30]);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/macaadaxmed5252-droid" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa" },
    { icon: Twitter, href: "https://x.com/king_maalid" },
  ];

  return (
    <section id="home" ref={targetRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background pt-32 pb-20 md:py-20 selection:bg-primary/30">

      {/* --- ADVANCED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Glow Orbs - Color shift for Light/Dark */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[5%] w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 blur-[120px] rounded-full opacity-60 dark:opacity-40"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[0%] -right-[5%] w-[450px] h-[450px] bg-blue-400/20 dark:bg-cyan-500/10 blur-[120px] rounded-full opacity-50 dark:opacity-30"
        />

        {/* Dynamic Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)'
          }}
        />
      </div>

      <motion.div style={{ opacity, scale, y }} className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* TEXT CONTENT - Left Side (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md shadow-sm"
            >
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Ready for Deployment</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.85] uppercase"
              >
                HELLO, I'M <br />
                <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  MUAD AHMED
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Building high-performance <span className="text-foreground font-bold border-b-2 border-primary/30">MERN ecosystems</span> with a focus on scalable infrastructure and pixel-perfect user experiences.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Button
                onClick={scrollToProjects}
                className="w-full sm:w-auto h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black px-10 py-6 text-xs shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] transition-all hover:scale-105 active:scale-95 uppercase tracking-[0.2em]"
              >
                View My Work
              </Button>

              <div className="flex items-center gap-8 px-8 py-4 rounded-2xl border border-border bg-card/30 backdrop-blur-xl shadow-inner">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-110">
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* PROFILE SECTION - Right Side (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="relative w-64 h-64 md:w-[380px] md:h-[380px]"
            >
              {/* Outer Decorative Rings */}
              <div className="absolute inset-[-15px] border border-primary/10 rounded-[3rem] rotate-12 transition-all group-hover:rotate-0 duration-1000" />
              <div className="absolute inset-[-15px] border-2 border-primary/20 rounded-[3rem] -rotate-6 transition-all group-hover:rotate-0 duration-1000" />

              {/* Image Frame */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl group">
                <img
                  src="/myImage.png"
                  alt="Muad"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Interactive Floating Tech Badges */}
              <TechBadge icon={Code} label="Frontend" position="-top-4 -right-4" delay={0.6} />
              <TechBadge icon={Database} label="Backend" position="bottom-12 -left-8" delay={0.8} />
              <TechBadge icon={Globe} label="Fullstack" position="top-1/2 -right-12" delay={1.0} />
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        onClick={scrollToProjects}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/40 cursor-pointer hover:text-primary transition-colors z-20"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-primary to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

const TechBadge = ({ icon: Icon, label, position, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    className={`absolute ${position} z-20 flex items-center gap-3 px-5 py-3 rounded-2xl bg-background/60 backdrop-blur-xl border border-border shadow-xl hover:border-primary/50 transition-all group cursor-default`}
  >
    <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      <Icon size={16} />
    </div>
    <span className="text-[11px] font-black text-foreground/80 uppercase tracking-widest leading-none">{label}</span>
  </motion.div>
);

export default Hero;