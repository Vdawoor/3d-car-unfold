import type { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  canvas: ReactNode;
}

export function Layout({ header, sidebar, canvas }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>{header}</div>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.canvas}>{canvas}</div>
    </div>
  );
}
