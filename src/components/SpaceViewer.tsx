import { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import { Button } from "./ui/button";
import { Plus, Minus, Maximize2, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Annotation {
  id: string;
  x: number;
  y: number;
  label: string;
  type: string;
}

interface SpaceViewerProps {
  imageUrl: string;
  imageName: string;
  annotations?: Annotation[];
  onAnnotationsChange?: (annotations: Annotation[]) => void;
}

export const SpaceViewer = ({ 
  imageUrl, 
  imageName,
  annotations: externalAnnotations = [],
  onAnnotationsChange
}: SpaceViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<OpenSeadragon.Viewer | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>(externalAnnotations);
  const [isAnnotating, setIsAnnotating] = useState(false);

  // Sync external annotations
  useEffect(() => {
    setAnnotations(externalAnnotations);
  }, [externalAnnotations]);

  useEffect(() => {
    if (!viewerRef.current) return;

    const osdViewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
      tileSources: {
        type: "image",
        url: imageUrl,
      },
      showNavigationControl: false,
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomLevel: 1,
      visibilityRatio: 1,
      zoomPerScroll: 1.2,
    });

    setViewer(osdViewer);

    return () => {
      osdViewer.destroy();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!viewer) return;

    const handleClick = (event: any) => {
      if (!isAnnotating) return;

      const viewportPoint = viewer.viewport.pointFromPixel(event.position);
      const imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);

      const label = prompt("Enter feature label (e.g., 'Crater', 'Dust Storm', 'Galaxy'):");
      if (!label) return;

      const type = prompt("Enter feature type (e.g., 'crater', 'storm', 'galaxy'):");
      if (!type) return;

      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        x: imagePoint.x,
        y: imagePoint.y,
        label,
        type,
      };

      const updatedAnnotations = [...annotations, newAnnotation];
      setAnnotations(updatedAnnotations);
      onAnnotationsChange?.(updatedAnnotations);
      toast.success(`Added annotation: ${label}`);
    };

    viewer.addHandler("canvas-click", handleClick);

    return () => {
      viewer.removeHandler("canvas-click", handleClick);
    };
  }, [viewer, isAnnotating]);

  const handleZoomIn = () => {
    if (viewer) {
      viewer.viewport.zoomBy(1.5);
      viewer.viewport.applyConstraints();
    }
  };

  const handleZoomOut = () => {
    if (viewer) {
      viewer.viewport.zoomBy(0.7);
      viewer.viewport.applyConstraints();
    }
  };

  const handleResetView = () => {
    if (viewer) {
      viewer.viewport.goHome();
    }
  };

  const toggleAnnotationMode = () => {
    setIsAnnotating(!isAnnotating);
    toast.info(isAnnotating ? "Annotation mode disabled" : "Annotation mode enabled - click to add markers");
  };

  return (
    <div className="relative w-full h-[calc(100vh-200px)] rounded-lg overflow-hidden border border-border cosmic-glow">
      <div ref={viewerRef} className="w-full h-full bg-space-deep" />
      
      {/* Annotation markers overlay */}
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="absolute pointer-events-none"
          style={{
            left: `${(annotation.x / 1920) * 100}%`,
            top: `${(annotation.y / 1920) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <MapPin className="w-6 h-6 text-accent drop-shadow-lg star-shimmer" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs border border-accent/50">
              {annotation.label}
            </div>
          </div>
        </div>
      ))}

      {/* Control panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          size="icon"
          className="cosmic-glow bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="icon"
          className="cosmic-glow bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleResetView}
          size="icon"
          className="cosmic-glow bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={toggleAnnotationMode}
          size="icon"
          variant={isAnnotating ? "default" : "outline"}
          className="cosmic-glow bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </div>

      {/* Annotation list */}
      {annotations.length > 0 && (
        <div className="absolute bottom-4 left-4 max-w-sm bg-card/90 backdrop-blur-sm rounded-lg border border-border p-4 cosmic-glow max-h-48 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2 text-primary">Annotations ({annotations.length})</h3>
          <div className="space-y-2">
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className="flex items-center gap-2 text-xs bg-muted/50 rounded px-2 py-1"
              >
                <MapPin className="w-3 h-3 text-accent flex-shrink-0" />
                <div>
                  <div className="font-medium">{annotation.label}</div>
                  <div className="text-muted-foreground">{annotation.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg border border-border px-4 py-2 cosmic-glow">
        <p className="text-sm font-medium">{imageName}</p>
        <p className="text-xs text-muted-foreground">Use scroll to zoom, drag to pan</p>
      </div>
    </div>
  );
};
