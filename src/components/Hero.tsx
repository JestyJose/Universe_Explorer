import { Button } from "./ui/button";
import { Telescope, Rocket, Map } from "lucide-react";
import spaceHeroBg from "@/assets/space-hero-bg.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${spaceHeroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Floating stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-star-white rounded-full star-shimmer"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 cosmic-glow">
          <Telescope className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">Explore the Cosmos</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 nebula-float">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Zoomable Space Explorer
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Navigate gigapixel space imagery from NASA, annotate celestial features, and discover the universe like never before
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="cosmic-glow bg-primary hover:bg-primary-glow text-lg px-8"
            onClick={onGetStarted}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Exploring
          </Button>
          <Button size="lg" variant="outline" className="cosmic-glow text-lg px-8">
            <Map className="w-5 h-5 mr-2" />
            View Gallery
          </Button>
        </div>

        {/* Feature badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Telescope, title: "Gigapixel Imagery", desc: "Ultra high-resolution space data" },
            { icon: Map, title: "Smart Annotations", desc: "Mark & label celestial features" },
            { icon: Rocket, title: "NASA Datasets", desc: "Real space mission imagery" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border cosmic-glow"
            >
              <feature.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
