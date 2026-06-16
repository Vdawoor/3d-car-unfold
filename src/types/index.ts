// Union type defining all possible spec category IDs used for navigation
export type SpecCategory =
  | 'general'
  | 'engine'
  | 'transmission'
  | 'fuel'
  | 'dimensions'
  | 'suspension'
  | 'safety'
  | 'interior'
  | 'exterior'
  | 'pricing';

// A single spec row (e.g. "Engine Type" : "1.5L TSI EVO")
export interface SpecItem {
  label: string;
  value: string;
}

// Defines a 3D annotation that points to a part of the car model
export interface AnnotationTarget {
  // [x, y, z] coordinate on the car model where the arrow starts
  position: [number, number, number];
  // [x, y, z] coordinate where the floating label is positioned in 3D space
  labelOffset: [number, number, number];
  // The specs shown inside this annotation's floating label
  specs: SpecItem[];
  // Title shown at the top of the annotation popup (e.g. "Engine", "Drivetrain")
  groupLabel: string;
  // If true, draws a straight line instead of a curved arc
  straight?: boolean;
  // Additional start points — each gets its own line converging to the same label
  extraPoints?: [number, number, number][];
}

// Full data structure for each sidebar category (engine, safety, etc.)
export interface CategoryData {
  id: SpecCategory;
  name: string;
  icon: string;
  description: string;
  // Whether this category shows 3D annotation arrows on the car model
  hasArrows: boolean;
  // The 3D annotation points shown when this category is active
  annotations: AnnotationTarget[];
  // The flat list of specs displayed in the right-side panel
  specs: SpecItem[];
}
