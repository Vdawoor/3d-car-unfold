import styles from './Sidebar.module.css';
import type { CategoryData, SpecCategory } from '../../types';

// Maps icon string IDs from category data to their emoji representations
const ICONS: Record<string, string> = {
  info: '📋',
  engine: '⚙️',
  gears: '🔧',
  fuel: '⛽',
  ruler: '📏',
  wheel: '🛞',
  shield: '🛡️',
  seat: '💺',
  car: '🚗',
  tag: '💰',
};

interface SidebarProps {
  categories: CategoryData[];
  activeCategory: SpecCategory;
  onSelect: (id: SpecCategory) => void;
}

// Vertical navigation panel — each button selects a spec category and updates the 3D view
export function Sidebar({ categories, activeCategory, onSelect }: SidebarProps) {
  return (
    <nav className={styles.sidebar}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          // Adds the "active" CSS class when this button's category is selected
          className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          {/* Emoji icon with fallback bullet if the icon key isn't in the map */}
          <span className={styles.icon}>{ICONS[cat.icon] || '•'}</span>
          <span className={styles.label}>{cat.name}</span>
          {/* Small badge indicator showing this category has 3D annotation arrows */}
          {cat.hasArrows && <span className={styles.arrowBadge} />}
        </button>
      ))}
    </nav>
  );
}
