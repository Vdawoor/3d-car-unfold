import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { CameraTarget } from '../../types';

interface CameraControllerProps {
  target: CameraTarget | null;
}

export function CameraController({ target }: CameraControllerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAutoRotate, setShowAutoRotate] = useState(false);
  const goalPos = useRef(new THREE.Vector3());
  const goalLook = useRef(new THREE.Vector3());

  useEffect(() => {
    if (target) {
      goalPos.current.set(...target.cameraPosition);
      goalLook.current.set(...target.lookAt);
      setIsAnimating(true);
      setShowAutoRotate(false);
    } else {
      setShowAutoRotate(false);
    }
  }, [target]);

  useFrame(() => {
    if (!isAnimating || !controlsRef.current) return;

    camera.position.lerp(goalPos.current, 0.045);
    controlsRef.current.target.lerp(goalLook.current, 0.045);
    controlsRef.current.update();

    if (camera.position.distanceTo(goalPos.current) < 0.08) {
      camera.position.copy(goalPos.current);
      controlsRef.current.target.copy(goalLook.current);
      controlsRef.current.update();
      setIsAnimating(false);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={1.5}
      maxDistance={15}
      maxPolarAngle={Math.PI / 1.8}
      autoRotate={showAutoRotate}
      autoRotateSpeed={0.6}
    />
  );
}
