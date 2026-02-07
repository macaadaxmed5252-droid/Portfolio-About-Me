import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h4 className="text-2xl font-heading font-bold text-foreground mb-2">
              MUAD
            </h4>
            <p className="text-muted-foreground text-sm flex items-center gap-1 justify-center md:justify-start">
              © {currentYear} Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by Muad
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4"
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Back to Top */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <div className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowUp className="w-5 h-5" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
