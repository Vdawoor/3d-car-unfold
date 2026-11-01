import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stage } from '@react-three/drei';
import { Ground } from './Ground';
import { Annotations } from './Annotations';
import { CameraController } from './CameraController';
import { Highlight } from './Highlight';
import type { AnnotationTarget, CameraTarget } from '../../types';
import { Car } from '../Car';

interface SceneCanvasProps {
  annotations: AnnotationTarget[];
  cameraTarget: CameraTarget | null;
}

export function SceneCanvas({ annotations, cameraTarget }: SceneCanvasProps) {
  const showHighlight =
    cameraTarget &&
    (cameraTarget.highlightPosition[0] !== 0 ||
      cameraTarget.highlightPosition[1] !== 0 ||
      cameraTarget.highlightPosition[2] !== 0);

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

      {showHighlight && <Highlight position={cameraTarget.highlightPosition} />}

      <Ground />

      <CameraController target={cameraTarget} />
    </Canvas>
  );
}
