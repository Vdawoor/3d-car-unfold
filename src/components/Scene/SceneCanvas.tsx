// Canvas = the React Three Fiber wrapper that creates a WebGL renderer
import { Canvas } from '@react-three/fiber';
// OrbitControls = mouse drag/scroll to rotate/zoom; Environment = HDR image-based lighting
import { OrbitControls, Environment } from '@react-three/drei';
import { CarBody } from './CarBody';
import { CarWheels } from './CarWheels';
import { CarWindows } from './CarWindows';
import { CarLights } from './CarLights';
import { CarDetails } from './CarDetails';
import { Ground } from './Ground';
import { Annotations } from './Annotations';
import type { AnnotationTarget } from '../../types';

interface SceneCanvasProps {
  annotations: AnnotationTarget[];
}

export function SceneCanvas({ annotations }: SceneCanvasProps) {
  return (
    // Initialize the 3D scene: camera placed at [4,3,6] looking at origin, 45-degree field of view
    <Canvas
      camera={{ position: [4, 3, 6], fov: 45 }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      {/* Soft fill light from all directions (prevents pitch-black shadows) */}
      <ambientLight intensity={0.4} />
      {/* Primary directional light (like the sun) casting shadows from upper-right-front */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Secondary fill light from opposite side to soften harsh shadows */}
      <directionalLight position={[-3, 4, -5]} intensity={0.3} />

      {/* HDR environment map for realistic reflections on metallic/glossy surfaces */}
      <Environment preset="city" background={false} />

      {/* All car parts grouped together so they move/transform as one unit */}
      <group>
        <CarBody />
        <CarWheels />
        <CarWindows />
        <CarLights />
        <CarDetails />
      </group>

      {/* 3D annotation arrows + floating spec labels pointing at car parts */}
      <Annotations annotations={annotations} />

      {/* Circular floor plane underneath the car */}
      <Ground />

      {/* Mouse/touch controls: auto-rotates slowly, can orbit but not go below ground */}
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={15}
        // Prevent camera from going below the ground plane (PI/2.1 is slightly above horizontal)
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
