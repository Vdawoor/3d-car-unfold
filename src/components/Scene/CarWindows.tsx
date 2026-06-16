import { useMemo } from 'react';
import * as THREE from 'three';

export function CarWindows() {
  // Automotive glass — dark tinted with partial transparency (GT Line)
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#334455',
        metalness: 0.1,
        roughness: 0,
        transmission: 0.6,
        transparent: true,
        opacity: 0.5,
        thickness: 0.5,
      }),
    []
  );

  // Black border trim around all windows
  const trimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0a0a',
        metalness: 0.3,
        roughness: 0.4,
      }),
    []
  );

  return (
    <group>
      {/* Windshield — steep rake angle matching sedan profile */}
      <mesh position={[0, 1.02, 0.68]} rotation={[-0.55, 0, 0]} material={glassMaterial}>
        <planeGeometry args={[1.28, 0.62]} />
      </mesh>
      {/* Windshield black border */}
      <mesh position={[0, 1.02, 0.67]} rotation={[-0.55, 0, 0]} material={trimMaterial}>
        <planeGeometry args={[1.34, 0.67]} />
      </mesh>

      {/* Rear window — angled to match C-pillar slope */}
      <mesh position={[0, 1.05, -0.95]} rotation={[0.5, 0, 0]} material={glassMaterial}>
        <planeGeometry args={[1.15, 0.48]} />
      </mesh>
      {/* Rear window black border */}
      <mesh position={[0, 1.05, -0.96]} rotation={[0.5, 0, 0]} material={trimMaterial}>
        <planeGeometry args={[1.2, 0.53]} />
      </mesh>

      {/* Left side windows — front and rear separated by B-pillar */}
      {/* Front left window */}
      <mesh position={[0.71, 1.02, 0.3]} rotation={[0, Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[0.6, 0.4]} />
      </mesh>
      {/* Rear left window */}
      <mesh position={[0.71, 1.0, -0.35]} rotation={[0, Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[0.55, 0.38]} />
      </mesh>
      {/* Quarter glass (small triangular area near C-pillar) */}
      <mesh position={[0.7, 1.0, -0.7]} rotation={[0, Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[0.2, 0.3]} />
      </mesh>

      {/* Right side windows */}
      {/* Front right window */}
      <mesh position={[-0.71, 1.02, 0.3]} rotation={[0, -Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[0.6, 0.4]} />
      </mesh>
      {/* Rear right window */}
      <mesh position={[-0.71, 1.0, -0.35]} rotation={[0, -Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[0.55, 0.38]} />
      </mesh>
      {/* Quarter glass */}
      <mesh position={[-0.7, 1.0, -0.7]} rotation={[0, -Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[0.2, 0.3]} />
      </mesh>
    </group>
  );
}
