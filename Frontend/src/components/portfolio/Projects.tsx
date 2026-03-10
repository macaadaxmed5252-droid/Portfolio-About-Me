import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Layers, ArrowUpRight, Loader2, Code2, Sparkles, Box, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectsAPI } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-32 relative bg-background overflow-hidden">

      {/* --- PREMIUM ATMOSPHERE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-card border border-border/50 mb-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-primary/20 border border-primary/40" />)}
            </div>
            <span className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Engineering Nexus</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 uppercase leading-none italic"
          >
            PROTOTYPE <span className="text-primary not-italic">TO</span> <span className="relative">PRODUCTION<span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -skew-x-12" /></span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-muted-foreground text-xs md:text-sm max-w-2xl font-bold uppercase tracking-widest leading-relaxed opacity-60"
          >
            A curated selection of high-performance applications built with the MERN stack and bleeding-edge design protocols.
          </motion.p>
        </div>

        {/* --- LOADING & ERROR HANDLING --- */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loader" exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <span className="text-[10px] font-black tracking-widest text-primary animate-pulse uppercase">Syncing Data...</span>
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="text-center py-20 border-2 border-dashed border-border rounded-[3rem]">
              <ShieldCheck className="mx-auto mb-4 text-destructive w-12 h-12" />
              <h3 className="text-xl font-black uppercase tracking-tighter">Connection Interrupted</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase mt-2">Check your uplink and refresh the interface.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full bg-card dark:bg-card/40 border border-border/60 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-700 backdrop-blur-3xl flex flex-col shadow-xl shadow-black/[0.03] dark:shadow-none hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]">

                    {/* Visual Interface (Image) */}
                    <div className="relative h-64 overflow-hidden p-4">
                      <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative  transition-transform duration-700">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] font-black uppercase tracking-widest">Deployed</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Matrix */}
                    <div className="p-8 flex-1 flex flex-col space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Module 0{index + 1}</span>
                          <Box size={14} className="text-muted-foreground/40" />
                        </div>
                        <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-[11px] leading-relaxed font-bold uppercase tracking-tight line-clamp-2 opacity-70">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-muted/50 text-[8px] font-black text-muted-foreground border border-border/40 px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-6 mt-auto border-t border-border/40 flex items-center justify-between gap-4">
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                              <Github size={18} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-3 bg-foreground text-background dark:bg-primary dark:text-primary-foreground py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 group/btn"
                          >
                            Execute
                            <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* --- GLOBAL REPOSITORY CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-1 bg-gradient-to-r from-primary/20 via-border to-primary/20 rounded-[3rem]"
        >
          <div className="bg-card dark:bg-card/80 backdrop-blur-3xl rounded-[2.9rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 border border-border/40 dark:border-white/5 shadow-2xl shadow-black/[0.03] dark:shadow-none">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><Code2 className="text-primary" size={20} /></div>
                <h4 className="text-2xl font-black tracking-tighter uppercase italic">Open Source Protocol</h4>
              </div>
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest max-w-md opacity-60">
                Deep dive into the architecture. All repositories are public for technical audit and collaborative review.
              </p>
            </div>

            <a
              href="https://github.com/macaadaxmed5252-droid"
              target="_blank"
              className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(var(--primary),0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              <Sparkles size={16} className="animate-pulse" />
              Access All Systems
              <Github size={18} className="group-hover:rotate-[360deg] transition-transform duration-700" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;