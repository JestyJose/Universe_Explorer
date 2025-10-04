import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Globe, Orbit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
  items: CategoryItem[];
}

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
}

export default function Categories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: "galaxies",
      name: "Galaxies",
      icon: Sparkles,
      description: "Explore distant galaxies and nebulae captured by Hubble",
      color: "from-purple-500 to-pink-500",
      items: [
        {
          id: "andromeda",
          name: "Andromeda Galaxy",
          image: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001327/GSFC_20171208_Archive_e001327~thumb.jpg",
          description: "The nearest major galaxy to the Milky Way",
          type: "spiral-galaxy"
        },
        {
          id: "whirlpool",
          name: "Whirlpool Galaxy",
          image: "https://images-assets.nasa.gov/image/PIA16695/PIA16695~thumb.jpg",
          description: "A stunning spiral galaxy with prominent arms",
          type: "spiral-galaxy"
        },
        {
          id: "sombrero",
          name: "Sombrero Galaxy",
          image: "https://images-assets.nasa.gov/image/PIA13677/PIA13677~thumb.jpg",
          description: "Distinctive galaxy with a bright nucleus",
          type: "spiral-galaxy"
        }
      ]
    },
    {
      id: "planets",
      name: "Planets",
      icon: Globe,
      description: "Tour our solar system's magnificent worlds",
      color: "from-blue-500 to-cyan-500",
      items: [
        {
          id: "mars",
          name: "Mars",
          image: "https://images-assets.nasa.gov/image/PIA16800/PIA16800~thumb.jpg",
          description: "The Red Planet with vast deserts and ice caps",
          type: "terrestrial-planet"
        },
        {
          id: "jupiter",
          name: "Jupiter",
          image: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~thumb.jpg",
          description: "Giant gas planet with the Great Red Spot",
          type: "gas-giant"
        },
        {
          id: "saturn",
          name: "Saturn",
          image: "https://images-assets.nasa.gov/image/PIA21344/PIA21344~thumb.jpg",
          description: "Ringed beauty of the solar system",
          type: "gas-giant"
        }
      ]
    },
    {
      id: "asteroids",
      name: "Asteroids, Comets & Meteors",
      icon: Orbit,
      description: "Discover the smaller wonders of space",
      color: "from-orange-500 to-red-500",
      items: [
        {
          id: "bennu",
          name: "Asteroid Bennu",
          image: "https://images-assets.nasa.gov/image/PIA22829/PIA22829~thumb.jpg",
          description: "Carbon-rich asteroid visited by OSIRIS-REx",
          type: "asteroid"
        },
        {
          id: "halley",
          name: "Halley's Comet",
          image: "https://images-assets.nasa.gov/image/0201636/0201636~thumb.jpg",
          description: "Famous periodic comet visible from Earth",
          type: "comet"
        },
        {
          id: "vesta",
          name: "Asteroid Vesta",
          image: "https://images-assets.nasa.gov/image/PIA14316/PIA14316~thumb.jpg",
          description: "One of the largest asteroids in our solar system",
          type: "asteroid"
        }
      ]
    }
  ];

  const handleItemClick = (category: string, item: CategoryItem) => {
    navigate(`/object/${category}/${item.id}`, { state: { item, category } });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Zoom animation intro */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Cosmic Explorer
            </h1>
            <p className="text-lg text-muted-foreground">Choose a category to begin your journey</p>
          </div>

          {/* Categories Grid */}
          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={category.id}
                  className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all cosmic-glow cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative p-8 text-center">
                    <category.icon className="w-16 h-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in">
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="mb-6 cosmic-glow"
              >
                ← Back to Categories
              </Button>

              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories
                  .find(c => c.id === selectedCategory)
                  ?.items.map((item, index) => (
                    <Card
                      key={item.id}
                      className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all cosmic-glow cursor-pointer animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleItemClick(selectedCategory, item)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full cosmic-glow"
                        >
                          Explore
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
