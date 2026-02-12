import { motion } from "framer-motion";
import { Cpu, Zap, Activity } from "lucide-react";

const technologies = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "shadow-[#E34F26]/20", textColor: "group-hover:text-[#E34F26]" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "shadow-[#1572B6]/20", textColor: "group-hover:text-[#1572B6]" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "shadow-[#F7DF1E]/20", textColor: "group-hover:text-[#F7DF1E]" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "shadow-[#61DAFB]/20", textColor: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "shadow-white/10", textColor: "group-hover:text-white", invert: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "shadow-[#339933]/20", textColor: "group-hover:text-[#339933]" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "shadow-white/10", textColor: "group-hover:text-white", invert: true },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "shadow-[#47A248]/20", textColor: "group-hover:text-[#47A248]" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "shadow-[#38BDF8]/20", textColor: "group-hover:text-[#38BDF8]" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "shadow-white/10", textColor: "group-hover:text-white", invert: true },
];

const TechLogos = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0c14] select-none">
      
      {/* --- BACKGROUND CUSUB (LIGHTER MESH & NODES) --- */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c14] via-[#111827] to-[#0a0c14]" />
        
        {/* Animated Orbs (Iftiin Dhaqdhaqaaq leh) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#42B6F0]/10 blur-[130px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" 
        />

        {/* Floating Particles (Dhibco yar-yar oo iftiimaya) */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ x: Math.random() * 1500, y: Math.random() * 1000 }}
              animate={{ 
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 mb-6 backdrop-blur-md">
            <Activity size={14} className="text-[#42B6F0]" />
            <span className="text-[10px] font-bold text-blue-400 tracking-[0.4em] uppercase">
              Current Stack
            </span>
          </div>

          <h3 className="text-4xl md:text-7xl font-black text-white tracking-tightest mb-6 leading-tight">
            DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42B6F0] to-blue-600">ARSENAL</span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-light">
            I build <span className="text-white italic">high-performance</span> ecosystems using 
            the most advanced <span className="text-[#42B6F0]">full-stack</span> technologies.
          </p>
        </motion.div>
      </div>

      {/* --- SEAMLESS MARQUEE --- */}
      <div className="relative flex overflow-hidden group">
        {/* Shadow Fades (Dhinacyada ka dhigaya kuwo luma) */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 z-20 bg-gradient-to-r from-[#0a0c14] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 z-20 bg-gradient-to-l from-[#0a0c14] to-transparent" />

        <motion.div
          className="flex gap-6 py-12 items-center"
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative flex flex-col items-center justify-center min-w-[150px] md:min-w-[200px]"
            >
              {/* Card - Lighter & More Glassy */}
              <div className={`relative w-32 h-32 md:w-40 md:h-40 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-500 group-hover:border-[#42B6F0]/50 group-hover:bg-white/[0.07] ${tech.color}`}>
                
                {/* Tech Icon */}
                <div className="relative mb-3 transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src={tech.icon} 
                    className={`w-10 h-10 md:w-12 md:h-12 object-contain ${tech.invert ? 'dark:invert-0 invert opacity-80' : ''}`} 
                    alt={tech.name} 
                  />
                </div>

                {/* Tech Name */}
                <span className={`text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${tech.textColor || 'text-slate-500'}`}>
                  {tech.name}
                </span>

                {/* Bottom Glow Dot */}
                <div className="absolute bottom-5 w-1 h-1 bg-white/20 rounded-full group-hover:bg-[#42B6F0] group-hover:shadow-[0_0_10px_#42B6F0] transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- BOTTOM ACCENT --- */}
      <div className="container mx-auto px-6 mt-16 flex justify-center">
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent relative">
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#42B6F0] shadow-[0_0_20px_#42B6F0]" />
        </div>
      </div>
    </section>
  );
};

export default TechLogos;