import { useState, useCallback } from 'react';

let nextId = 1;

const DEFAULT_PROPS = {
  heading:   { content: 'New Heading', level: 'h2', align: 'left', color: '#1e293b' },
  paragraph: { content: 'Start typing your text here...', align: 'left', color: '#334155' },
  image:     { src: '', alt: 'Image', width: '100%' },
  button:    { label: 'Click Me', href: '#', align: 'left', color: '#4f46e5' },
  section:   { bg: '#f8f9fa', padding: '2rem' },
  columns:   { col1: 'Column 1 content', col2: 'Column 2 content' },
};

function makeBlock(type) {
  return { id: nextId++, type, props: { ...DEFAULT_PROPS[type] } };
}

export function useBuilderStore() {
  const [blocks, setBlocks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addBlock = useCallback((type) => {
    const block = makeBlock(type);
    setBlocks(prev => [...prev, block]);
    setSelectedId(block.id);
  }, []);

  const updateBlock = useCallback((id, propKey, value) => {
    setBlocks(prev =>
      prev.map(b => b.id === id ? { ...b, props: { ...b.props, [propKey]: value } } : b)
    );
  }, []);

  const moveBlock = useCallback((id, direction) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  }, []);

  const duplicateBlock = useCallback((id) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      const original = prev[idx];
      const clone = { ...original, id: nextId++, props: { ...original.props } };
      const next = [...prev];
      next.splice(idx + 1, 0, clone);
      setSelectedId(clone.id);
      return next;
    });
  }, []);

  const deleteBlock = useCallback((id) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    setSelectedId(prev => prev === id ? null : prev);
  }, []);

  const selectedBlock = blocks.find(b => b.id === selectedId) ?? null;

  return {
    blocks,
    selectedId,
    selectedBlock,
    setSelectedId,
    addBlock,
    updateBlock,
    moveBlock,
    duplicateBlock,
    deleteBlock,
  };
}
