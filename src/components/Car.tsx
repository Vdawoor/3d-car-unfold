import { useGLTF } from '@react-three/drei';
import type { GroupProps } from '@react-three/fiber';

export function Car(props: GroupProps) {
  const { scene } = useGLTF('/car1.glb');
  return <primitive object={scene} scale={1.5} {...props} />;
}

useGLTF.preload('/car1.glb');
