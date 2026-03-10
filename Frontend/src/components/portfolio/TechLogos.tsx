import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import { techsAPI } from "@/lib/api";

interface Tech {
  _id: string;
  name: string;
  iconUrl: string;
  color?: string;
  textColor?: string;
  invert?: boolean;
}

const TechLogos = () => {
  const [technologies, setTechnologies] = useState<Tech[]>([]);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await techsAPI.getAll();
        setTechnologies(res.data.data);
      } catch {
        // silently fail — marquee just won't render
      }
    };
    fetchTechs();
  }, []);

  return (
    <section id="tech" className="py-24 relative overflow-hidden bg-background select-none transition-colors duration-500">

      {/* --- PREMIUM DECORATION --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[350px] h-[350px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-xl shadow-sm">
            <Zap size={14} className="text-primary fill-primary/20 animate-pulse" />
            <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">
              Operational Stack
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-[0.9]">
            Digital <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent italic">Ecosystem</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium uppercase tracking-tight opacity-80">
            Engineered with <span className="text-foreground font-bold border-b-2 border-primary/20">Modern Frameworks</span> for mission-critical performance.
          </p>
        </motion.div>
      </div>

      {/* --- SEAMLESS HIGH-END MARQUEE --- */}
      {technologies.length > 0 && (
        <div className="relative flex overflow-hidden py-10">
          {/* Edge Fades - Custom Gradients for Light/Dark */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 z-20 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 z-20 bg-gradient-to-l from-background via-background/80 to-transparent" />

          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -1500] }}
            transition={{
              repeat: Infinity,
              duration: 35, // Slower is more premium
              ease: "linear"
            }}
          >
            {/* Triplicating for truly seamless infinite loop */}
            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
              <motion.div
                key={`${tech._id}-${index}`}
                className="flex flex-col items-center justify-center"
              >
                <div className="group relative w-28 h-28 md:w-36 md:h-36 bg-card dark:bg-card/40 hover:bg-card/80 border border-border/60 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 hover:border-primary/40 backdrop-blur-md shadow-lg shadow-black/[0.02] dark:shadow-none group">

                  {/* Internal Glow on Hover */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-[2rem] transition-colors duration-500" />

                  {/* Floating Tech Icon */}
                  <div className="relative z-10 mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    <img
                      src={tech.iconUrl}
                      className={`w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-700 
                        ${tech.invert ? 'dark:invert-0 invert' : 'grayscale-[0.5] opacity-70'} 
                        group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]`}
                      alt={tech.name}
                    />
                  </div>

                  {/* Name Label */}
                  <span className="relative z-10 text-[9px] font-black tracking-[0.2em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-500 px-4 text-center truncate w-full">
                    {tech.name}
                  </span>

                  {/* Micro-Interaction Bar */}
                  <div className="absolute bottom-4 w-6 h-[2px] bg-primary/20 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* --- REFINED BOTTOM ACCENT --- */}
      <div className="container mx-auto px-6 mt-12 flex justify-center">
        <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-border to-transparent relative">
          <motion.div
            animate={{
              left: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[1px] w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default TechLogos;