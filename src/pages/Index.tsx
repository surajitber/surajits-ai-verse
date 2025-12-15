import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import PlaygroundSection from "@/components/PlaygroundSection";
import AIChatbot from "@/components/AIChatbot";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update page title and meta
    document.title = "Surajit Bera | AI & Computer Vision Developer";
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particle background */}
      <ParticleField />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <PlaygroundSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot />
      
      {/* Cursor glow effect */}
      <div 
        id="cursor-glow" 
        className="fixed w-64 h-64 pointer-events-none z-0 opacity-30 blur-3xl rounded-full bg-neon-blue/30 transition-transform duration-100"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      
      {/* Script for cursor glow */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('mousemove', (e) => {
              const glow = document.getElementById('cursor-glow');
              if (glow) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
              }
            });
          `,
        }}
      />
    </div>
  );
};

export default Index;
