import { useMemo } from 'react';
import * as THREE from 'three';

export function CarDetails() {
  // Highly reflective chrome material for handles, trim, and accents
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#cccccc',
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  // Mirror housing material — matches body color (body-colored ORVMs)
  const mirrorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8e8e8',
        metalness: 0.4,
        roughness: 0.3,
      }),
    []
  );

  return (
    <group>
      {/* Left side mirror assembly — housing + mirror glass */}
      <group position={[0.82, 0.75, 0.6]}>
        {/* Mirror housing */}
        <mesh material={mirrorMaterial}>
          <boxGeometry args={[0.12, 0.08, 0.15]} />
        </mesh>
        {/* Mirror glass surface (dark, offset outward on X axis) */}
        <mesh position={[0.07, 0, 0]}>
          <boxGeometry args={[0.02, 0.06, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
      {/* Right side mirror assembly */}
      <group position={[-0.82, 0.75, 0.6]}>
        <mesh material={mirrorMaterial}>
          <boxGeometry args={[0.12, 0.08, 0.15]} />
        </mesh>
        <mesh position={[-0.07, 0, 0]}>
          <boxGeometry args={[0.02, 0.06, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      {/* Door gap lines (left side) — thin vertical strips indicating door edges */}
      <mesh position={[0.86, 0.5, 0.3]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      <mesh position={[0.86, 0.5, -0.4]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        <meshStandardMaterial color="#999999" />
      </mesh>

      {/* Door gap lines (right side) */}
      <mesh position={[-0.86, 0.5, 0.3]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      <mesh position={[-0.86, 0.5, -0.4]}>
        <boxGeometry args={[0.01, 0.35, 0.01]} />
        <meshStandardMaterial color="#999999" />
      </mesh>

      {/* Door handles — chrome bars on each door (4 total: front/rear on each side) */}
      <mesh position={[0.86, 0.6, 0.0]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.03, 0.12]} />
      </mesh>
      <mesh position={[0.86, 0.6, -0.7]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.03, 0.12]} />
      </mesh>
      <mesh position={[-0.86, 0.6, 0.0]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.03, 0.12]} />
      </mesh>
      <mesh position={[-0.86, 0.6, -0.7]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.03, 0.12]} />
      </mesh>

      {/* Chrome window trim — thin shiny strips running along the roofline on each side */}
      <mesh position={[0.735, 1.22, 0.1]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.02, 1.5]} />
      </mesh>
      <mesh position={[-0.735, 1.22, 0.1]} material={chromeMaterial}>
        <boxGeometry args={[0.02, 0.02, 1.5]} />
      </mesh>

      {/* VW logo (front) — blue circle on the nose of the car */}
      <mesh position={[0, 0.55, 2.09]}>
        <circleGeometry args={[0.06, 24]} />
        <meshStandardMaterial color="#0066cc" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* VW logo (rear) — rotated 180 degrees to face backward */}
      <mesh position={[0, 0.65, -2.07]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.05, 24]} />
        <meshStandardMaterial color="#0066cc" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Antenna (shark fin) — small cone on the roof toward the rear */}
      <mesh position={[0, 1.33, -0.5]}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}
