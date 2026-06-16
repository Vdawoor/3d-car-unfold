import { useMemo } from 'react';
import * as THREE from 'three';

export function CarDetails() {
  // Mirror chrome for handles, window trim, grille accents
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#dddddd',
        metalness: 1,
        roughness: 0.05,
      }),
    []
  );

  // Gloss black for GT Line mirrors and trim
  const glossBlackMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0a0a0a',
        metalness: 0.3,
        roughness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
      }),
    []
  );

  // Dark matte for badges background
  const badgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.4,
        roughness: 0.3,
      }),
    []
  );

  return (
    <group>
      {/* === SIDE MIRRORS (Gloss Black - GT Line) === */}
      {/* Left mirror */}
      <group position={[0.82, 0.78, 0.6]}>
        {/* Mirror housing — sleek angular shape */}
        <mesh material={glossBlackMaterial}>
          <boxGeometry args={[0.14, 0.07, 0.18]} />
        </mesh>
        {/* Mirror glass surface */}
        <mesh position={[0.07, 0, 0]}>
          <boxGeometry args={[0.02, 0.055, 0.12]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.1} />
        </mesh>
        {/* Turn signal indicator strip on mirror */}
        <mesh position={[0.0, -0.035, 0.04]}>
          <boxGeometry args={[0.08, 0.008, 0.06]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.2} />
        </mesh>
      </group>
      {/* Right mirror */}
      <group position={[-0.82, 0.78, 0.6]}>
        <mesh material={glossBlackMaterial}>
          <boxGeometry args={[0.14, 0.07, 0.18]} />
        </mesh>
        <mesh position={[-0.07, 0, 0]}>
          <boxGeometry args={[0.02, 0.055, 0.12]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.1} />
        </mesh>
        <mesh position={[0.0, -0.035, 0.04]}>
          <boxGeometry args={[0.08, 0.008, 0.06]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* === GT FENDER BADGES === */}
      {/* Left fender GT badge — blade-shaped black+chrome accent */}
      <group position={[0.86, 0.62, 0.4]}>
        {/* Black badge background (blade shape approximated with thin box) */}
        <mesh material={badgeMaterial}>
          <boxGeometry args={[0.015, 0.03, 0.14]} />
        </mesh>
        {/* Chrome accent line on badge */}
        <mesh position={[0.008, 0, 0.02]} material={chromeMaterial}>
          <boxGeometry args={[0.005, 0.015, 0.1]} />
        </mesh>
      </group>
      {/* Right fender GT badge */}
      <group position={[-0.86, 0.62, 0.4]}>
        <mesh material={badgeMaterial}>
          <boxGeometry args={[0.015, 0.03, 0.14]} />
        </mesh>
        <mesh position={[-0.008, 0, 0.02]} material={chromeMaterial}>
          <boxGeometry args={[0.005, 0.015, 0.1]} />
        </mesh>
      </group>

      {/* === DOOR LINES === */}
      {/* Left side door gaps */}
      <mesh position={[0.86, 0.5, 0.3]}>
        <boxGeometry args={[0.008, 0.4, 0.008]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[0.86, 0.5, -0.35]}>
        <boxGeometry args={[0.008, 0.4, 0.008]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      {/* Right side door gaps */}
      <mesh position={[-0.86, 0.5, 0.3]}>
        <boxGeometry args={[0.008, 0.4, 0.008]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[-0.86, 0.5, -0.35]}>
        <boxGeometry args={[0.008, 0.4, 0.008]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* === DOOR HANDLES (chrome) === */}
      <mesh position={[0.86, 0.6, 0.1]} material={chromeMaterial}>
        <boxGeometry args={[0.018, 0.025, 0.1]} />
      </mesh>
      <mesh position={[0.86, 0.6, -0.55]} material={chromeMaterial}>
        <boxGeometry args={[0.018, 0.025, 0.1]} />
      </mesh>
      <mesh position={[-0.86, 0.6, 0.1]} material={chromeMaterial}>
        <boxGeometry args={[0.018, 0.025, 0.1]} />
      </mesh>
      <mesh position={[-0.86, 0.6, -0.55]} material={chromeMaterial}>
        <boxGeometry args={[0.018, 0.025, 0.1]} />
      </mesh>

      {/* === CHROME WINDOW TRIM === */}
      <mesh position={[0.72, 1.22, 0.0]} material={chromeMaterial}>
        <boxGeometry args={[0.015, 0.015, 1.5]} />
      </mesh>
      <mesh position={[-0.72, 1.22, 0.0]} material={chromeMaterial}>
        <boxGeometry args={[0.015, 0.015, 1.5]} />
      </mesh>

      {/* === VW LOGO (FRONT) — larger, prominent with chrome ring === */}
      <group position={[0, 0.52, 2.09]}>
        {/* Chrome ring */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.07, 0.008, 12, 24]} />
          <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.05} />
        </mesh>
        {/* Blue VW badge face */}
        <mesh>
          <circleGeometry args={[0.065, 28]} />
          <meshStandardMaterial color="#003399" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* === VW LOGO (REAR) === */}
      <group position={[0, 0.62, -2.09]} rotation={[0, Math.PI, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.055, 0.006, 12, 24]} />
          <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.05} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.05, 24]} />
          <meshStandardMaterial color="#003399" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* === GT BADGE ON GRILLE (above VW logo) === */}
      <mesh position={[0, 0.6, 2.08]} material={chromeMaterial}>
        <boxGeometry args={[0.06, 0.025, 0.01]} />
      </mesh>

      {/* === FRONT LOWER GRILLE (honeycomb-style dark mesh) === */}
      <mesh position={[0, 0.13, 2.13]}>
        <boxGeometry args={[1.1, 0.12, 0.03]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Chrome trim along lower grille top edge */}
      <mesh position={[0, 0.2, 2.14]} material={chromeMaterial}>
        <boxGeometry args={[1.2, 0.01, 0.01]} />
      </mesh>

      {/* === SHARK FIN ANTENNA === */}
      <mesh position={[0, 1.36, -0.4]}>
        <coneGeometry args={[0.025, 0.07, 8]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* === REAR LICENSE PLATE AREA === */}
      <mesh position={[0, 0.35, -2.11]}>
        <boxGeometry args={[0.4, 0.12, 0.01]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
      </mesh>
    </group>
  );
}
