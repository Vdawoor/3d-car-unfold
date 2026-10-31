import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HighlightProps {
  position: [number, number, number];
}

export function Highlight({ position }: HighlightProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (sphereRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.25;
      sphereRef.current.scale.setScalar(s);
      const mat = sphereRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.5 + Math.sin(t * 3) * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.6;
      ringRef.current.rotation.z = t * 0.4;
      const rs = 1.2 + Math.sin(t * 2) * 0.25;
      ringRef.current.scale.setScalar(rs);
    }
  });

  return (
    <group position={position}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial
          color="#00e676"
          emissive="#00e676"
          emissiveIntensity={2.5}
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.25, 0.02, 16, 48]} />
        <meshStandardMaterial
          color="#00e676"
          emissive="#00e676"
          emissiveIntensity={1.8}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
