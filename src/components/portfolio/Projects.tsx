import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with real-time inventory, secure payments, and an intuitive admin dashboard.",
    image: "/placeholder.svg",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://your-project.vercel.app",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management tool with real-time updates, team features, and productivity analytics.",
    image: "/placeholder.svg",
    tags: ["TypeScript", "React", "Supabase", "Tailwind"],
    liveUrl: "https://your-project.vercel.app",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A creative portfolio showcasing design work with smooth animations and interactive elements.",
    image: "/placeholder.svg",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://your-project.vercel.app",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    description:
      "An analytics dashboard with data visualization, user management, and subscription handling.",
    image: "/placeholder.svg",
    tags: ["Next.js", "Prisma", "Chart.js", "Auth0"],
    liveUrl: "https://your-project.vercel.app",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Social Media App",
    description:
      "A social platform with real-time messaging, post feeds, and user engagement features.",
    image: "/placeholder.svg",
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://your-project.vercel.app",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "AI Writing Assistant",
    description:
      "An AI-powered writing tool that helps users generate and refine content effortlessly.",
    image: "/placeholder.svg",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    liveUrl: "https://your-project.vercel.app",
    githubUrl: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Recent <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my latest work. Each project represents a unique challenge and solution.
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
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 rounded-full hover:bg-background transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 rounded-full hover:bg-background transition-colors"
                    >
                      <Github className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* View Live Button */}
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold group"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      View Live
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
