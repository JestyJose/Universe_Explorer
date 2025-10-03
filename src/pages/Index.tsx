import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ImageGallery } from "@/components/ImageGallery";
import { SpaceViewer } from "@/components/SpaceViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [showExplorer, setShowExplorer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);

  const handleGetStarted = () => {
    setShowExplorer(true);
  };

  const handleSelectImage = (imageUrl: string, imageName: string) => {
    setSelectedImage({ url: imageUrl, name: imageName });
  };

  const handleBack = () => {
    if (selectedImage) {
      setSelectedImage(null);
    } else {
      setShowExplorer(false);
    }
  };

  if (!showExplorer) {
    return (
      <>
        <Navbar />
        <Hero onGetStarted={handleGetStarted} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="cosmic-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {selectedImage ? "Back to Gallery" : "Back to Home"}
            </Button>
          </div>

          {!selectedImage ? (
            <ImageGallery onSelectImage={handleSelectImage} />
          ) : (
            <SpaceViewer imageUrl={selectedImage.url} imageName={selectedImage.name} />
          )}
        </div>
      </main>
    </>
  );
};

export default Index;
