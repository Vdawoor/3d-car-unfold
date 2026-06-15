import { useMemo } from 'react';
import * as THREE from 'three';

export function CarWindows() {
  // MeshPhysicalMaterial allows transmission (light passes through) for realistic glass
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#87ceeb',
        metalness: 0.1,
        roughness: 0,
        // transmission: fraction of light that passes through (0=opaque, 1=fully transparent)
        transmission: 0.7,
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  return (
    <group>
      {/* Windshield — tilted backward at -0.5 radians to match a real car's rake angle */}
      <mesh position={[0, 1.0, 0.75]} rotation={[-0.5, 0, 0]} material={glassMaterial}>
        <planeGeometry args={[1.3, 0.6]} />
      </mesh>

      {/* Rear window — tilted forward at 0.45 radians */}
      <mesh position={[0, 1.0, -1.0]} rotation={[0.45, 0, 0]} material={glassMaterial}>
        <planeGeometry args={[1.2, 0.5]} />
      </mesh>

      {/* Left side windows — rotated 90 degrees to face outward */}
      <mesh position={[0.73, 1.0, 0.1]} rotation={[0, Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[1.4, 0.42]} />
      </mesh>

      {/* Right side windows — rotated -90 degrees to face the opposite direction */}
      <mesh position={[-0.73, 1.0, 0.1]} rotation={[0, -Math.PI / 2, 0]} material={glassMaterial}>
        <planeGeometry args={[1.4, 0.42]} />
      </mesh>
    </group>
  );
}
