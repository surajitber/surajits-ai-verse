import { useEffect, useRef, useState } from "react";
import { Brain, Eye, Code2, Cpu, Database, Zap } from "lucide-react";

const skills = [
  { name: "Python", level: 95, icon: Code2, color: "neon-blue" },
  { name: "OpenCV", level: 90, icon: Eye, color: "neon-purple" },
  { name: "TensorFlow/PyTorch", level: 85, icon: Brain, color: "neon-aqua" },
  { name: "OpenPose", level: 88, icon: Cpu, color: "neon-pink" },
  { name: "Google Colab", level: 92, icon: Database, color: "neon-green" },
  { name: "Machine Learning", level: 87, icon: Zap, color: "neon-blue" },
];

const badges = [
  "Python",
  "OpenCV",
  "OpenPose",
  "Pose Estimation",
  "TensorFlow",
  "PyTorch",
  "Google Colab",
  "Machine Learning",
  "Image Processing",
  "Computer Vision",
  "Deep Learning",
  "NumPy",
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="glass rounded-2xl p-8 neon-border">
              <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                I love building AI models, solving visual problems, and explaining 
                things in simple ways. My focus is{" "}
                <span className="text-neon-blue font-semibold">computer vision</span>,{" "}
                <span className="text-neon-purple font-semibold">pose estimation</span>,{" "}
                <span className="text-neon-aqua font-semibold">image processing</span>, 
                and creative AI projects.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                "I teach machines how to see." — That's my passion. Every pixel 
                tells a story, and I help computers understand it.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <span
                  key={badge}
                  className={`px-4 py-2 rounded-full text-sm font-medium glass border border-neon-blue/30 text-foreground hover:border-neon-blue hover:text-neon-blue transition-all duration-300 cursor-default ${
                    isVisible ? "animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Skills */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="glass rounded-2xl p-8 neon-border-purple">
              <h3 className="font-display text-2xl font-semibold mb-6 text-neon-purple">
                Skills & Expertise
              </h3>
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className={`w-5 h-5 text-${skill.color}`} />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className={`text-sm text-${skill.color}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 0.1}s`,
                          boxShadow: "0 0 10px rgba(0, 200, 255, 0.5)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
