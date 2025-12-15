import { useEffect, useState, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const lines = [
    "Hi, I'm Surajit Bera",
    "AI & Computer Vision Developer",
    "I build intelligent systems that understand the world.",
  ];

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const line = lines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setCurrentLineText(line.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Add completed line to array
        setCompletedLines(prev => [...prev, line]);
        setCurrentLineText("");
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, 800);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
        }}
      />
      {/* 3D Hologram Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-neon-blue/30 rounded-full animate-spin-slow" />
          
          {/* Middle ring */}
          <div 
            className="absolute inset-8 border-2 border-neon-purple/40 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "15s" }}
          />
          
          {/* Inner ring */}
          <div 
            className="absolute inset-16 border-2 border-neon-aqua/50 rounded-full animate-spin-slow"
            style={{ animationDuration: "10s" }}
          />

          {/* Center initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="font-display text-8xl md:text-9xl font-bold gradient-text animate-pulse-glow">
                SB
              </span>
              <div className="absolute -inset-4 bg-neon-blue/20 blur-3xl rounded-full" />
            </div>
          </div>

          {/* Floating particles around initials */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-neon-aqua rounded-full animate-floating"
              style={{
                top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mt-20">
        <div className="mb-8 inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-fade-in">
          <Sparkles className="w-4 h-4 text-neon-aqua" />
          <span className="text-sm text-muted-foreground font-medium">
            Welcome to my digital space
          </span>
        </div>

        <div className="min-h-[200px] flex flex-col items-center justify-center space-y-4">
          {/* Line 1 - Name */}
          {(completedLines.length > 0 || currentLineIndex === 0) && (
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-glow-blue transition-opacity duration-300">
              {completedLines[0] || currentLineText}
              {isTyping && currentLineIndex === 0 && (
                <span className="animate-pulse text-neon-blue">|</span>
              )}
            </h1>
          )}
          
          {/* Line 2 - Title */}
          {(completedLines.length > 1 || currentLineIndex === 1) && (
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold text-neon-purple text-glow-purple transition-opacity duration-300">
              {completedLines[1] || currentLineText}
              {isTyping && currentLineIndex === 1 && (
                <span className="animate-pulse text-neon-purple">|</span>
              )}
            </h2>
          )}
          
          {/* Line 3 - Description */}
          {(completedLines.length > 2 || currentLineIndex === 2) && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl transition-opacity duration-300">
              {completedLines[2] || currentLineText}
              {isTyping && currentLineIndex === 2 && (
                <span className="animate-pulse text-neon-aqua">|</span>
              )}
            </p>
          )}
        </div>

        {!isTyping && (
          <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua text-background font-display font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,200,255,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </Button>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-neon-blue/60" />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  );
};

export default HeroSection;
