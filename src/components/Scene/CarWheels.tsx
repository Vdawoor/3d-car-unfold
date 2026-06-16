import { useMemo } from 'react';
import * as THREE from 'three';

// side: 1 = right side of car (spokes face +X), -1 = left side (spokes face -X)
function Wheel({ position, side = 1 }: { position: [number, number, number]; side?: number }) {
  const rimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111111',
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  const tyreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        roughness: 0.9,
      }),
    []
  );

  const spokeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '',
        metalness: 1,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group position={position}>
      {/* TYRE */}
      <mesh rotation={[0, Math.PI / 2, 0]} material={tyreMaterial}>
        <torusGeometry args={[0.32, 0.09, 24, 80]} />
      </mesh>

      {/* INNER RIM BARREL — slightly tapered dish behind the spokes */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
        <cylinderGeometry args={[0.24, 0.28, 0.18, 40]} />
      </mesh>

      {/* RIM LIP — thin ring at the outer edge of the rim face */}
      <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <torusGeometry args={[0.34, 0.012, 12, 48]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* CENTER HUB — raised disc in the middle */}
      <mesh position={[0.09 * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.15} />
      </mesh>

      {/* VW LOGO on hub — small blue circle */}
      <mesh position={[0.115 * side, 0, 0]} rotation={[0, -Math.PI / 2 * side, 0]}>
        <circleGeometry args={[0.035, 24]} />
        <meshStandardMaterial color="#0066cc" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* LUG BOLTS — 5 bolts around the hub */}
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={angle}
            position={[
              0.11 * side,
              Math.sin(rad) * 0.045,
              Math.cos(rad) * 0.045,
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.03, 12]} />
            <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
          </mesh>
        );
      })}

      {/* SPLIT SPOKES — 5 pairs radiating outward from hub to rim (turbine style)
          Each spoke is a flat blade lying in the YZ plane, extending radially */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const splitOffset = 0.32;

        return (
          <group key={i}>
            {/* Left spoke of the pair */}
            <mesh
              position={[
                0.085 * side,
                Math.sin(rad - splitOffset) * 0.155,
                Math.cos(rad - splitOffset) * 0.155,
              ]}
              rotation={[-(rad - splitOffset), 0, 0]}
              material={spokeMaterial}
            >
              <boxGeometry args={[0.03, 0.02, 0.16]} />
            </mesh>

            {/* Right spoke of the pair */}
            <mesh
              position={[
                0.085 * side,
                Math.sin(rad + splitOffset) * 0.155,
                Math.cos(rad + splitOffset) * 0.155,
              ]}
              rotation={[-(rad + splitOffset), 0, 0]}
              material={spokeMaterial}
            >
              <boxGeometry args={[0.03, 0.02, 0.16]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Places 4 wheels at the correct positions (front-left, front-right, rear-left, rear-right)
export function CarWheels() {
  return (
    <group>
      <Wheel position={[0.85, 0.35, 1.1]} side={1} />
      <Wheel position={[-0.85, 0.35, 1.1]} side={-1} />
      <Wheel position={[0.85, 0.35, -1.2]} side={1} />
      <Wheel position={[-0.85, 0.35, -1.2]} side={-1} />
    </group>
  );
}
