import { useEffect, useRef, useState } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
  type: "experience" | "certificate";
  link?: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    title: "AI/ML Developer",
    organization: "Self-Employed / Freelance",
    period: "2023 - Present",
    description: "Building computer vision applications, pose estimation systems, and machine learning models for various clients and personal projects.",
    skills: ["Python", "TensorFlow", "OpenCV", "OpenPose"],
    type: "experience",
  },
  {
    id: "2",
    title: "Deep Learning Specialization",
    organization: "Coursera - DeepLearning.AI",
    period: "2023",
    description: "Completed comprehensive deep learning course covering neural networks, CNNs, sequence models, and more.",
    skills: ["Neural Networks", "CNN", "RNN", "Deep Learning"],
    type: "certificate",
    link: "#",
  },
  {
    id: "3",
    title: "Computer Vision Researcher",
    organization: "Personal Projects",
    period: "2022 - Present",
    description: "Developing and implementing state-of-the-art computer vision algorithms for real-world applications.",
    skills: ["OpenPose", "Image Processing", "Object Detection"],
    type: "experience",
  },
  {
    id: "4",
    title: "Machine Learning Certificate",
    organization: "Google - Coursera",
    period: "2022",
    description: "Mastered machine learning fundamentals including supervised learning, unsupervised learning, and best practices.",
    skills: ["ML Fundamentals", "Data Analysis", "Model Training"],
    type: "certificate",
    link: "#",
  },
];

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 px-4"
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10h10v1h-10zM10 0v10h1v-10z" fill="currentColor" />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Experience & Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-aqua" />

          {timelineItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
            >
              {/* Timeline node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-4 h-4 rounded-full ${
                  item.type === "certificate" ? "bg-neon-aqua" : "bg-neon-purple"
                } pulse-glow`}>
                  <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20" />
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:pr-8" : "md:pl-8"
              }`}>
                <div className="glass rounded-xl p-6 neon-border hover:scale-[1.02] transition-transform duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {item.type === "certificate" ? (
                        <Award className="w-5 h-5 text-neon-aqua" />
                      ) : (
                        <Calendar className="w-5 h-5 text-neon-purple" />
                      )}
                      <span className={`text-xs font-medium ${
                        item.type === "certificate" ? "text-neon-aqua" : "text-neon-purple"
                      }`}>
                        {item.period}
                      </span>
                    </div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-neon-blue transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.organization}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-foreground/80 mb-4">
                    {item.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
