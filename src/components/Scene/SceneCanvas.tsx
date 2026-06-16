import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { Ground } from './Ground';
import { Annotations } from './Annotations';
import type { AnnotationTarget } from '../../types';
import { Car } from '../Car';

interface SceneCanvasProps {
  annotations: AnnotationTarget[];
}

export function SceneCanvas({ annotations }: SceneCanvasProps) {
  return (
    <Canvas
      camera={{ position: [-4, 2, -6], fov: 45 }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 4, -5]} intensity={0.3} />

      <Environment preset="city" background={false} />

      <Suspense fallback={null}>
        <Stage environment={null} intensity={0.4} shadows={false}>
          <Car position={[0, 0, 0]} />
        </Stage>
      </Suspense>

      <Annotations annotations={annotations} />

      <Ground />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
