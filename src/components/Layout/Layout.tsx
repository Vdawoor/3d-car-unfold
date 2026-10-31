import { useState, type ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  canvas: ReactNode;
  specpanel: ReactNode;
}

export function Layout({ header, sidebar, canvas, specpanel }: LayoutProps) {
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div className={`${styles.layout} ${panelOpen ? '' : styles.panelClosed}`}>
      <div className={styles.header}>{header}</div>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.canvas}>
        {canvas}
        <button
          className={styles.toggleBtn}
          onClick={() => setPanelOpen((o) => !o)}
          aria-label={panelOpen ? 'Close specifications' : 'Open specifications'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {panelOpen ? (
              <polyline points="9 18 15 12 9 6" />
            ) : (
              <polyline points="15 18 9 12 15 6" />
            )}
          </svg>
          <span className={styles.toggleLabel}>{panelOpen ? 'Specs' : 'Specs'}</span>
        </button>
      </div>
      <div className={`${styles.specpanel} ${panelOpen ? '' : styles.specpanelHidden}`}>
        {specpanel}
      </div>
    </div>
  );
}
