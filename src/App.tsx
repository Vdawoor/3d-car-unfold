import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SceneCanvas } from './components/Scene/SceneCanvas';
import { SpecPanel } from './components/SpecPanel/SpecPanel';
import { categories } from './data/virtusSpecs';
import type { SpecCategory } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState<SpecCategory>('engine');

  const activeCategoryData = categories.find((c) => c.id === activeCategory)!;

  return (
    <Layout
      header={<Header />}
      sidebar={
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      }
      canvas={<SceneCanvas annotations={activeCategoryData.annotations} />}
      specpanel={<SpecPanel category={activeCategoryData} />}
    />
  );
}

export default App;
