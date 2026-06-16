import { useMemo } from 'react';
import * as THREE from 'three';

// Single headlight assembly — L-shaped DRL, projector lens, textured area
function Headlight({ side }: { side: number }) {
  const housingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111111',
        metalness: 0.3,
        roughness: 0.4,
      }),
    []
  );

  const drlMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ffffff',
        emissiveIntensity: 0.8,
        metalness: 0.1,
        roughness: 0.1,
      }),
    []
  );

  const lensMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#cccccc',
        metalness: 0.8,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0,
      }),
    []
  );

  const x = side * 0.52;

  return (
    <group position={[x, 0.52, 2.05]}>
      {/* Dark headlight housing — elongated angular shape */}
      <mesh material={housingMaterial}>
        <boxGeometry args={[0.5, 0.16, 0.08]} />
      </mesh>

      {/* DRL — L-shaped: horizontal bar along the top */}
      <mesh position={[0, 0.06, 0.02]} material={drlMaterial}>
        <boxGeometry args={[0.44, 0.025, 0.02]} />
      </mesh>
      {/* DRL — vertical part on the inner edge */}
      <mesh position={[-side * 0.2, -0.01, 0.02]} material={drlMaterial}>
        <boxGeometry args={[0.025, 0.1, 0.02]} />
      </mesh>

      {/* Projector lens — circular element with chrome ring */}
      <mesh position={[-side * 0.08, -0.02, 0.04]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 20]} />
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Chrome ring around projector */}
      <mesh position={[-side * 0.08, -0.02, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.042, 0.005, 8, 20]} />
        {<meshStandardMaterial color="#cccccc" metalness={1} roughness={0.05} />}
      </mesh>

      {/* Textured lens area (outer section) */}
      <mesh position={[side * 0.1, -0.02, 0.03]} material={lensMaterial}>
        <boxGeometry args={[0.14, 0.08, 0.015]} />
      </mesh>
    </group>
  );
}

// Single taillight assembly — multi-element with red LED strip and chrome accent
function Taillight({ side }: { side: number }) {
  const housingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.2,
        roughness: 0.5,
      }),
    []
  );

  const redLedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#cc0000',
        emissive: '#ff0000',
        emissiveIntensity: 0.6,
        metalness: 0.2,
        roughness: 0.2,
      }),
    []
  );

  const smokedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#333333',
        metalness: 0.3,
        roughness: 0.3,
      }),
    []
  );

  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#dddddd',
        metalness: 1,
        roughness: 0.05,
      }),
    []
  );

  const x = side * 0.55;

  return (
    <group position={[x, 0.56, -2.06]}>
      {/* Dark taillight housing */}
      <mesh material={housingMaterial}>
        <boxGeometry args={[0.42, 0.2, 0.07]} />
      </mesh>

      {/* Upper smoked section */}
      <mesh position={[0, 0.04, 0.02]} material={smokedMaterial}>
        <boxGeometry args={[0.36, 0.06, 0.02]} />
      </mesh>

      {/* Chrome accent bar running through the middle */}
      <mesh position={[0, 0.0, 0.03]} material={chromeMaterial}>
        <boxGeometry args={[0.34, 0.015, 0.015]} />
      </mesh>

      {/* Red LED strip — main brake light */}
      <mesh position={[0, -0.02, 0.025]} material={redLedMaterial}>
        <boxGeometry args={[0.34, 0.04, 0.02]} />
      </mesh>

      {/* Lower horizontal striped section */}
      <mesh position={[0, -0.06, 0.02]} material={smokedMaterial}>
        <boxGeometry args={[0.36, 0.04, 0.02]} />
      </mesh>
      {/* Lower red glow lines */}
      <mesh position={[0, -0.055, 0.03]} material={redLedMaterial}>
        <boxGeometry args={[0.3, 0.015, 0.01]} />
      </mesh>
      <mesh position={[0, -0.075, 0.03]} material={redLedMaterial}>
        <boxGeometry args={[0.3, 0.015, 0.01]} />
      </mesh>
    </group>
  );
}

export function CarLights() {
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#dddddd',
        metalness: 1,
        roughness: 0.05,
      }),
    []
  );

  return (
    <group>
      {/* Headlight assemblies */}
      <Headlight side={1} />
      <Headlight side={-1} />

      {/* Connected chrome grille bar — runs from headlight to headlight */}
      <mesh position={[0, 0.54, 2.07]} material={chromeMaterial}>
        <boxGeometry args={[1.2, 0.03, 0.03]} />
      </mesh>
      {/* Second chrome bar (lower, thinner) */}
      <mesh position={[0, 0.49, 2.07]} material={chromeMaterial}>
        <boxGeometry args={[1.1, 0.02, 0.02]} />
      </mesh>

      {/* Front fog light / DRL accents at bumper corners */}
      <mesh position={[0.6, 0.22, 2.13]}>
        <boxGeometry args={[0.18, 0.06, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} metalness={0.2} roughness={0.2} />
      </mesh>
      <mesh position={[-0.6, 0.22, 2.13]}>
        <boxGeometry args={[0.18, 0.06, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} metalness={0.2} roughness={0.2} />
      </mesh>
      {/* Chrome trim around fog lights */}
      <mesh position={[0.6, 0.22, 2.14]} material={chromeMaterial}>
        <boxGeometry args={[0.22, 0.005, 0.01]} />
      </mesh>
      <mesh position={[-0.6, 0.22, 2.14]} material={chromeMaterial}>
        <boxGeometry args={[0.22, 0.005, 0.01]} />
      </mesh>

      {/* Taillight assemblies */}
      <Taillight side={1} />
      <Taillight side={-1} />

      {/* Rear connecting strip between taillights (GT Line) */}
      <mesh position={[0, 0.56, -2.08]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#aa0000" emissive="#aa0000" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}
