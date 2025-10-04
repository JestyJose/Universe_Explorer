import { Button } from "./ui/button";
import { Telescope, Github } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <Telescope className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cosmic Explorer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              size="sm"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button 
              variant={isActive("/categories") ? "default" : "ghost"} 
              size="sm"
              onClick={() => navigate("/categories")}
            >
              Explore
            </Button>
            <Button 
              variant={isActive("/datasets") ? "default" : "ghost"} 
              size="sm"
              onClick={() => navigate("/datasets")}
            >
              Datasets
            </Button>
            <Button 
              variant={isActive("/explorer") ? "default" : "ghost"} 
              size="sm"
              onClick={() => navigate("/explorer")}
            >
              Advanced
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
