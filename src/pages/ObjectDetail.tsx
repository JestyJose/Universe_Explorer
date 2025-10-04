import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, Info, ArrowLeft, Satellite } from "lucide-react";
import { useState } from "react";
import { SpaceViewer } from "@/components/SpaceViewer";

export default function ObjectDetail() {
  const { category, objectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDeepZoom, setShowDeepZoom] = useState(false);

  const item = location.state?.item;

  if (!item) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p>Object not found</p>
            <Button onClick={() => navigate("/categories")}>Back to Categories</Button>
          </div>
        </main>
      </>
    );
  }

  // Simulated related objects
  const relatedObjects = [
    {
      name: `${item.name} - Phobos`,
      type: "moon",
      description: "Natural satellite"
    },
    {
      name: `${item.name} - Deimos`,
      type: "moon",
      description: "Smaller moon"
    }
  ];

  // NASA fun facts (simulated)
  const funFacts = [
    `${item.name} has been studied extensively by NASA missions`,
    `Surface features include unique geological formations`,
    `Scientists continue to make new discoveries about this celestial body`,
    `High-resolution imagery reveals fascinating details`
  ];

  if (showDeepZoom) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setShowDeepZoom(false)}
              className="mb-4 cosmic-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>
            <SpaceViewer imageUrl={item.image} imageName={item.name} />
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
          <Button
            variant="ghost"
            onClick={() => navigate("/categories")}
            className="mb-6 cosmic-glow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero image */}
              <Card className="overflow-hidden cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {item.name}
                  </h1>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowDeepZoom(true)}
                      className="cosmic-glow bg-primary hover:bg-primary-glow"
                    >
                      <ZoomIn className="w-4 h-4 mr-2" />
                      Deep Zoom & Annotate
                    </Button>
                    <Button variant="outline" className="cosmic-glow">
                      <Info className="w-4 h-4 mr-2" />
                      More Info
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Related objects */}
              <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Satellite className="w-5 h-5 text-primary" />
                  Surrounding Objects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedObjects.map((obj, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary transition-all cursor-pointer"
                    >
                      <h3 className="font-medium mb-1">{obj.name}</h3>
                      <p className="text-sm text-muted-foreground">{obj.type} • {obj.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 cosmic-glow border-border bg-card/50 backdrop-blur-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Fun Facts</h2>
                <ul className="space-y-3">
                  {funFacts.map((fact, index) => (
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
