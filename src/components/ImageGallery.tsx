import { Card } from "./ui/card";
import { Button } from "./ui/button";
import marsImage from "@/assets/mars-surface.jpg";
import moonImage from "@/assets/moon-surface.jpg";

interface ImageOption {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface ImageGalleryProps {
  onSelectImage: (imageUrl: string, imageName: string) => void;
}

export const ImageGallery = ({ onSelectImage }: ImageGalleryProps) => {
  const images: ImageOption[] = [
    {
      id: "mars",
      name: "Mars Surface",
      description: "High-resolution view of Martian terrain with craters and dust storms",
      url: marsImage,
    },
    {
      id: "moon",
      name: "Lunar Surface",
      description: "Detailed lunar landscape with crater formations",
      url: moonImage,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Select Space Dataset
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all cosmic-glow cursor-pointer"
            onClick={() => onSelectImage(image.url, image.name)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{image.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full cosmic-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectImage(image.url, image.name);
                }}
              >
                Explore
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
