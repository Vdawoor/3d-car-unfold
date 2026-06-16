import { useGLTF } from '@react-three/drei';
import type { JSX } from 'react';

export function Car(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/3d-car-unfold/car1.glb');
  return <primitive object={scene} scale={1.5} {...props} />;
}

useGLTF.preload('/3d-car-unfold/car1.glb');
