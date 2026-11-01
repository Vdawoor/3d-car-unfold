import { useState, useCallback } from 'react';
import { Layout } from './components/Layout/Layout';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SceneCanvas } from './components/Scene/SceneCanvas';
import { ChatAgent } from './components/ChatAgent/ChatAgent';
import { categories } from './data/virtusSpecs';
import type { SpecCategory, CameraTarget, AIAgentResponse } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState<SpecCategory>('engine');
  const [cameraTarget, setCameraTarget] = useState<CameraTarget | null>(null);

  const activeCategoryData = categories.find((c) => c.id === activeCategory)!;

  const handleCategorySelect = useCallback((id: SpecCategory) => {
    setActiveCategory(id);
    setCameraTarget(null);
  }, []);

  const handleAIResponse = useCallback((response: AIAgentResponse) => {
    if (response.category) {
      setActiveCategory(response.category);
    }
    setCameraTarget({
      cameraPosition: response.cameraPosition,
      lookAt: response.lookAt,
      highlightPosition: response.highlightPosition,
      autoRotate: false,
    });
  }, []);

  return (
    <Layout
      header={<Header />}
      sidebar={
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />
      }
      canvas={
        <>
          <SceneCanvas
            annotations={activeCategoryData.annotations}
            cameraTarget={cameraTarget}
          />
          <ChatAgent onResponse={handleAIResponse} />
        </>
      }
    />
  );
}

export default App;
