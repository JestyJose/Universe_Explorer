import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SpaceViewer } from "@/components/SpaceViewer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Upload, Info } from "lucide-react";
import { toast } from "sonner";
import marsImage from "@/assets/mars-surface.jpg";
import moonImage from "@/assets/moon-surface.jpg";
import spaceImage from "@/assets/space-hero-bg.jpg";

interface Dataset {
  id: string;
  name: string;
  image: string;
  description: string;
  category: "earth" | "planetary" | "space";
}

const Explorer = () => {
  const datasets: Dataset[] = [
    {
      id: "mars-mro",
      name: "Mars Surface (MRO)",
      image: marsImage,
      description: "High-resolution Mars Reconnaissance Orbiter imagery",
      category: "planetary",
    },
    {
      id: "lunar-lro",
      name: "Moon Surface (LRO)",
      image: moonImage,
      description: "Lunar Reconnaissance Orbiter surface imagery",
      category: "planetary",
    },
    {
      id: "hubble-deep-space",
      name: "Deep Space (Hubble)",
      image: spaceImage,
      description: "Hubble Space Telescope cosmic imagery",
      category: "space",
    },
  ];

  const [selectedDataset, setSelectedDataset] = useState<Dataset>(datasets[0]);
  const [annotations, setAnnotations] = useState<any[]>([]);

  const handleExportAnnotations = () => {
    const dataStr = JSON.stringify(
      {
        dataset: selectedDataset.id,
        annotations,
        exportDate: new Date().toISOString(),
      },
      null,
      2
    );
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `${selectedDataset.id}-annotations-${Date.now()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast.success("Annotations exported successfully");
  };

  const handleImportAnnotations = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (imported.annotations && Array.isArray(imported.annotations)) {
          setAnnotations(imported.annotations);
          toast.success(`Imported ${imported.annotations.length} annotations`);
        } else {
          toast.error("Invalid annotation file format");
        }
      } catch (error) {
        toast.error("Failed to import annotations");
      }
    };
    reader.readAsText(file);
  };

  const handleDatasetChange = (datasetId: string) => {
    const dataset = datasets.find((d) => d.id === datasetId);
    if (dataset) {
      setSelectedDataset(dataset);
      setAnnotations([]);
      toast.info(`Switched to ${dataset.name}`);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Space Explorer
              </h1>
              <p className="text-sm text-muted-foreground">
                Explore high-resolution space imagery with interactive annotations
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Dataset Selector */}
              <Select value={selectedDataset.id} onValueChange={handleDatasetChange}>
                <SelectTrigger className="w-[240px] cosmic-glow">
                  <SelectValue placeholder="Select dataset" />
                </SelectTrigger>
                <SelectContent>
                  {datasets.map((dataset) => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      {dataset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button
                onClick={handleExportAnnotations}
                variant="outline"
                size="sm"
                className="cosmic-glow"
                disabled={annotations.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              {/* Import Button */}
              <Button
                variant="outline"
                size="sm"
                className="cosmic-glow relative"
                onClick={() => document.getElementById("import-annotations")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
                <input
                  id="import-annotations"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportAnnotations}
                />
              </Button>
            </div>
          </div>

          {/* Dataset Info Card */}
          <Card className="mb-6 p-4 bg-card/50 backdrop-blur-sm border-border cosmic-glow">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">{selectedDataset.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedDataset.description}</p>
              </div>
            </div>
          </Card>

          {/* Viewer */}
          <SpaceViewer
            imageUrl={selectedDataset.image}
            imageName={selectedDataset.name}
            annotations={annotations}
            onAnnotationsChange={setAnnotations}
          />

          {/* Instructions */}
          <Card className="mt-6 p-4 bg-card/50 backdrop-blur-sm border-border cosmic-glow">
            <h3 className="font-semibold text-sm mb-2">How to Use</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use mouse wheel to zoom in/out, drag to pan around the image</li>
              <li>• Click the pin icon to enable annotation mode, then click to mark features</li>
              <li>• Export your annotations to save them, import to load previous work</li>
              <li>• Switch datasets using the dropdown to explore different space imagery</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Explorer;
