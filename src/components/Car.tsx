import { useGLTF } from '@react-three/drei';
import type { JSX } from 'react';

export function Car(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/car1.glb');
  return <primitive object={scene} scale={1.5} {...props} />;
}

useGLTF.preload('/car1.glb');
