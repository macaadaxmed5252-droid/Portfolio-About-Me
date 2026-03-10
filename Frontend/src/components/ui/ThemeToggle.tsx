import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Core Theme Synchronization Logic
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-secondary/50 border border-border shadow-sm text-foreground hover:text-primary hover:bg-secondary transition-all flex items-center justify-center"
            aria-label="Toggle Global Theme"
        >
            {isDark ? (
                <div className="flex items-center gap-2">
                    <Moon size={18} className="text-primary animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                    <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Ghost Mode</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Sun size={18} className="text-primary animate-spin-slow" />
                    <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Royal Mode</span>
                </div>
            )}
        </motion.button>
    );
};

export default ThemeToggle;
