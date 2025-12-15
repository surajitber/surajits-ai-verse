import { useState, useRef, useEffect, useCallback } from "react";
import { Gamepad2, Sparkles, Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface RobotState {
  x: number;
  y: number;
  rotation: number;
  isMoving: boolean;
}

const PlaygroundSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [robot, setRobot] = useState<RobotState>({ x: 50, y: 50, rotation: 0, isMoving: false });
  const [neonSwitches, setNeonSwitches] = useState([false, false, false, false]);
  const [showPoseSkeleton, setShowPoseSkeleton] = useState(false);
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);

  const colors = ["#00C8FF", "#8B5CF6", "#00FFD1", "#FF00D4"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Particle animation
  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
            life: p.life - 1,
          }))
          .filter(p => p.life > 0 && p.y < 400)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  const spawnParticles = useCallback((x: number, y: number, count: number = 20) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60 + Math.random() * 40,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const moveRobot = (direction: "up" | "down" | "left" | "right") => {
    setRobot(prev => {
      const speed = 10;
      let newX = prev.x;
      let newY = prev.y;
      let rotation = prev.rotation;

      switch (direction) {
        case "up":
          newY = Math.max(0, prev.y - speed);
          rotation = 0;
          break;
        case "down":
          newY = Math.min(100, prev.y + speed);
          rotation = 180;
          break;
        case "left":
          newX = Math.max(0, prev.x - speed);
          rotation = 270;
          break;
        case "right":
          newX = Math.min(100, prev.x + speed);
          rotation = 90;
          break;
      }

      return { x: newX, y: newY, rotation, isMoving: true };
    });

    setTimeout(() => setRobot(prev => ({ ...prev, isMoving: false })), 200);
  };

  const toggleSwitch = (index: number) => {
    setNeonSwitches(prev => {
      const newSwitches = [...prev];
      newSwitches[index] = !newSwitches[index];
      return newSwitches;
    });
    spawnParticles(150 + index * 80, 50, 15);
  };

  const resetPlayground = () => {
    setRobot({ x: 50, y: 50, rotation: 0, isMoving: false });
    setNeonSwitches([false, false, false, false]);
    setShowPoseSkeleton(false);
    setParticles([]);
  };

  return (
    <section
      ref={containerRef}
      id="playground"
      className="relative py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
            3D Interactive Playground
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Play with AI particles, control robots, and trigger neon animations!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua mx-auto rounded-full mt-4" />
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Playground Container */}
          <div className="glass rounded-3xl p-8 neon-border relative overflow-hidden">
            {/* Background glow effects based on switches */}
            {neonSwitches.map((isOn, index) => (
              isOn && (
                <div
                  key={index}
                  className="absolute w-40 h-40 rounded-full blur-3xl transition-opacity duration-500"
                  style={{
                    background: colors[index],
                    opacity: 0.2,
                    left: `${20 + index * 20}%`,
                    top: "30%",
                  }}
                />
              )
            ))}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Robot Control */}
              <div className="space-y-6">
                <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-neon-blue" />
                  Robot Control
                </h3>

                {/* Robot Arena */}
                <div className="relative aspect-square bg-muted/30 rounded-2xl border border-border/50 overflow-hidden">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-px w-full bg-neon-blue/50"
                        style={{ top: `${i * 10}%` }}
                      />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-px h-full bg-neon-blue/50"
                        style={{ left: `${i * 10}%` }}
                      />
                    ))}
                  </div>

                  {/* Robot */}
                  <div
                    className="absolute w-12 h-12 transition-all duration-200 ease-out"
                    style={{
                      left: `calc(${robot.x}% - 24px)`,
                      top: `calc(${robot.y}% - 24px)`,
                      transform: `rotate(${robot.rotation}deg)`,
                    }}
                  >
                    <div className={`w-full h-full rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center ${robot.isMoving ? "animate-pulse" : ""}`}>
                      <div className="w-8 h-8">
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                          <path d="M12 2L15 8H9L12 2Z" fill="currentColor" className="text-background" />
                          <rect x="8" y="8" width="8" height="10" rx="2" fill="currentColor" className="text-background" />
                          <circle cx="10" cy="12" r="1.5" fill="currentColor" className="text-neon-aqua" />
                          <circle cx="14" cy="12" r="1.5" fill="currentColor" className="text-neon-aqua" />
                        </svg>
                      </div>
                    </div>
                    {robot.isMoving && (
                      <div className="absolute inset-0 bg-neon-blue/50 blur-lg rounded-lg animate-pulse" />
                    )}
                  </div>
                </div>

                {/* D-Pad Controls */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    <div />
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-neon-blue/50 hover:bg-neon-blue/20"
                      onClick={() => moveRobot("up")}
                    >
                      ↑
                    </Button>
                    <div />
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-neon-blue/50 hover:bg-neon-blue/20"
                      onClick={() => moveRobot("left")}
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-neon-purple/50 hover:bg-neon-purple/20"
                      onClick={() => spawnParticles(150, 150, 30)}
                    >
                      <Sparkles className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-neon-blue/50 hover:bg-neon-blue/20"
                      onClick={() => moveRobot("right")}
                    >
                      →
                    </Button>
                    <div />
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-neon-blue/50 hover:bg-neon-blue/20"
                      onClick={() => moveRobot("down")}
                    >
                      ↓
                    </Button>
                    <div />
                  </div>
                </div>
              </div>

              {/* Right: Particle & Effects */}
              <div className="space-y-6">
                <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-neon-purple" />
                  Effects & Animations
                </h3>

                {/* Particle Canvas */}
                <div 
                  className="relative aspect-video bg-muted/30 rounded-2xl border border-border/50 overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 300;
                    const y = ((e.clientY - rect.top) / rect.height) * 200;
                    spawnParticles(x, y, 25);
                  }}
                >
                  <p className="absolute top-2 left-3 text-xs text-muted-foreground">
                    Click anywhere to spawn particles
                  </p>
                  
                  {/* Particles */}
                  <svg className="absolute inset-0 w-full h-full">
                    {particles.map((p) => (
                      <circle
                        key={p.id}
                        cx={`${(p.x / 300) * 100}%`}
                        cy={`${(p.y / 200) * 100}%`}
                        r={p.size}
                        fill={p.color}
                        opacity={p.life / 100}
                        style={{ filter: `blur(${1}px)` }}
                      />
                    ))}
                  </svg>

                  {/* Pose Skeleton Animation */}
                  {showPoseSkeleton && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 150" className="w-32 h-48 animate-pulse">
                        {/* Head */}
                        <circle cx="50" cy="15" r="10" stroke="#00C8FF" strokeWidth="2" fill="none" />
                        {/* Body */}
                        <line x1="50" y1="25" x2="50" y2="70" stroke="#8B5CF6" strokeWidth="2" />
                        {/* Arms */}
                        <line x1="50" y1="35" x2="20" y2="55" stroke="#00FFD1" strokeWidth="2" className="animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <line x1="50" y1="35" x2="80" y2="55" stroke="#00FFD1" strokeWidth="2" className="animate-bounce" style={{ animationDelay: "0.2s" }} />
                        {/* Legs */}
                        <line x1="50" y1="70" x2="30" y2="110" stroke="#FF00D4" strokeWidth="2" className="animate-bounce" style={{ animationDelay: "0.3s" }} />
                        <line x1="50" y1="70" x2="70" y2="110" stroke="#FF00D4" strokeWidth="2" className="animate-bounce" style={{ animationDelay: "0.4s" }} />
                        {/* Joints */}
                        {[[50, 15], [50, 35], [50, 70], [20, 55], [80, 55], [30, 110], [70, 110]].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r="4" fill="#00C8FF" />
                        ))}
                      </svg>
                    </div>
                  )}
                </div>

                {/* Neon Switches */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Neon Switches</p>
                  <div className="flex gap-4 justify-center">
                    {neonSwitches.map((isOn, index) => (
                      <button
                        key={index}
                        onClick={() => toggleSwitch(index)}
                        className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 ${
                          isOn
                            ? "border-transparent shadow-lg"
                            : "border-border/50 bg-muted/30"
                        }`}
                        style={{
                          background: isOn ? colors[index] : undefined,
                          boxShadow: isOn ? `0 0 20px ${colors[index]}50` : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Skeleton Toggle */}
                <Button
                  variant="outline"
                  className={`w-full ${showPoseSkeleton ? "border-neon-aqua text-neon-aqua" : "border-border/50"}`}
                  onClick={() => setShowPoseSkeleton(!showPoseSkeleton)}
                >
                  {showPoseSkeleton ? "Hide" : "Show"} Pose Skeleton Animation
                </Button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={resetPlayground}
                className="border-neon-pink/50 hover:border-neon-pink hover:text-neon-pink"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Playground
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundSection;
