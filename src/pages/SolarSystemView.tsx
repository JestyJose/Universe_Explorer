import { Navbar } from "@/components/Navbar";
import { SolarSystem } from "@/components/SolarSystem";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SolarSystemView() {
  const navigate = useNavigate();

  const handlePlanetClick = (planetId: string) => {
    navigate(`/planet/${planetId}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Explore", path: "/categories" },
              { label: "Solar System", path: "/solar-system" }
            ]}
          />

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              The Solar System
            </h1>
            <p className="text-lg text-muted-foreground">
              Click on any planet to explore its moons and surface imagery
            </p>
          </div>

          <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Sun className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Our Solar System</h3>
                <p className="text-sm text-muted-foreground">
                  The Solar System consists of the Sun and everything that orbits it, including 8 planets, 
                  their moons, asteroids, comets, and other small objects. The planets orbit the Sun in 
                  elliptical paths, held in place by gravity. Drag to rotate the view and scroll to zoom.
                </p>
              </div>
            </div>
          </Card>

          <SolarSystem onPlanetClick={handlePlanetClick} />

          <Card className="mt-6 p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm">
            <h3 className="font-semibold text-lg mb-3">Navigation Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Click a planet</strong> to view its details and moons</li>
              <li>• <strong>Drag</strong> to rotate the solar system view</li>
              <li>• <strong>Scroll</strong> to zoom in and out</li>
              <li>• <strong>Right-click and drag</strong> to pan the view</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
