import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Satellite, Globe } from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  description: string;
  organization: string;
  category: "earth" | "planetary";
  dataUrl: string;
  status: "available" | "coming-soon";
}

const Datasets = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "earth" | "planetary">("all");

  const datasets: Dataset[] = [
    // Earth Observation Datasets
    {
      id: "modis",
      name: "MODIS",
      description: "Moderate Resolution Imaging Spectroradiometer - Daily global imagery including land surface temperature, vegetation indices, and aerosol concentrations",
      organization: "NASA",
      category: "earth",
      dataUrl: "https://modis.gsfc.nasa.gov/data/",
      status: "available",
    },
    {
      id: "landsat",
      name: "Landsat",
      description: "High-resolution imagery of Earth's surface for land use and land cover analysis",
      organization: "NASA/USGS",
      category: "earth",
      dataUrl: "https://landsat.gsfc.nasa.gov/data/",
      status: "available",
    },
    {
      id: "viirs",
      name: "VIIRS",
      description: "Visible Infrared Imaging Radiometer Suite - Global imagery including nighttime lights and fire detection",
      organization: "NASA/NOAA",
      category: "earth",
      dataUrl: "https://www.earthdata.nasa.gov/sensors/viirs",
      status: "available",
    },
    {
      id: "aster",
      name: "ASTER",
      description: "Advanced Spaceborne Thermal Emission and Reflection Radiometer - High-resolution thermal infrared and visible imagery",
      organization: "NASA/METI",
      category: "earth",
      dataUrl: "https://asterweb.jpl.nasa.gov/data.asp",
      status: "available",
    },
    {
      id: "sentinel-2",
      name: "Sentinel-2",
      description: "High-resolution optical imagery for land monitoring from the European Space Agency",
      organization: "ESA",
      category: "earth",
      dataUrl: "https://sentinel.esa.int/web/sentinel/missions/sentinel-2",
      status: "available",
    },
    // Planetary and Space Observation Datasets
    {
      id: "hubble",
      name: "Hubble Space Telescope",
      description: "High-resolution images of distant galaxies, nebulae, and cosmic phenomena",
      organization: "NASA/ESA",
      category: "planetary",
      dataUrl: "https://hubblesite.org/",
      status: "available",
    },
    {
      id: "mars-mro",
      name: "Mars Reconnaissance Orbiter",
      description: "Detailed images and data of Mars' surface and atmosphere",
      organization: "NASA",
      category: "planetary",
      dataUrl: "https://mars.nasa.gov/mro/",
      status: "available",
    },
    {
      id: "lunar-lro",
      name: "Lunar Reconnaissance Orbiter",
      description: "High-resolution imagery of the Moon's surface",
      organization: "NASA",
      category: "planetary",
      dataUrl: "https://lunar.gsfc.nasa.gov/",
      status: "available",
    },
    {
      id: "juno",
      name: "Juno (Jupiter Orbiter)",
      description: "Data and images of Jupiter's atmosphere and magnetic field",
      organization: "NASA",
      category: "planetary",
      dataUrl: "https://www.missionjuno.swri.edu/",
      status: "available",
    },
    {
      id: "cassini",
      name: "Cassini (Saturn Orbiter)",
      description: "Detailed images and data of Saturn and its moons",
      organization: "NASA/ESA/ASI",
      category: "planetary",
      dataUrl: "https://solarsystem.nasa.gov/missions/cassini/",
      status: "available",
    },
  ];

  const filteredDatasets = datasets.filter(
    (dataset) => selectedCategory === "all" || dataset.category === selectedCategory
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              NASA Space Datasets
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore comprehensive space and Earth observation datasets from NASA and partner organizations
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setSelectedCategory(value as any)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Datasets</TabsTrigger>
              <TabsTrigger value="earth">
                <Globe className="w-4 h-4 mr-2" />
                Earth
              </TabsTrigger>
              <TabsTrigger value="planetary">
                <Satellite className="w-4 h-4 mr-2" />
                Planetary
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Dataset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasets.map((dataset) => (
              <Card
                key={dataset.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all cosmic-glow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {dataset.category === "earth" ? (
                      <Globe className="w-5 h-5 text-primary" />
                    ) : (
                      <Satellite className="w-5 h-5 text-secondary" />
                    )}
                    <h3 className="font-semibold text-lg">{dataset.name}</h3>
                  </div>
                  <Badge variant={dataset.status === "available" ? "default" : "secondary"}>
                    {dataset.status === "available" ? "Available" : "Coming Soon"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {dataset.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{dataset.organization}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cosmic-glow"
                    onClick={() => window.open(dataset.dataUrl, "_blank")}
                    disabled={dataset.status !== "available"}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explore
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Data Access Portals Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Data Access Portals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border cosmic-glow">
                <h3 className="font-semibold text-lg mb-2">NASA Earthdata Search</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive portal for accessing NASA's Earth science data collections
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full cosmic-glow"
                  onClick={() => window.open("https://search.earthdata.nasa.gov/", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Portal
                </Button>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border cosmic-glow">
                <h3 className="font-semibold text-lg mb-2">NASA Open Data Portal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Metadata repository for science, space exploration, and aeronautics datasets
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full cosmic-glow"
                  onClick={() => window.open("https://data.nasa.gov/", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Portal
                </Button>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border cosmic-glow">
                <h3 className="font-semibold text-lg mb-2">NASA SVS</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scientific Visualization Studio datasets for visualizations and animations
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full cosmic-glow"
                  onClick={() => window.open("https://svs.gsfc.nasa.gov/", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Portal
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Datasets;
