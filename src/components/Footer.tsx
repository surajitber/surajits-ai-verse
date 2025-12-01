import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-8 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="font-display text-xl font-bold gradient-text">
            Surajit Bera
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground text-center">
            "I make computer vision simple and lovable."
          </p>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" /> © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
