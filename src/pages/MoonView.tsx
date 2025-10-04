import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowLeft, ZoomIn, Info } from "lucide-react";
import { solarSystemData } from "@/data/solarSystemData";
import { SpaceViewer } from "@/components/SpaceViewer";

export default function MoonView() {
  const { planetId, moonId } = useParams();
  const navigate = useNavigate();
  const [showSurfaceView, setShowSurfaceView] = useState(false);

  const planet = solarSystemData.find(p => p.id === planetId);
  const moon = planet?.moons.find(m => m.id === moonId);

  if (!planet || !moon) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p>Moon not found</p>
            <Button onClick={() => navigate("/solar-system")}>Back to Solar System</Button>
          </div>
        </main>
      </>
    );
  }

  if (showSurfaceView && moon.surfaceImageUrl) {
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
              Back to {moon.name}
            </Button>
            <SpaceViewer imageUrl={moon.surfaceImageUrl} imageName={`${moon.name} Surface`} />
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
              { label: planet.name, path: `/planet/${planetId}` },
              { label: moon.name, path: `/moon/${planetId}/${moonId}` }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero image */}
              <Card className="overflow-hidden cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={moon.image}
                    alt={moon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {moon.name}
                  </h1>
                  <p className="text-sm text-muted-foreground mb-1">Moon of {planet.name}</p>
                  <p className="text-muted-foreground mb-4">{moon.description}</p>
                  <div className="flex gap-3">
                    {moon.surfaceImageUrl && (
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

              {/* Moon Stats */}
              <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Moon Statistics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Diameter</p>
                    <p className="font-semibold">{moon.diameter.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Orbital Period</p>
                    <p className="font-semibold">{moon.orbitalPeriod} Earth days</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4">About {moon.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{moon.description}</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Parent Planet:</span>
                    <span className="ml-2 font-medium">{planet.name}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Discovery:</span>
                    <span className="ml-2 font-medium">Historical observation</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
