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
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Professional Blog",
    description: "Fully responsive blog platform with advanced admin dashboard and article management.",
    image: "/Blog.png",
    tags: ["JavaScript", "React", "Backend", "Tailwind"],
    liveUrl: "https://professional-blog-three.vercel.app/",
    githubUrl: "https://github.com/macaadaxmed5252-droid/Professional-Blog-.git",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Real Estate Platform",
    description: "is a modern web app for browsing, buying, and renting properties with an admin dashboard for easy management.",
    image: "/Real-State.png",
    tags: ["JavaScript", "React", "Backend", "Tailwind.css"],
    liveUrl: "https://somali-estate.vercel.app/",
    githubUrl: "https://github.com/macaadaxmed5252-droid/Somali-Estate.git",
    color: "from-purple-500/20 to-pink-500/20",
  },
  // Ku dar mashaariicda kale halkan...
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Layers size={14} className="text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
              My Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Check out some of the projects I have built here, which include a mix of business solutions and technical experiments.

          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-card/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-2xl flex flex-col">
                
                {/* 1. Image Area with Overlay */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <a href={project.githubUrl} target="_blank" className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-primary hover:text-black transition-all">
                      <Github size={18} />
                    </a>
                    <a href={project.liveUrl} target="_blank" className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-primary hover:text-black transition-all">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* 2. Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-zinc-800/50 text-[10px] text-zinc-400 border-none px-3 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Main Action Button */}
                  <Button
                    asChild
                    className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-2xl py-6 font-bold transition-all duration-300 group/btn"
                  >
                    <a href={project.liveUrl} target="_blank" className="flex items-center justify-center gap-2">
                      Live Preview
                      <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Background Glow on Hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>

        {/* View More Call-to-action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground font-mono text-sm">
            Want to see more? <a href="https://github.com/macaadaxmed5252-droid" className="text-primary hover:underline font-bold">Explore my GitHub</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;