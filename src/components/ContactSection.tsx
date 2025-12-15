import { useState, useRef, useEffect } from "react";
import { Mail, Github, Linkedin, Send, Bot, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error } = await supabase.functions.invoke("contact", {
        body: formData,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
      color: "hover:text-neon-blue hover:border-neon-blue",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "hover:text-neon-aqua hover:border-neon-aqua",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:surajit@example.com",
      color: "hover:text-neon-purple hover:border-neon-purple",
    },
    {
      name: "Google Colab",
      icon: ExternalLink,
      href: "https://colab.research.google.com",
      color: "hover:text-neon-pink hover:border-neon-pink",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's build something amazing together!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua mx-auto rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 neon-border">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-muted/50 border-border focus:border-neon-blue focus:ring-neon-blue/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-muted/50 border-border focus:border-neon-blue focus:ring-neon-blue/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="bg-muted/50 border-border focus:border-neon-blue focus:ring-neon-blue/20 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-aqua text-background font-display font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,200,255,0.5)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right side - Social & Robot */}
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Animated Robot */}
            <div className="relative mb-8">
              <div className="w-40 h-40 relative animate-floating">
                {/* Robot head */}
                <div className="absolute inset-0 glass rounded-3xl neon-border-aqua flex items-center justify-center">
                  <Bot className="w-20 h-20 text-neon-aqua" />
                </div>
                {/* Antenna */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-8 bg-neon-blue" />
                  <div className="w-3 h-3 rounded-full bg-neon-blue pulse-glow -mt-1 -ml-1" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-neon-aqua/20 blur-2xl rounded-full" />
              </div>
              
              {/* Speech bubble */}
              <div className="absolute -right-4 top-0 glass px-4 py-2 rounded-xl text-sm animate-pulse">
                <span className="text-neon-blue">Let's connect!</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h3 className="font-display text-xl font-semibold mb-6 text-neon-purple">
                Connect With Me
              </h3>
              <div className="flex gap-4 justify-center">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-4 rounded-xl border border-border transition-all duration-300 ${link.color} hover:scale-110 ${
                      isVisible ? "animate-scale-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    title={link.name}
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-8 text-center text-muted-foreground italic">
              "AI + Creativity = My Playground."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
