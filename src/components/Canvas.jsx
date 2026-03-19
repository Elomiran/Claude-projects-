import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CanvasBlock } from './CanvasBlock.jsx';

export function Canvas({ store }) {
  const [dragOver, setDragOver] = useState(false);
  const { blocks, selectedId, setSelectedId, addBlock, moveBlock, duplicateBlock, deleteBlock } = store;

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const type = e.dataTransfer.getData('component-type');
    if (type) addBlock(type);
  }

  return (
    <main
      className="canvas"
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={e => { if (e.target === e.currentTarget) setSelectedId(null); }}
    >
      {blocks.length === 0 ? (
        <div className={`canvas-empty${dragOver ? ' drag-over' : ''}`}>
          <p>Drag components here to build your page</p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {blocks.map(block => (
            <CanvasBlock
              key={block.id}
              block={block}
              selected={block.id === selectedId}
              onSelect={() => setSelectedId(block.id)}
              onMoveUp={() => moveBlock(block.id, -1)}
              onMoveDown={() => moveBlock(block.id, 1)}
              onDuplicate={() => duplicateBlock(block.id)}
              onDelete={() => deleteBlock(block.id)}
              onContentChange={(key, val) => store.updateBlock(block.id, key, val)}
            />
          ))}
        </AnimatePresence>
      )}
    </main>
  );
}
