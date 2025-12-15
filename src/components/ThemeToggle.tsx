import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full glass-morphism border border-border/50 transition-all duration-500 hover:scale-105 group overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Animated background glow */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isDark 
            ? "bg-gradient-to-r from-neon-purple/20 to-neon-blue/20" 
            : "bg-gradient-to-r from-amber-400/20 to-orange-400/20"
        }`}
      />
      
      {/* Sliding indicator */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
          isDark 
            ? "left-1 bg-gradient-to-br from-neon-purple to-neon-blue shadow-[0_0_15px_hsl(var(--neon-purple)/0.5)]" 
            : "left-7 bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-background" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-background" />
        )}
      </div>
      
      {/* Stars for dark mode */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute top-1.5 right-2 w-1 h-1 bg-foreground/60 rounded-full" />
        <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-foreground/40 rounded-full" />
        <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-foreground/50 rounded-full" />
      </div>
    </button>
  );
};

export default ThemeToggle;