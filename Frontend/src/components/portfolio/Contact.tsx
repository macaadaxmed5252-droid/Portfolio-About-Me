import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Sparkles, Loader2, CheckCircle2, Globe, Zap } from "lucide-react";
import { messagesAPI } from "@/lib/api";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Direct Signal",
    value: "macaadaxmed5252@gmail.com",
    href: "mailto:macaadaxmed5252@gmail.com",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Phone,
    label: "Voice Comms",
    value: "+252 614395252",
    href: "tel:+252614395252",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Globe,
    label: "Base Location",
    value: "Mogadishu, Somalia",
    href: "#",
    color: "text-primary bg-primary/10 border-primary/20",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/macaadaxmed5252-droid", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mu-aad-ahmed-5344173aa", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/king_maalid", label: "Twitter" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await messagesAPI.send(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success("Inquiry received! Synchronization complete.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Transmission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background transition-colors duration-500">

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-xl"
          >
            <Zap size={14} className="text-primary animate-pulse fill-primary/20" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Gateway Portal</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] uppercase">
            Let's Scale Your <br />
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent italic px-2">Next Big Idea.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base font-medium uppercase tracking-tight opacity-80">
            If you have a question or would like to work with me, feel free to send me a message.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* 1. CONTACT INFO CARDS (Left Side - 4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center p-5 bg-card border border-border/60 rounded-2xl hover:border-primary/40 hover:bg-card/80 transition-all duration-500 backdrop-blur-xl shadow-xl shadow-black/[0.02] dark:shadow-none"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mr-4 transition-all duration-500 group-hover:scale-110 ${info.color}`}>
                  <info.icon size={20} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">{info.label}</p>
                  <p className="text-xs font-bold text-foreground truncate uppercase">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Global Presence Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-primary p-8 rounded-3xl text-primary-foreground relative overflow-hidden group shadow-xl shadow-primary/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4">Connect Globally</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 border border-white/20 hover:-translate-y-1"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 2. MAIN FORM (Right Side - 8 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-card border border-border/60 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-black/[0.03] dark:shadow-none hover:border-primary/20 transition-colors"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl rounded-full" />

            <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3 tracking-tighter uppercase">
              <Send size={20} className="text-primary" /> Transmission Interface
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20">
                  <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                <h4 className="text-2xl font-black text-foreground tracking-tighter uppercase mb-2">Signal Received</h4>
                <p className="text-muted-foreground text-sm uppercase tracking-tight mb-8">Synchronization complete. Expect a response shortly.</p>
                <button
                  onClick={() => setSent(false)}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  New Transmission
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Entity Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Organization or Name"
                      className="w-full bg-background/80 dark:bg-background/20 border border-border/80 dark:border-border/40 text-foreground px-5 py-4 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all font-bold text-xs uppercase tracking-tight"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Secure Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="address@domain.com"
                      className="w-full bg-background/80 dark:bg-background/20 border border-border/80 dark:border-border/40 text-foreground px-5 py-4 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all font-bold text-xs uppercase tracking-tight"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Mission Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Briefly define the scope"
                    className="w-full bg-background/80 dark:bg-background/20 border border-border/80 dark:border-border/40 text-foreground px-5 py-4 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all font-bold text-xs uppercase tracking-tight"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Inquiry Details</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Outline your requirements..."
                    className="w-full bg-background/80 dark:bg-background/20 border border-border/80 dark:border-border/40 text-foreground px-5 py-4 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all font-bold text-xs uppercase tracking-tight resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative group py-5 bg-primary text-primary-foreground font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                  <span className="flex items-center justify-center gap-3">
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {submitting ? "Enciphering..." : "Finalize Broadcast"}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;