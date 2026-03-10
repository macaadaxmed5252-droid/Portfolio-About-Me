import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, MoveRight, Cpu } from "lucide-react"; // Waxaan ku daray Cpu icon
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Halkan ayaan ku daray 'Tech'
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Tech", href: "#tech" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveLink(`#${current}`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Offset yar ayaan u sameeyay si uusan Header-ka u daboolin qoraalka
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveLink(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5 py-2"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="group flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-sm border border-primary/20 rotate-3 group-hover:rotate-12">
              <Terminal className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <span className="text-2xl font-black text-foreground tracking-tighter uppercase italic">
              Muad<span className="text-primary group-hover:animate-pulse">.</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-primary group ${activeLink === link.href ? "text-primary" : "text-muted-foreground opacity-70"
                  }`}
              >
                {link.name === "Tech" && <Cpu size={10} className="inline mr-1 mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                {link.name}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <div className="flex items-center gap-6 ml-6 pl-6 border-l border-border/50">
              <ThemeToggle />
              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-foreground text-background dark:bg-primary dark:text-primary-foreground px-7 py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all active:scale-95 group h-auto"
              >
                Launch Protocol
                <MoveRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              className="text-foreground p-3 bg-muted/50 backdrop-blur-md border border-border/50 rounded-2xl hover:bg-primary/10 hover:border-primary/30 transition-all active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[73px] z-40 md:hidden bg-background/95 backdrop-blur-3xl"
          >
            <div className="flex flex-col p-10 gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-3xl font-black uppercase tracking-tighter p-4 rounded-3xl flex items-center justify-between group ${activeLink === link.href
                    ? "text-primary bg-primary/5 border border-primary/20"
                    : "text-muted-foreground border border-transparent"
                    }`}
                >
                  {link.name}
                  <MoveRight size={24} className={`transition-transform ${activeLink === link.href ? "translate-x-0" : "-translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                </motion.a>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-primary text-primary-foreground w-full rounded-3xl py-10 text-lg font-black uppercase tracking-[0.3em] mt-6 shadow-2xl shadow-primary/20 active:scale-95 transition-all"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;