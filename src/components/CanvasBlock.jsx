import { motion } from 'framer-motion';
import { BlockContent } from './BlockContent.jsx';

const blockVariants = {
  initial: { opacity: 0, y: -12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.15, ease: 'easeIn' } },
};

export function CanvasBlock({
  block, selected,
  onSelect, onMoveUp, onMoveDown, onDuplicate, onDelete, onContentChange,
}) {
  return (
    <motion.div
      layout
      variants={blockVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`canvas-block${selected ? ' selected' : ''}`}
      onClick={e => { if (!e.target.closest('.block-toolbar')) onSelect(); }}
      whileHover={{ boxShadow: '0 0 0 2px rgba(59,130,246,0.2)' }}
    >
      <div className="block-toolbar">
        <button className="move-up-btn"   title="Move up"    onClick={e => { e.stopPropagation(); onMoveUp(); }}>↑</button>
        <button className="move-down-btn" title="Move down"  onClick={e => { e.stopPropagation(); onMoveDown(); }}>↓</button>
        <button className="duplicate-btn" title="Duplicate"  onClick={e => { e.stopPropagation(); onDuplicate(); }}>⧉</button>
        <button className="delete-btn"    title="Delete"     onClick={e => { e.stopPropagation(); onDelete(); }}>✕</button>
      </div>
      <BlockContent block={block} onChange={onContentChange} />
    </motion.div>
  );
}
