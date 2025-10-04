import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLeft, ZoomIn, Info, Globe } from "lucide-react";
import { solarSystemData } from "@/data/solarSystemData";
import { SpaceViewer } from "@/components/SpaceViewer";

export default function PlanetView() {
  const { planetId } = useParams();
  const navigate = useNavigate();
  const [showSurfaceView, setShowSurfaceView] = useState(false);

  const planet = solarSystemData.find(p => p.id === planetId);

  if (!planet) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p>Planet not found</p>
            <Button onClick={() => navigate("/solar-system")}>Back to Solar System</Button>
          </div>
        </main>
      </>
    );
  }

  if (showSurfaceView && planet.surfaceImageUrl) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setShowSurfaceView(false)}
              className="mb-4 cosmic-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {planet.name}
            </Button>
            <SpaceViewer imageUrl={planet.surfaceImageUrl} imageName={`${planet.name} Surface`} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Explore", path: "/categories" },
              { label: "Solar System", path: "/solar-system" },
              { label: planet.name, path: `/planet/${planetId}` }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero image */}
              <Card className="overflow-hidden cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {planet.name}
                  </h1>
                  <p className="text-muted-foreground mb-4">{planet.description}</p>
                  <div className="flex gap-3">
                    {planet.surfaceImageUrl && (
                      <Button
                        onClick={() => setShowSurfaceView(true)}
                        className="cosmic-glow bg-primary hover:bg-primary-glow"
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        Explore Surface
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Planet Stats */}
              <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Planet Statistics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Diameter</p>
                    <p className="font-semibold">{planet.diameter.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distance from Sun</p>
                    <p className="font-semibold">{planet.distanceFromSun} million km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Orbital Period</p>
                    <p className="font-semibold">{planet.orbitalPeriod} Earth days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mass</p>
                    <p className="font-semibold">{planet.mass}</p>
                  </div>
                </div>
              </Card>

              {/* Moons */}
              {planet.moons.length > 0 && (
                <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Moons ({planet.moons.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planet.moons.map((moon) => (
                      <div
                        key={moon.id}
                        className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary transition-all cursor-pointer group"
                        onClick={() => navigate(`/moon/${planetId}/${moon.id}`)}
                      >
                        <div className="flex gap-3">
                          <img
                            src={moon.image}
                            alt={moon.name}
                            className="w-16 h-16 object-cover rounded group-hover:scale-110 transition-transform"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{moon.name}</h3>
                            <p className="text-xs text-muted-foreground mb-1">
                              {moon.diameter} km diameter
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {moon.orbitalPeriod} day orbit
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Fun Facts</h2>
                <ul className="space-y-3">
                  {planet.funFacts.map((fact, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
