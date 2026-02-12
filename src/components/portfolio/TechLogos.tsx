import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Shield, Rocket } from "lucide-react";

// Waxaan ku daray icons tayo leh si ay ugu ekaato Portfolio xirfad leh
const technologies = [
  { 
    name: "HTML5", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-6 h-6" alt="HTML5" />, 
    color: "group-hover:text-[#E34F26]" 
  },
  { 
    name: "CSS3", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-6 h-6" alt="CSS3" />, 
    color: "group-hover:text-[#1572B6]" 
  },
  { 
    name: "JavaScript", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-6 h-6 rounded-sm" alt="JS" />, 
    color: "group-hover:text-[#F7DF1E]" 
  },
  { 
    name: "React", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-6 h-6" alt="React" />, 
    color: "group-hover:text-[#61DAFB]" 
  },
  { 
    name: "TypeScript", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="w-6 h-6" alt="TS" />, 
    color: "group-hover:text-[#3178C6]" 
  },
  { 
    name: "Next.js", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="w-6 h-6 invert dark:invert-0" alt="Next.js" />, 
    color: "group-hover:text-white" 
  },
  { 
    name: "Node.js", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-6 h-6" alt="Node" />, 
    color: "group-hover:text-[#339933]" 
  },
  { 
    name: "Express", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-7 h-7 invert dark:invert-0" alt="Express" />, 
    color: "group-hover:text-white" 
  },
  { 
    name: "MongoDB", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-6 h-6" alt="MongoDB" />, 
    color: "group-hover:text-[#47A248]" 
  },
  { 
    name: "Prisma", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" className="w-6 h-6 invert dark:invert-0" alt="Prisma" />, 
    color: "group-hover:text-white" 
  },
  { 
    name: "Tailwind CSS", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" className="w-6 h-6" alt="Tailwind" />, 
    color: "group-hover:text-[#06B6D4]" 
  },
  { 
    name: "Docker", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="w-6 h-6" alt="Docker" />, 
    color: "group-hover:text-[#2496ED]" 
  },
  { 
    name: "GitHub", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-6 h-6 invert dark:invert-0" alt="GitHub" />, 
    color: "group-hover:text-white" 
  },
  { 
    name: "Python", 
    icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="Python" />, 
    color: "group-hover:text-[#3776AB]" 
  },
];

const TechLogos = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      {/* 1. Background Visuals */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Label Yar */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu size={16} className="text-primary animate-pulse" />
            <span className="text-xs font-mono font-bold text-primary tracking-[0.3em] uppercase">
              Tech Stack
            </span>
          </div>

          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">
            MY DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">ARSENAL</span>
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            I use the latest technologies to build
            <span className="text-white font-medium"> high-performance applications </span>
            that can handle
            <span className="text-white font-medium"> heavy workloads </span>
            and run at
            <span className="text-white font-medium"> fast speed</span>.
          </p>

        </motion.div>
      </div>

      {/* 2. Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Edge Faders (Madowga dhinacyada) */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-8 py-10 items-center whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {/* Double or Triple the list for seamless loop */}
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group relative flex flex-col items-center justify-center min-w-[160px]"
            >
              {/* Card Container */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 group-hover:border-primary/40 group-hover:bg-zinc-900/80 overflow-hidden shadow-2xl">

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tech Icon */}
                <span className="text-4xl md:text-5xl mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 z-10">
                  {tech.icon}
                </span>

                {/* Tech Name */}
                <span className={`text-[10px] md:text-xs font-bold font-mono tracking-tighter uppercase transition-colors duration-300 z-10 ${tech.color || 'text-gray-500'}`}>
                  {tech.name}
                </span>

                {/* Corner Decoration */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Bottom Decorative Line */}
      <div className="container mx-auto px-6 mt-16">
        <div className="flex items-center gap-4 opacity-20">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
          <Zap size={14} className="text-white" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
        </div>
      </div>
    </section>
  );
};

export default TechLogos;