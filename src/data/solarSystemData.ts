export interface Moon {
  id: string;
  name: string;
  diameter: number;
  orbitalPeriod: number;
  image: string;
  description: string;
  surfaceImageUrl?: string;
}

export interface Planet {
  id: string;
  name: string;
  diameter: number;
  distanceFromSun: number;
  orbitalPeriod: number;
  mass: string;
  image: string;
  description: string;
  color: string;
  moons: Moon[];
  funFacts: string[];
  surfaceImageUrl?: string;
}

export const solarSystemData: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    mass: "3.285 × 10^23 kg",
    image: "https://images-assets.nasa.gov/image/PIA15162/PIA15162~thumb.jpg",
    description: "The smallest planet in our solar system and closest to the Sun",
    color: "#8C7853",
    moons: [],
    funFacts: [
      "Mercury has no atmosphere to trap heat",
      "A year on Mercury is just 88 Earth days",
      "Mercury is only slightly larger than Earth's Moon",
      "It has the most cratered surface in the solar system"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA15162/PIA15162~orig.jpg"
  },
  {
    id: "venus",
    name: "Venus",
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    mass: "4.867 × 10^24 kg",
    image: "https://images-assets.nasa.gov/image/PIA00271/PIA00271~thumb.jpg",
    description: "The hottest planet in our solar system with thick toxic atmosphere",
    color: "#FFC649",
    moons: [],
    funFacts: [
      "Venus rotates backwards compared to other planets",
      "A day on Venus is longer than its year",
      "Venus is the brightest natural object in the night sky after the Moon",
      "Surface temperature is hot enough to melt lead"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg"
  },
  {
    id: "earth",
    name: "Earth",
    diameter: 12742,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    mass: "5.972 × 10^24 kg",
    image: "https://images-assets.nasa.gov/image/PIA00342/PIA00342~thumb.jpg",
    description: "Our home planet, the only known place with life in the universe",
    color: "#4A90E2",
    moons: [
      {
        id: "moon",
        name: "The Moon",
        diameter: 3474,
        orbitalPeriod: 27.3,
        image: "https://images-assets.nasa.gov/image/PIA00405/PIA00405~thumb.jpg",
        description: "Earth's only natural satellite",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg"
      }
    ],
    funFacts: [
      "Earth is the only planet not named after a god",
      "70% of Earth's surface is covered in water",
      "Earth's atmosphere is 78% nitrogen and 21% oxygen",
      "The Earth's core is as hot as the surface of the Sun"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA00342/PIA00342~orig.jpg"
  },
  {
    id: "mars",
    name: "Mars",
    diameter: 6779,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    mass: "6.39 × 10^23 kg",
    image: "https://images-assets.nasa.gov/image/PIA16800/PIA16800~thumb.jpg",
    description: "The Red Planet, named after the Roman god of war",
    color: "#CD5C5C",
    moons: [
      {
        id: "phobos",
        name: "Phobos",
        diameter: 22,
        orbitalPeriod: 0.3,
        image: "https://images-assets.nasa.gov/image/PIA10368/PIA10368~thumb.jpg",
        description: "The larger and closer of Mars' two moons",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA10368/PIA10368~orig.jpg"
      },
      {
        id: "deimos",
        name: "Deimos",
        diameter: 12,
        orbitalPeriod: 1.3,
        image: "https://images-assets.nasa.gov/image/PIA11826/PIA11826~thumb.jpg",
        description: "The smaller and outer moon of Mars",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA11826/PIA11826~orig.jpg"
      }
    ],
    funFacts: [
      "Mars has the largest volcano in the solar system - Olympus Mons",
      "A day on Mars is 24 hours and 37 minutes",
      "Mars has seasons like Earth",
      "Pieces of Mars have fallen to Earth as meteorites"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA16800/PIA16800~orig.jpg"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    diameter: 139820,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    mass: "1.898 × 10^27 kg",
    image: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~thumb.jpg",
    description: "The largest planet in our solar system, a gas giant",
    color: "#DAA520",
    moons: [
      {
        id: "io",
        name: "Io",
        diameter: 3643,
        orbitalPeriod: 1.8,
        image: "https://images-assets.nasa.gov/image/PIA02309/PIA02309~thumb.jpg",
        description: "The most volcanically active body in the solar system",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA02309/PIA02309~orig.jpg"
      },
      {
        id: "europa",
        name: "Europa",
        diameter: 3122,
        orbitalPeriod: 3.5,
        image: "https://images-assets.nasa.gov/image/PIA19048/PIA19048~thumb.jpg",
        description: "An icy moon with a subsurface ocean",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg"
      },
      {
        id: "ganymede",
        name: "Ganymede",
        diameter: 5268,
        orbitalPeriod: 7.2,
        image: "https://images-assets.nasa.gov/image/PIA00716/PIA00716~thumb.jpg",
        description: "The largest moon in the solar system",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA00716/PIA00716~orig.jpg"
      },
      {
        id: "callisto",
        name: "Callisto",
        diameter: 4821,
        orbitalPeriod: 16.7,
        image: "https://images-assets.nasa.gov/image/PIA03456/PIA03456~thumb.jpg",
        description: "The most heavily cratered object in the solar system",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA03456/PIA03456~orig.jpg"
      }
    ],
    funFacts: [
      "Jupiter has at least 95 known moons",
      "The Great Red Spot is a storm that has raged for at least 400 years",
      "Jupiter's magnetic field is 20,000 times stronger than Earth's",
      "A day on Jupiter is only 10 hours long"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~orig.jpg"
  },
  {
    id: "saturn",
    name: "Saturn",
    diameter: 116460,
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    mass: "5.683 × 10^26 kg",
    image: "https://images-assets.nasa.gov/image/PIA21344/PIA21344~thumb.jpg",
    description: "The ringed planet, a gas giant famous for its spectacular rings",
    color: "#F4E4C1",
    moons: [
      {
        id: "titan",
        name: "Titan",
        diameter: 5150,
        orbitalPeriod: 16,
        image: "https://images-assets.nasa.gov/image/PIA20016/PIA20016~thumb.jpg",
        description: "The only moon with a dense atmosphere",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA20016/PIA20016~orig.jpg"
      },
      {
        id: "enceladus",
        name: "Enceladus",
        diameter: 504,
        orbitalPeriod: 1.4,
        image: "https://images-assets.nasa.gov/image/PIA17202/PIA17202~thumb.jpg",
        description: "An icy moon with geysers of water vapor",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA17202/PIA17202~orig.jpg"
      },
      {
        id: "mimas",
        name: "Mimas",
        diameter: 396,
        orbitalPeriod: 0.9,
        image: "https://images-assets.nasa.gov/image/PIA12570/PIA12570~thumb.jpg",
        description: "Known for its large crater that makes it look like the Death Star",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA12570/PIA12570~orig.jpg"
      }
    ],
    funFacts: [
      "Saturn has at least 146 known moons",
      "Saturn's rings are made of ice and rock",
      "Saturn is the least dense planet - it would float in water",
      "A year on Saturn is 29 Earth years"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA21344/PIA21344~orig.jpg"
  },
  {
    id: "uranus",
    name: "Uranus",
    diameter: 50724,
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    mass: "8.681 × 10^25 kg",
    image: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~thumb.jpg",
    description: "An ice giant that rotates on its side",
    color: "#4FD0E7",
    moons: [
      {
        id: "miranda",
        name: "Miranda",
        diameter: 472,
        orbitalPeriod: 1.4,
        image: "https://images-assets.nasa.gov/image/PIA18185/PIA18185~thumb.jpg",
        description: "A moon with dramatic cliffs and varied terrain",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA18185/PIA18185~orig.jpg"
      },
      {
        id: "ariel",
        name: "Ariel",
        diameter: 1158,
        orbitalPeriod: 2.5,
        image: "https://images-assets.nasa.gov/image/PIA01534/PIA01534~thumb.jpg",
        description: "The brightest moon of Uranus",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA01534/PIA01534~orig.jpg"
      }
    ],
    funFacts: [
      "Uranus rotates on its side at a 98-degree angle",
      "Uranus has at least 27 known moons",
      "A year on Uranus is 84 Earth years",
      "Uranus was the first planet discovered with a telescope"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg"
  },
  {
    id: "neptune",
    name: "Neptune",
    diameter: 49244,
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    mass: "1.024 × 10^26 kg",
    image: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~thumb.jpg",
    description: "The windiest planet in our solar system",
    color: "#4169E1",
    moons: [
      {
        id: "triton",
        name: "Triton",
        diameter: 2707,
        orbitalPeriod: 5.9,
        image: "https://images-assets.nasa.gov/image/PIA00317/PIA00317~thumb.jpg",
        description: "The only large moon with a retrograde orbit",
        surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA00317/PIA00317~orig.jpg"
      }
    ],
    funFacts: [
      "Neptune has the strongest winds in the solar system - up to 2,100 km/h",
      "Neptune has at least 16 known moons",
      "A year on Neptune is 165 Earth years",
      "Neptune was discovered through mathematical predictions"
    ],
    surfaceImageUrl: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg"
  }
];
