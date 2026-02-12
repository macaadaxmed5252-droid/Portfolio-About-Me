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

  // Shaqada kugu geynaysa qaybta Projects
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/macaadaxmed5252-droid", color: "hover:text-primary" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa", color: "hover:text-[#0077b5]" },
    { icon: Twitter, href: "https://x.com/king_maalid", color: "hover:text-[#1da1f2]" },
  ];

  return (
    <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] selection:bg-primary/30">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(5,5,5,1)_100%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <motion.div style={{ opacity, scale, y }} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
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
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Available for new projects</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]"
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
              className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light"
            >
              Engineering the future of digital interaction <span className="text-white font-medium">I specialize </span>  
              in architecting scalable <span className="text-white font-medium">Backends</span> and crafting immersive <span className="text-white font-medium">frontends</span> to deliver world-class user experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-5 items-center"
            >
              {/* Badankan hadda wuxuu ku geynayaa Projects */}
              <Button 
                onClick={scrollToProjects}
                size="lg" 
                className="rounded-full bg-primary hover:bg-primary/90 text-black font-bold px-10 py-7 text-lg shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 active:scale-95"
              >
                Start a Project
              </Button>
              
              <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={`text-gray-400 transition-all duration-300 ${link.color} hover:scale-125`}>
                    <link.icon size={22} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile Visual Section */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-72 h-72 md:w-[450px] md:h-[450px]"
            >
              {/* Animated Rings */}
              <div className="absolute inset-0 border border-primary/20 rounded-[3rem] rotate-12 animate-spin-slow" />
              <div className="absolute inset-0 border border-blue-500/20 rounded-[3rem] -rotate-12 animate-spin-slow-reverse" />
              
              {/* Main Image Container */}
              <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl group">
                <img 
                  src="/myImage.png" 
                  alt="Muad" 
                  className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100" 
                  // Halkan grayscale-kii waa laga saaray si midabku u muuqdo
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Tech Badges */}
              <TechBadge icon={Code} label="Frontend" position="top-0 -right-4" delay={0.2} />
              <TechBadge icon={Database} label="Backend" position="bottom-10 -left-8" delay={0.4} />
              <TechBadge icon={Globe} label="FullStack" position="top-1/2 -right-12" delay={0.6} />
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div 
        onClick={scrollToProjects}
        animate={{ y: [0, 12, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 cursor-pointer hover:text-primary transition-colors"
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
    className={`absolute ${position} z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-xl hover:border-primary/50 transition-colors cursor-default`}
  >
    <Icon size={16} className="text-primary" />
    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-tighter">{label}</span>
  </motion.div>
);

export default Hero;