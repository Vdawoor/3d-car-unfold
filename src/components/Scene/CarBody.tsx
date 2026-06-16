import { useMemo } from 'react';
import * as THREE from 'three';

export function CarBody() {
  // Wild Cherry Red metallic car paint with clearcoat (realistic automotive finish)
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#8B1A1A',
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  // Gloss black roof (GT Line specific)
  const roofMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0a0a0a',
        metalness: 0.3,
        roughness: 0.15,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
      }),
    []
  );

  // Dark plastic for bumpers, lower cladding
  const bumperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.1,
        roughness: 0.6,
      }),
    []
  );

  // Main lower body — extruded side profile
  const lowerBodyGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Side profile of lower body (Y=height, points define the outline)
    // Start at rear-bottom
    shape.moveTo(-2.1, 0.08);
    // Bottom edge (flat)
    shape.lineTo(2.1, 0.08);
    // Front face curves up
    shape.quadraticCurveTo(2.15, 0.08, 2.15, 0.2);
    shape.lineTo(2.1, 0.65);
    // Front top rounds back
    shape.quadraticCurveTo(2.1, 0.7, 2.0, 0.72);
    // Hood surface (slightly descending toward windshield base)
    shape.quadraticCurveTo(1.5, 0.74, 0.9, 0.76);
    // Beltline continues back
    shape.lineTo(-1.2, 0.76);
    // Trunk area slopes down slightly
    shape.quadraticCurveTo(-1.8, 0.74, -2.0, 0.7);
    // Rear face
    shape.lineTo(-2.1, 0.65);
    shape.quadraticCurveTo(-2.15, 0.55, -2.15, 0.2);
    shape.quadraticCurveTo(-2.15, 0.08, -2.1, 0.08);

    // Cut out front wheel arch — centered at wheel Y position with clearance
    const frontWheelHole = new THREE.Path();
    frontWheelHole.moveTo(1.65, 0.08);
    frontWheelHole.lineTo(1.65, 0.3);
    frontWheelHole.absarc(1.2, 0.3, 0.45, 0, Math.PI, false);
    frontWheelHole.lineTo(0.75, 0.08);
    shape.holes.push(frontWheelHole);

    // Cut out rear wheel arch
    const rearWheelHole = new THREE.Path();
    rearWheelHole.moveTo(-0.65, 0.08);
    rearWheelHole.lineTo(-0.65, 0.3);
    rearWheelHole.absarc(-1.1, 0.3, 0.45, 0, Math.PI, false);
    rearWheelHole.lineTo(-1.55, 0.08);
    shape.holes.push(rearWheelHole);

    const extrudeSettings = {
      steps: 1,
      depth: 1.7,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 3,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center the extrusion on X axis
    geo.translate(0, 0, -0.85);
    // Rotate so Z becomes the length axis and X is width
    geo.rotateY(Math.PI / 2);
    return geo;
  }, []);

  // Cabin/greenhouse — the upper glassed area with roofline
  const cabinGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Cabin side profile (trapezoidal with curved roof)
    // Start at windshield base
    shape.moveTo(0.85, 0.75);
    // Windshield rake (steep, ~60 degrees)
    shape.lineTo(0.5, 1.25);
    // Roof front edge rounds over
    shape.quadraticCurveTo(0.4, 1.32, 0.2, 1.33);
    // Roof line (very gentle arc)
    shape.quadraticCurveTo(-0.2, 1.35, -0.5, 1.32);
    // C-pillar slopes down (rear window area)
    shape.quadraticCurveTo(-0.7, 1.28, -0.95, 1.1);
    // Rear window base slopes into trunk
    shape.lineTo(-1.15, 0.82);
    // Beltline back to start
    shape.lineTo(0.85, 0.75);

    const extrudeSettings = {
      steps: 1,
      depth: 1.4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.translate(0, 0, -0.7);
    geo.rotateY(Math.PI / 2);
    return geo;
  }, []);

  // Trunk lid — separate panel at the rear
  const trunkGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Trunk profile — flat area that slopes slightly
    shape.moveTo(-1.2, 0.76);
    shape.quadraticCurveTo(-1.5, 0.78, -1.7, 0.75);
    shape.lineTo(-2.0, 0.7);
    shape.lineTo(-2.0, 0.68);
    shape.lineTo(-1.2, 0.72);
    shape.lineTo(-1.2, 0.76);

    const extrudeSettings = {
      steps: 1,
      depth: 1.42,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.translate(0, 0, -0.71);
    geo.rotateY(Math.PI / 2);
    return geo;
  }, []);

  // Hood panel — trapezoidal top-view shape (wider at windshield, tapers toward nose)
  const hoodGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Top-down outline of the hood: X = car width, Y = car length (Z in world)
    // Rear edge (at windshield base) — wider
    shape.moveTo(-0.7, 0);
    shape.lineTo(0.7, 0);
    // Right edge tapers toward front
    shape.quadraticCurveTo(0.68, 0.6, 0.6, 1.15);
    // Front edge — narrower, with rounded corners
    shape.quadraticCurveTo(0.55, 1.2, 0, 1.22);
    shape.quadraticCurveTo(-0.55, 1.2, -0.6, 1.15);
    // Left edge tapers back
    shape.quadraticCurveTo(-0.68, 0.6, -0.7, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Rotate to lie flat (XZ plane) and position at hood height
    geo.rotateX(-Math.PI / 2);
    // Slight nose-down tilt
    geo.rotateX(0.03);
    // Position: Y=hood height, Z=centered on hood area
    geo.translate(0, 0.77, 0.85);
    return geo;
  }, []);

  return (
    <group>
      {/* Main lower body shell — the largest piece forming the sedan shape */}
      <mesh geometry={lowerBodyGeometry} material={bodyMaterial} castShadow />

      {/* Cabin/greenhouse — upper body with windows area */}
      <mesh geometry={cabinGeometry} material={bodyMaterial} castShadow />

      {/* Roof panel — gloss black for GT Line */}
      <mesh position={[0, 1.33, -0.15]} material={roofMaterial} castShadow>
        <boxGeometry args={[1.3, 0.04, 1.6]} />
      </mesh>

      {/* === HOOD ASSEMBLY === */}
      {/* Main hood panel — tapered shape (wider at windshield, narrower at nose) */}
      <mesh geometry={hoodGeometry} material={bodyMaterial} castShadow />

      {/* Hood center dome — very subtle convex bulge along the center */}
      <mesh position={[0, 0.14, 1.4]} rotation={[ 0, 0, Math.PI / 2]} material={bodyMaterial} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 1.43, 18, 1, false, 0, Math.PI/1.5]} />
      </mesh>

      {/* Left power line crease — raised ridge running from windshield base to front */}
      <mesh position={[0.3, 0.79, 1.35]} rotation={[-0.02, 0, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.035, 0.02, 1.15]} />
      </mesh>
      {/* Right power line crease */}
      <mesh position={[-0.3, 0.79, 1.35]} rotation={[-0.02, 0, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.035, 0.02, 1.15]} />
      </mesh>

      {/* Hood front edge — slightly thicker lip where it meets the grille */}
      <mesh position={[0, 0.72, 1.97]} material={bodyMaterial} castShadow>
        <boxGeometry args={[1.3, 0.04, 0.06]} />
      </mesh>

      {/* Windshield cowl — black trim strip at hood-to-windshield junction */}
      <mesh position={[0, 0.76, 0.82]} material={roofMaterial}>
        <boxGeometry args={[1.42, 0.02, 0.08]} />
      </mesh>

      {/* Fender ridges — raised edges flanking the hood on each side */}
      <mesh position={[0.68, 0.78, 1.35]} rotation={[-0.015, 0, 0.05]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.06, 0.025, 1.15]} />
      </mesh>
      <mesh position={[-0.68, 0.78, 1.35]} rotation={[-0.015, 0, -0.05]} material={bodyMaterial} castShadow>
        <boxGeometry args={[0.06, 0.025, 1.15]} />
      </mesh>

      {/* Trunk lid surface */}
      <mesh geometry={trunkGeometry} material={bodyMaterial} castShadow />

      {/* Front bumper — dark lower section */}
      <mesh position={[0, 0.2, 2.1]} castShadow material={bumperMaterial}>
        <boxGeometry args={[1.7, 0.25, 0.12]} />
      </mesh>

      {/* Front bumper lower grille area */}
      <mesh position={[0, 0.12, 2.12]} material={bumperMaterial}>
        <boxGeometry args={[1.4, 0.15, 0.06]} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, 0.2, -2.1]} castShadow material={bumperMaterial}>
        <boxGeometry args={[1.7, 0.28, 0.12]} />
      </mesh>

      {/* Side skirts — dark trim along bottom edges */}
      <mesh position={[0.84, 0.1, 0]} castShadow material={bumperMaterial}>
        <boxGeometry args={[0.04, 0.06, 3.8]} />
      </mesh>
      <mesh position={[-0.84, 0.1, 0]} castShadow material={bumperMaterial}>
        <boxGeometry args={[0.04, 0.06, 3.8]} />
      </mesh>

      {/* A-pillar left — black trim connecting windshield to roof */}
      <mesh position={[0.62, 1.0, 0.68]} castShadow material={roofMaterial} rotation={[0.45, 0, 0.12]}>
        <boxGeometry args={[0.06, 0.55, 0.06]} />
      </mesh>
      {/* A-pillar right */}
      <mesh position={[-0.62, 1.0, 0.68]} castShadow material={roofMaterial} rotation={[0.45, 0, -0.12]}>
        <boxGeometry args={[0.06, 0.55, 0.06]} />
      </mesh>

      {/* B-pillar left (between front and rear doors) */}
      <mesh position={[0.7, 1.0, -0.05]} castShadow material={roofMaterial}>
        <boxGeometry args={[0.05, 0.55, 0.06]} />
      </mesh>
      {/* B-pillar right */}
      <mesh position={[-0.7, 1.0, -0.05]} castShadow material={roofMaterial}>
        <boxGeometry args={[0.05, 0.55, 0.06]} />
      </mesh>

      {/* C-pillar left — thicker, characteristic sedan C-pillar */}
      <mesh position={[0.6, 1.0, -0.8]} castShadow material={roofMaterial} rotation={[-0.3, 0, 0.08]}>
        <boxGeometry args={[0.07, 0.5, 0.1]} />
      </mesh>
      {/* C-pillar right */}
      <mesh position={[-0.6, 1.0, -0.8]} castShadow material={roofMaterial} rotation={[-0.3, 0, -0.08]}>
        <boxGeometry args={[0.07, 0.5, 0.1]} />
      </mesh>

      {/* Front wheel arch molding — dark trim around wheel openings */}
      <mesh position={[0.82, 0.38, 1.2]} rotation={[0, Math.PI / 2, 0]} material={bumperMaterial}>
        <torusGeometry args={[0.43, 0.02, 8, 20, Math.PI]} />
      </mesh>
      <mesh position={[-0.82, 0.38, 1.2]} rotation={[0, Math.PI / 2, 0]} material={bumperMaterial}>
        <torusGeometry args={[0.43, 0.02, 8, 20, Math.PI]} />
      </mesh>

      {/* Rear wheel arch molding */}
      <mesh position={[0.82, 0.38, -1.1]} rotation={[0, Math.PI / 2, 0]} material={bumperMaterial}>
        <torusGeometry args={[0.43, 0.02, 8, 20, Math.PI]} />
      </mesh>
      <mesh position={[-0.82, 0.38, -1.1]} rotation={[0, Math.PI / 2, 0]} material={bumperMaterial}>
        <torusGeometry args={[0.43, 0.02, 8, 20, Math.PI]} />
      </mesh>
    </group>
  );
}
