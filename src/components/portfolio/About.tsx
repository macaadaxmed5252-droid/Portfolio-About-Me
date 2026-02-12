import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Zap, ExternalLink, Terminal, Cpu, Sparkles } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description: "Developing high-fidelity user interfaces with React, Next.js, and complex Framer Motion orchestrations.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    icon: Terminal,
    title: "Backend Architecture",
    description: "Architecting scalable server-side logic using Node.js, Express, and high-performance databases like PostgreSQL & MongoDB.",
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    icon: Cpu,
    title: "Full-Stack Systems",
    description: "Bridging the gap between databases and UI with Type-safe APIs and efficient state management.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50"
  },
  {
    icon: Sparkles,
    title: "UI/UX Magic",
    description: "Designing intuitive user journeys with a focus on minimalism, accessibility, and modern aesthetics.",
    color: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50"
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-[#030303]">
      {/* 1. Cyber Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.05] shadow-[inset_0_0_100px_rgba(0,0,0,1)]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  /* Waxaan ku darnay text-center iyo mx-auto */
  className="mb-24 text-center flex flex-col items-center"
>
  {/* Div-kaan hoose waxaan siinnay justify-center si xariiqda iyo qoraalka u bartamaysan */}
  <div className="flex items-center justify-center gap-4 mb-4">
    <div className="h-[1px] w-12 bg-primary" />
    <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase font-bold">
      About Me
    </span>
    {/* Waxaan ku daray xariiq labaad dhanka midig si uu u dheelli tirmo (Balance) */}
    <div className="h-[1px] w-12 bg-primary" />
  </div>

  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8">
    Digital{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400">
      Craftsman.
    </span>
  </h2>

  {/* mx-auto ayaa halkan muhiim ah si p-ga max-width leh u bartamaysto */}
  <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-light mx-auto">
    I harmonize code and design to build <br className="hidden md:block" />
    <span className="text-white font-medium">future-ready projects</span> with real-world impact.
  </p>
</motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* 2. Interactive Bio Card - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] blur-2xl" />
              <div className="relative bg-zinc-900/50 backdrop-blur-2xl p-10 md:p-14 rounded-[2rem] border border-white/10 shadow-3xl">
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    My name is <span className="text-white font-bold tracking-tight">Muad</span>. 
                    I am a developer who loves solving complex challenges using the 
                    latest technologies in the software world.
                  </p>
                  <p>
                    My goal is to make building projects <span className="text-primary italic font-medium">simple, beautiful,</span> and lightning-fast.
                  </p>
                </div>

                {/* Status indicator */}
                <div className="mt-12 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono text-gray-400 tracking-wider">AVAILABLE FOR NEW PROJECTS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Skills Grid - Right */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                <div className={`h-full bg-zinc-900/30 backdrop-blur-md p-8 rounded-[1.8rem] border border-white/5 ${skill.border} transition-all duration-500 shadow-xl overflow-hidden`}>
                  {/* Decorative Gradient Glow */}
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${skill.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`w-14 h-14 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                    <skill.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {skill.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {skill.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    Mastery <ExternalLink className="ml-2 w-3 h-3" />
                  </div>
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