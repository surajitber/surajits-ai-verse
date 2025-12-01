import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Play, X, Code2, Eye, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: typeof Eye;
  color: string;
  tags: string[];
  colabLink?: string;
  githubLink?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: "openpose",
    title: "OpenPose Behavior Detection",
    category: "Computer Vision",
    description: "Real-time human pose estimation and action detection using Body-25 keypoint tracking.",
    longDescription: "A comprehensive system that detects human poses and identifies behaviors like fighting, running, and suspicious activities using OpenPose's Body-25 model with 25 keypoint tracking.",
    icon: Eye,
    color: "neon-blue",
    tags: ["OpenPose", "Python", "OpenCV", "Real-time"],
    colabLink: "#",
    githubLink: "#",
    features: [
      "Body-25 Keypoint tracking",
      "Action detection (fighting, running, gun-holding)",
      "Real-time video processing",
      "Multi-person tracking",
    ],
  },
  {
    id: "image-processing",
    title: "Image Processing Toolkit",
    category: "Image Processing",
    description: "Collection of image processing algorithms including filters, edge detection, and histogram operations.",
    longDescription: "A comprehensive toolkit featuring various image processing techniques from basic filters to advanced edge detection algorithms, all implemented from scratch.",
    icon: Code2,
    color: "neon-purple",
    tags: ["Python", "NumPy", "OpenCV", "Filters"],
    colabLink: "#",
    githubLink: "#",
    features: [
      "Median filter implementation",
      "Center pixel calculations",
      "Histogram equalization",
      "Edge detection (Sobel, Canny)",
    ],
  },
  {
    id: "ml-models",
    title: "Machine Learning Models",
    category: "Machine Learning",
    description: "Various ML models for classification and regression tasks with detailed training visualizations.",
    longDescription: "A collection of machine learning models including neural networks, decision trees, and ensemble methods, with comprehensive training metrics and visualizations.",
    icon: Brain,
    color: "neon-aqua",
    tags: ["TensorFlow", "PyTorch", "Scikit-learn", "ML"],
    colabLink: "#",
    githubLink: "#",
    features: [
      "Classification models",
      "Regression analysis",
      "Training visualizations",
      "Model comparison metrics",
    ],
  },
  {
    id: "emotion-detection",
    title: "Emotion Detection AI",
    category: "Deep Learning",
    description: "Real-time facial emotion detection using deep learning with webcam integration.",
    longDescription: "An AI system that detects and classifies human emotions from facial expressions in real-time using convolutional neural networks.",
    icon: Sparkles,
    color: "neon-pink",
    tags: ["CNN", "TensorFlow", "Real-time", "Webcam"],
    colabLink: "#",
    githubLink: "#",
    features: [
      "Real-time webcam detection",
      "7 emotion categories",
      "Pre-trained model included",
      "Easy to use interface",
    ],
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
      id="projects"
      className="relative py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
            AI Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring the intersection of artificial intelligence and computer vision
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua mx-auto rounded-full mt-4" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative cursor-pointer transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="glass rounded-2xl p-6 h-full border border-border/50 transition-all duration-500 hover:border-neon-blue/50 card-3d">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-${project.color}/5 blur-xl`} />
                
                <div className="relative z-10">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${project.color}/20 text-${project.color}`}>
                      {project.category}
                    </span>
                    <project.icon className={`w-6 h-6 text-${project.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View button */}
                  <div className="flex items-center gap-2 text-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4" />
                    <span>View Project</span>
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${project.color}/20 to-transparent rounded-tr-2xl`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-strong border-neon-blue/30 max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <selectedProject.icon className={`w-8 h-8 text-${selectedProject.color}`} />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${selectedProject.color}/20 text-${selectedProject.color}`}>
                    {selectedProject.category}
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-foreground/80">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3 text-neon-aqua">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.colabLink && (
                    <Button
                      className="flex-1 bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue hover:text-background"
                      asChild
                    >
                      <a href={selectedProject.colabLink} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 mr-2" />
                        Run on Colab
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubLink && (
                    <Button
                      variant="outline"
                      className="flex-1 border-border hover:border-neon-purple hover:text-neon-purple"
                      asChild
                    >
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
