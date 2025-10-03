import { Button } from "./ui/button";
import { Telescope, Github } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Telescope className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Space Explorer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Gallery
            </Button>
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="outline" size="sm" className="cosmic-glow">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
