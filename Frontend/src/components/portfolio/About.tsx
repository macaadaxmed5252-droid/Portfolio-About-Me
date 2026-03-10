import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Terminal, Cpu, Sparkles, ExternalLink, Globe, Layers } from "lucide-react";

// --- SKILLS DATA ---
const skills = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description: "React, Next.js, and Framer Motion expert.",
    color: "from-blue-500 to-cyan-400",
    size: "lg:col-span-2"
  },
  {
    icon: Terminal,
    title: "Backend Architecture",
    description: "Scalable Node.js & Express systems.",
    color: "from-purple-500 to-pink-500",
    size: "lg:col-span-1"
  },
  {
    icon: Cpu,
    title: "Full-Stack Systems",
    description: "Type-safe APIs & State management.",
    color: "from-orange-500 to-amber-400",
    size: "lg:col-span-1"
  },
  {
    icon: Layers,
    title: "Database Design",
    description: "High-performance MongoDB & SQL schemas.",
    color: "from-emerald-500 to-teal-400",
    size: "lg:col-span-2"
  },
];

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background text-foreground transition-colors duration-500">

      {/* --- ADAPTIVE BACKGROUND SHAPES --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md mb-6"
          >
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground">Discover the Craft</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase">
            Building Digital <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent italic">Masterpieces.</span>
          </h2>

          <p className="max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed uppercase tracking-wider font-medium opacity-80">
            Fusing architecture with aesthetics to deliver <span className="text-foreground border-b-2 border-primary/30 font-bold">High-Performance</span> web ecosystems.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Bio Card - System Aware */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 h-full"
          >
            <TiltCard className="h-full">
              <div className="h-full bg-card border border-border/60 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-between group hover:border-primary/50 transition-all duration-700 shadow-xl shadow-black/[0.02] dark:shadow-none">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:rotate-12 transition-transform duration-500">
                    <Globe size={30} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground">Muad Ahmed</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-semibold uppercase tracking-wide">
                    A Software Engineer obsessed with <span className="text-foreground font-black">Scalability</span> and <span className="text-primary font-black italic">Visual Perfection</span>. I don't just write code; I build legacies.
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between p-5 bg-muted/50 rounded-2xl border border-border group-hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">Protocol: Active</span>
                  </div>
                  <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Skills Bento Grid - System Aware */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={skill.size}
              >
                <div className="group relative h-full bg-card dark:bg-card/30 hover:bg-card/60 border border-border/60 p-6 rounded-[2rem] transition-all duration-500 overflow-hidden backdrop-blur-sm shadow-xl shadow-black/[0.02] dark:shadow-none">
                  {/* Subtle Gradient Glow on Hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700`} />

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} p-[1px] mb-4 shadow-lg shadow-primary/5`}>
                    <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                      <skill.icon size={20} className="text-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  <h4 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors text-foreground">{skill.title}</h4>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-loose">{skill.description}</p>
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