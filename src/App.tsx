import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SpecPanel } from './components/SpecPanel/SpecPanel';
import { SceneCanvas } from './components/Scene/SceneCanvas';
import { categories } from './data/virtusSpecs';
import type { SpecCategory } from './types';

function App() {
  // Tracks which sidebar category is currently selected (defaults to 'general')
  const [activeCategory, setActiveCategory] = useState<SpecCategory>('general');

  // Look up the full category data object for the active selection
  const currentCategory = categories.find((c) => c.id === activeCategory)!;
  // Only pass 3D annotations to the scene if this category supports arrow pointers
  const annotations = currentCategory.hasArrows ? currentCategory.annotations : [];

  return (
    // Layout slots: header at top, sidebar on left, 3D canvas in center, spec panel on right
    <Layout
      header={<Header />}
      sidebar={
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      }
      canvas={<SceneCanvas annotations={annotations} />}
      specpanel={<SpecPanel category={currentCategory} />}
    />
  );
}

export default App;
