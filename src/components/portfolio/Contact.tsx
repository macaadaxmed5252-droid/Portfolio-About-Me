import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Me",
    value: "macaadaxmed5252@gmail.com",
    href: "mailto:macaadaxmed5252@gmail.com",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Phone,
    label: "Call Me",
    value: "+252 614395252",
    href: "tel:+252614395252",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mogadishu, Somalia",
    href: "#",
    color: "bg-red-500/10 text-red-500",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/macaadaxmed5252-droid", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/king_maalid", label: "Twitter" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-background">
      {/* 1. Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block italic font-bold">
            {"Connect with me"}
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
      READY TO START YOUR <br />
      <span className="relative inline-block">
        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          NEXT PROJECT ?
        </span>
        {/* Underline futuristic ah */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-1 left-0 h-1.5 bg-primary/30 rounded-full -z-0"
        />
      </span>
    </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          
          {/* 2. Contact Cards Section (Left Side) */}
          <div className="lg:col-span-3 grid gap-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:border-primary/50 transition-all duration-500 shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${info.color}`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{info.label}</p>
                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{info.value}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </motion.a>
            ))}

            {/* Social Connect Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-between"
            >
              <span className="font-semibold text-sm">Follow the Journey:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3. CTA Card (Right Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center text-center justify-center overflow-hidden">
              
              {/* Decorative SVG Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <Send className="w-10 h-10 text-primary animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                Have a Vision? <br /> Let's Talk!
              </h3>
              <p className="text-gray-400 mb-10 text-sm leading-relaxed">
                Haddii aad rabto inaad i weydiiso su'aal ama aad rabto inaan wada shaqeyno, ha ka waaban inaad farriin ii soo dirto.
              </p>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-8 rounded-2xl text-lg group overflow-hidden"
              >
                <a href="mailto:macaadaxmed5252@gmail.com" className="flex items-center justify-center gap-2">
                  Send Me a Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;