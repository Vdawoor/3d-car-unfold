// ContactShadows = renders soft shadow blobs beneath objects (like ambient occlusion on a surface)
import { ContactShadows } from '@react-three/drei';

export function Ground() {
  return (
    <>
      {/* Circular floor plane — rotated to lie flat (X rotation = -90 degrees), receives cast shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
        {/* Circle with radius 6, made of 64 segments for smooth edges */}
        <circleGeometry args={[6, 64]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
      {/* Soft contact shadows projected downward — creates the realistic shadow pool under the car */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  );
}
