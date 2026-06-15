import styles from './SpecPanel.module.css';
import type { CategoryData } from '../../types';

interface SpecPanelProps {
  category: CategoryData;
}

// Right-side panel that displays the spec table for whichever category is active
export function SpecPanel({ category }: SpecPanelProps) {
  return (
    <aside className={styles.panel}>
      {/* Panel header showing the category title and short description */}
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>{category.name}</div>
        <div className={styles.panelDescription}>{category.description}</div>
      </div>
      {/* Scrollable list of spec rows — each row is a label/value pair */}
      <div className={styles.specList}>
        {category.specs.map((spec) => (
          <div key={spec.label} className={styles.specRow}>
            <span className={styles.specLabel}>{spec.label}</span>
            <span className={styles.specValue}>{spec.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
