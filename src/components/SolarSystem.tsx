import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";
import { solarSystemData } from "@/data/solarSystemData";

interface PlanetMeshProps {
  planet: typeof solarSystemData[0];
  onClick: (planetId: string) => void;
}

function PlanetMesh({ planet, onClick }: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  // Scale factors for visualization (not to actual scale)
  const distance = planet.distanceFromSun * 0.02;
  const size = Math.max(planet.diameter * 0.00005, 0.1);

  useFrame(({ clock }) => {
    if (orbitRef.current) {
      const speed = 0.1 / Math.sqrt(planet.distanceFromSun);
      orbitRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[distance, 0, 0]}>
        <Sphere
          ref={meshRef}
          args={[size, 32, 32]}
          onClick={() => onClick(planet.id)}
        >
          <meshStandardMaterial color={planet.color} />
        </Sphere>
        <Text
          position={[0, size + 0.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {planet.name}
        </Text>
      </group>
    </group>
  );
}

interface SolarSystemProps {
  onPlanetClick: (planetId: string) => void;
}

export const SolarSystem = ({ onPlanetClick }: SolarSystemProps) => {
  return (
    <div className="w-full h-[600px] bg-space-deep rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        
        {/* Sun */}
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#FDB813" />
        </Sphere>
        <pointLight position={[0, 0, 0]} intensity={2} distance={50} />

        {/* Planets */}
        {solarSystemData.map((planet) => (
          <PlanetMesh
            key={planet.id}
            planet={planet}
            onClick={onPlanetClick}
          />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};
