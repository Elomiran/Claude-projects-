import { useState } from 'react';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Canvas } from './components/Canvas.jsx';
import { PropertiesPanel } from './components/PropertiesPanel.jsx';
import { PreviewModal } from './components/PreviewModal.jsx';
import { useBuilderStore } from './store.js';
import { exportHTML } from './exporter.js';

export function App() {
  const store = useBuilderStore();
  const [previewOpen, setPreviewOpen] = useState(false);

  function handleExport() {
    const html = exportHTML(store.blocks, { preview: false });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="app">
      <Header
        onPreview={() => setPreviewOpen(true)}
        onExport={handleExport}
      />
      <div className="workspace">
        <Sidebar onAdd={store.addBlock} />
        <Canvas store={store} />
        <PropertiesPanel block={store.selectedBlock} onUpdate={store.updateBlock} />
      </div>
      {previewOpen && (
        <PreviewModal
          blocks={store.blocks}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
