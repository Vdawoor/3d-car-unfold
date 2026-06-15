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

// Single annotation: a dot on the car → curved line → floating HTML label with specs
function AnnotationArrow({ annotation }: { annotation: AnnotationTarget }) {
  // Convert the [x,y,z] tuples into THREE.Vector3 objects for math operations
  const start = new THREE.Vector3(...annotation.position);
  const end = new THREE.Vector3(...annotation.labelOffset);

  // Create a midpoint 60% along the line, then raise it slightly for a curved/arced appearance
  const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.6);
  midPoint.y += 0.3;

  return (
    <group>
      {/* Blue glowing dot anchored on the car part being annotated */}
      <mesh position={annotation.position}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#0066cc" emissive="#0066cc" emissiveIntensity={0.5} />
      </mesh>

      {/* Curved line connecting the car-point to the label (goes through raised midpoint) */}
      <Line
        points={[start, midPoint, end]}
        color="#0066cc"
        lineWidth={2}
        dashed={false}
      />

      {/* Small dot at the label end of the line */}
      <mesh position={annotation.labelOffset}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#0066cc" />
      </mesh>

      {/* HTML overlay — renders a DOM tooltip positioned in 3D space */}
      <Html
        position={annotation.labelOffset}
        center
        // distanceFactor makes the label scale with camera distance (larger = smaller label)
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div className={styles.annotationLabel}>
          <div className={styles.groupTitle}>{annotation.groupLabel}</div>
          {/* List each spec as "label: value" inside the floating tooltip */}
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
