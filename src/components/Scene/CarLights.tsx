import { useMemo } from 'react';
import * as THREE from 'three';

export function CarLights() {
  // Headlight material — emissive makes it glow slightly even without direct lighting
  const headlightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffcc',
        emissiveIntensity: 0.3,
        metalness: 0.3,
        roughness: 0.1,
      }),
    []
  );

  // Taillight material — red color with red self-illumination
  const taillightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#cc0000',
        emissive: '#cc0000',
        emissiveIntensity: 0.4,
        metalness: 0.3,
        roughness: 0.2,
      }),
    []
  );

  // DRL (Daytime Running Light) material — bright white glow for the accent strips
  const drlMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 0.5,
        metalness: 0.2,
        roughness: 0.1,
      }),
    []
  );

  return (
    <group>
      {/* Left headlight — positioned at front-right of car (positive X & Z) */}
      <mesh position={[0.55, 0.52, 2.03]} material={headlightMaterial}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
      </mesh>
      {/* Right headlight */}
      <mesh position={[-0.55, 0.52, 2.03]} material={headlightMaterial}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
      </mesh>

      {/* DRL strips — thin glowing bars below the main headlights */}
      <mesh position={[0.65, 0.35, 2.06]} material={drlMaterial}>
        <boxGeometry args={[0.15, 0.03, 0.03]} />
      </mesh>
      <mesh position={[-0.65, 0.35, 2.06]} material={drlMaterial}>
        <boxGeometry args={[0.15, 0.03, 0.03]} />
      </mesh>

      {/* Left taillight — at rear of car (negative Z) */}
      <mesh position={[0.6, 0.55, -2.03]} material={taillightMaterial}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
      </mesh>
      {/* Right taillight */}
      <mesh position={[-0.6, 0.55, -2.03]} material={taillightMaterial}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
      </mesh>

      {/* LED light bar connecting the two taillights (modern VW design cue) */}
      <mesh position={[0, 0.55, -2.04]}>
        <boxGeometry args={[0.6, 0.03, 0.03]} />
        <meshStandardMaterial color="#aa0000" emissive="#aa0000" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}
