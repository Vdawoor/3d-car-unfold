import styles from './Header.module.css';
import { carInfo } from '../../data/virtusSpecs';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>VW</div>
      <span className={styles.title}>
        {carInfo.brand} {carInfo.model} {carInfo.variant} abc
      </span>
      <span className={styles.tagline}>{carInfo.tagline}</span>
    </header>
  );
}
