import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      {/* Geometric wireframe accents */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-20 left-10 w-64 h-64 opacity-10"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
        </svg>
        <svg
          className="absolute bottom-40 right-20 w-48 h-48 opacity-10"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Floating 3D glass spheres */}
      <motion.div
        className="absolute top-32 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-xl border border-primary/20 animate-float glow-blue"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-60 left-16 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-lg border border-primary/10 animate-float-delayed"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 backdrop-blur-xl border border-primary/15 animate-float-slow"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-gradient-to-br from-primary/15 to-transparent backdrop-blur-lg border border-primary/10 animate-float"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-primary font-semibold text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to my portfolio
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              HAY! I'M{" "}
              <span className="text-gradient">MUAD</span>
              <br />
              I'M A{" "}
              <span className="text-primary">FULL STACK</span>
              <br />
              DEVELOPER
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Crafting exceptional digital experiences with modern technologies.
              From concept to deployment, I bring ideas to life.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={scrollToProjects}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full font-semibold text-lg"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="border-border hover:bg-secondary text-foreground px-8 py-6 rounded-full font-semibold text-lg"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110" />
              
              {/* Profile image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 glass-card">
                <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <span className="text-6xl font-heading font-bold text-primary">M</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-muted-foreground cursor-pointer"
          onClick={scrollToProjects}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
