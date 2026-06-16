// Html = renders regular DOM elements inside the 3D scene; Line = draws a line between 3D points
import { Html, Line } from '@react-three/drei';
import type { AnnotationTarget } from '../../types';
import * as THREE from 'three';
import styles from './Annotations.module.css';

interface AnnotationsProps {
  annotations: AnnotationTarget[];
}

// Renders all annotation arrows for the current category (or nothing if empty)
export function Annotations({ annotations }: AnnotationsProps) {
  if (annotations.length === 0) return null;

  return (
    <group>
      {annotations.map((annotation, idx) => (
        <AnnotationArrow key={idx} annotation={annotation} />
      ))}
    </group>
  );
}

function AnnotationArrow({ annotation }: { annotation: AnnotationTarget }) {
  const start = new THREE.Vector3(...annotation.position);
  const end = new THREE.Vector3(...annotation.labelOffset);

  const points = annotation.straight
    ? [start, end]
    : (() => {
        const mid = new THREE.Vector3().lerpVectors(start, end, 0.6);
        mid.y += 0.3;
        return [start, mid, end];
      })();

  return (
    <group>
      <mesh position={annotation.position}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#0066cc" emissive="#0066cc" emissiveIntensity={0.5} />
      </mesh>

      <Line
        points={points}
        color="#0066cc"
        lineWidth={2}
        dashed={false}
      />

      <mesh position={annotation.labelOffset}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>

      <Html
        position={annotation.labelOffset}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.annotationLabel}>
          <div className={styles.groupTitle}>{annotation.groupLabel}</div>
          {annotation.specs.map((spec) => (
            <div key={spec.label} className={styles.specLine}>
              <span className={styles.specKey}>{spec.label}:</span>
              <span className={styles.specVal}>{spec.value}</span>
            </div>
          ))}
        </div>
      </Html>
    </group>
  );
}
