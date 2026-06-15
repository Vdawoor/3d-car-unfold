import { useMemo } from 'react';
import * as THREE from 'three';

export function CarBody() {
  // Memoized material for the main body panels (light gray, slightly metallic)
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8e8e8',
        metalness: 0.4,
        roughness: 0.3,
      }),
    []
  );

  // Memoized material for trim pieces like bumpers, pillars, skirts (dark, more metallic)
  const trimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a2a',
        metalness: 0.6,
        roughness: 0.4,
      }),
    []
  );

  return (
    <group>
      {/* Lower body — the main rectangular slab forming the car's base structure */}
      <mesh position={[0, 0.35, 0]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.7, 0.5, 4.2]} />
      </mesh>

      {/* Beltline — thin horizontal strip where windows meet the body panels */}
      <mesh position={[0, 0.65, -0.1]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.65, 0.12, 4.0]} />
      </mesh>

      {/* Hood — the flat panel covering the engine bay at the front */}
      <mesh position={[0, 0.68, 1.35]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.55, 0.08, 1.3]} />
      </mesh>

      {/* Cabin/Greenhouse — the raised box representing the passenger compartment + glass area */}
      <mesh position={[0, 1.0, -0.1]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.45, 0.5, 2.0]} />
      </mesh>

      {/* Roof — thin flat slab on top of the cabin */}
      <mesh position={[0, 1.28, -0.15]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.38, 0.06, 1.7]} />
      </mesh>

      {/* Trunk lid — flat panel at the rear above the bumper */}
      <mesh position={[0, 0.72, -1.55]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.5, 0.1, 0.9]} />
      </mesh>

      {/* Trunk rear slope — angled panel connecting roof to trunk (sedan profile) */}
      <mesh position={[0, 0.82, -1.3]} castShadow material={bodyMaterial} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.42, 0.08, 0.6]} />
      </mesh>

      {/* Front bumper — dark plastic trim across the front bottom */}
      <mesh position={[0, 0.25, 2.05]} castShadow material={trimMaterial}>
        <boxGeometry args={[1.7, 0.35, 0.15]} />
      </mesh>

      {/* Rear bumper — dark plastic trim across the back bottom */}
      <mesh position={[0, 0.25, -2.05]} castShadow material={trimMaterial}>
        <boxGeometry args={[1.7, 0.35, 0.15]} />
      </mesh>

      {/* Front grille — the dark horizontal intake below the VW logo */}
      <mesh position={[0, 0.5, 2.06]} material={trimMaterial}>
        <boxGeometry args={[1.2, 0.2, 0.05]} />
      </mesh>

      {/* GT Line red accent strip — signature red line across front grille */}
      <mesh position={[0, 0.42, 2.08]}>
        <boxGeometry args={[1.0, 0.03, 0.02]} />
        <meshStandardMaterial color="#cc0000" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Side skirts — dark trim running along the bottom of each side */}
      <mesh position={[0.85, 0.15, 0]} castShadow material={trimMaterial}>
        <boxGeometry args={[0.04, 0.12, 3.6]} />
      </mesh>
      <mesh position={[-0.85, 0.15, 0]} castShadow material={trimMaterial}>
        <boxGeometry args={[0.04, 0.12, 3.6]} />
      </mesh>

      {/* A-pillar left — the structural post between windshield and front door */}
      <mesh position={[0.65, 0.9, 0.7]} castShadow material={trimMaterial} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.06, 0.5, 0.08]} />
      </mesh>
      {/* A-pillar right */}
      <mesh position={[-0.65, 0.9, 0.7]} castShadow material={trimMaterial} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.06, 0.5, 0.08]} />
      </mesh>

      {/* C-pillar left — the structural post between rear window and trunk */}
      <mesh position={[0.6, 0.9, -0.9]} castShadow material={trimMaterial} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
      </mesh>
      {/* C-pillar right */}
      <mesh position={[-0.6, 0.9, -0.9]} castShadow material={trimMaterial} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
      </mesh>
    </group>
  );
}
