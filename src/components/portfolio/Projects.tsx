import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A high-performance e-commerce solution with real-time inventory and secure payments control.",
    image: "/E-Commerce.png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "https://full-project-e-commerce.vercel.app/",
    githubUrl: "https://github.com/macaadaxmed5252-droid/FULL-PROJECT-E-Commerce-.git",
    color: "from-blue-500/40 to-cyan-400/40", // Iftiin ayaa lagu kordhiyey
  },
  {
    id: 2,
    title: "Professional Blog",
    description: "Fully responsive blog platform with advanced admin dashboard and article management.",
    image: "/Blog.png",
    tags: ["JavaScript", "React", "Backend", "Tailwind"],
    liveUrl: "https://professional-blog-three.vercel.app/",
    githubUrl: "https://github.com/macaadaxmed5252-droid/Professional-Blog-.git",
    color: "from-purple-500/40 to-pink-400/40",
  },
  {
    id: 3,
    title: "Real Estate Platform",
    description: "Modern web app for browsing, buying, and renting properties with an admin dashboard.",
    image: "/Real-State.png",
    tags: ["JavaScript", "React", "Backend", "Tailwind.css"],
    liveUrl: "https://somali-estate.vercel.app/",
    githubUrl: "https://github.com/macaadaxmed5252-droid/Somali-Estate.git",
    color: "from-emerald-500/40 to-cyan-400/40",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-[#020617]">
      
      {/* --- BACKGROUND GLOW EFFECTS (Iftiinka dhabarka) --- */}
      {/* Midigta sare */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      {/* Bidixda hoose */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10" />
      {/* Bartamaha - Iftiin daciif ah */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_0%,transparent_70%)] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-6 backdrop-blur-md">
            <Layers size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.3em]">
              Showcasing My Work
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Projects</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A selection of my recent works, ranging from complex enterprise systems to innovative web experiments.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
                
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay dhalaalaya markii la dusha tago */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-5 right-5 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <a href={project.githubUrl} target="_blank" className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all shadow-xl">
                      <Github size={20} />
                    </a>
                    <a href={project.liveUrl} target="_blank" className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/20 text-white hover:bg-cyan-500 hover:text-black transition-all shadow-xl">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-white/5 text-[10px] text-slate-300 border border-white/10 px-3 py-1 rounded-full group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-cyan-500 text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-2xl py-7 font-black transition-all duration-300 group/btn"
                  >
                    <a href={project.liveUrl} target="_blank" className="flex items-center justify-center gap-2">
                      EXPLORE LIVE
                      <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Hover Background Glow - Kan ayaa ka dhigaya inuu iftiimo markii mouse-ka la dusha mariyo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[2.6rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Footer Call-to-action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm"
        >
          <p className="text-slate-400 font-mono text-sm flex items-center justify-center gap-3">
            <span className="w-10 h-[1px] bg-slate-800" />
            CURIOUS TO SEE MORE? 
            <a href="https://github.com/macaadaxmed5252-droid" target="_blank" className="text-cyan-400 hover:text-white transition-colors font-bold flex items-center gap-1">
              GITHUB REPOSITORY <ArrowUpRight size={14} />
            </a>
            <span className="w-10 h-[1px] bg-slate-800" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;