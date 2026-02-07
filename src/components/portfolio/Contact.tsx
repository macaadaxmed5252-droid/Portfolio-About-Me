import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@muad.dev",
    href: "mailto:hello@muad.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available Worldwide",
    href: "#",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, delay: 2 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl h-full">
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-muted-foreground mb-4">Follow me on</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <social.icon className="w-5 h-5 text-foreground" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  Ready to Start a Project?
                </h3>
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities
                  to be part of your visions.
                </p>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full font-semibold text-lg"
                >
                  <a href="mailto:hello@muad.dev">Send Me an Email</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
