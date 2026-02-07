import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive and interactive UIs with React, TypeScript, and modern CSS frameworks.",
  },
  {
    icon: Rocket,
    title: "Backend Development",
    description: "Creating robust APIs and server-side solutions with Node.js, Python, and databases.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Designing intuitive user experiences with attention to detail and modern aesthetics.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Ensuring fast load times and smooth interactions for the best user experience.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accent */}
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
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm a passionate Full Stack Developer dedicated to creating impactful digital solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                Who I Am
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hi, I'm Muad – a Full Stack Developer with a passion for building 
                beautiful, functional, and scalable web applications. I love transforming 
                complex problems into simple, elegant solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With expertise in both frontend and backend technologies, I bring ideas 
                to life from concept to deployment. I believe in clean code, great user 
                experiences, and continuous learning.
              </p>
              <div className="flex flex-wrap gap-3">
                {["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Tailwind CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-6 rounded-xl group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {skill.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
