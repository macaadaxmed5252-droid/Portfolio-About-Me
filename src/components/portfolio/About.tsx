import { motion } from "framer-motion";
import { Code2, Terminal, Cpu, Sparkles, ExternalLink } from "lucide-react";

// --- SKILLS DATA (SIDII HORE) ---
const skills = [
  { icon: Code2, title: "Frontend Engineering", description: "Developing high-fidelity user interfaces with React, Next.js, and complex animations.", color: "from-blue-500/20 to-cyan-500/20", border: "group-hover:border-blue-500/50" },
  { icon: Terminal, title: "Backend Architecture", description: "Architecting scalable server-side logic using Node.js, Express, and high-performance databases.", color: "from-purple-500/20 to-pink-500/20", border: "group-hover:border-purple-500/50" },
  { icon: Cpu, title: "Full-Stack Systems", description: "Bridging the gap between databases and UI with Type-safe APIs and efficient state management.", color: "from-emerald-500/20 to-teal-500/20", border: "group-hover:border-emerald-500/50" },
  { icon: Sparkles, title: "UI/UX Magic", description: "Designing intuitive user journeys with a focus on minimalism and modern aesthetics.", color: "from-orange-500/20 to-red-500/20", border: "group-hover:border-orange-500/50" },
];

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-[#030112]">
      
      {/* --- 1. CONSTELLATION BACKGROUND (SIDA RISE ACADEMY) --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Xariiqyada Isku Xiran (Connections) */}
          {[...Array(15)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 1000}
              y1={Math.random() * 1000}
              x2={Math.random() * 1000}
              y2={Math.random() * 1000}
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              animate={{
                x1: [Math.random() * 1000, Math.random() * 1000],
                y1: [Math.random() * 1000, Math.random() * 1000],
              }}
              transition={{ duration: 20 + i, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Dhibcaha Iftiimaya (Glow Nodes) */}
          {[...Array(25)].map((_, i) => (
            <motion.circle
              key={`node-${i}`}
              r={Math.random() * 2 + 1}
              fill="#42B6F0"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.8, 0.1],
                cx: [Math.random() * 1000, Math.random() * 1000],
                cy: [Math.random() * 1000, Math.random() * 1000],
              }}
              transition={{ duration: 15 + i, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </svg>
      </div>

      {/* --- 2. AMBIENT GLOWS --- */}
      <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase font-bold">
              Who I Am
            </span>
            <div className="h-[1px] w-12 bg-primary" />
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8">
            Digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#42B6F0] to-emerald-400">
              Architect.
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-light mx-auto">
            I craft immersive <span className="text-white">full-stack ecosystems</span> where 
            high-performance code meets intuitive design.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Bio Card - Premium Glass */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#42B6F0]/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#0A0B1E]/60 backdrop-blur-3xl p-10 md:p-14 rounded-[2.5rem] border border-white/10">
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                  <p>
                    I am <span className="text-white font-bold">Muad Ahmed</span>, a dedicated Full-Stack Developer 
                    passionate about creating seamless user experiences.
                  </p>
                  <p>
                    From <span className="text-[#42B6F0]">Backend Logic</span> to <span className="text-emerald-400">Frontend Precision</span>, 
                    I focus on building solutions that scale and perform under pressure.
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                    Ready for new challenges
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md p-8 rounded-[2rem] border border-white/10 transition-all duration-500">
                  <div className={`w-14 h-14 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform`}>
                    <skill.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#42B6F0] transition-colors">{skill.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;