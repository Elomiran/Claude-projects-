import { motion, AnimatePresence } from 'framer-motion';
import { exportHTML } from '../exporter.js';

export function PreviewModal({ blocks, onClose }) {
  const html = exportHTML(blocks, { preview: true });

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
          exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } }}
        >
          <div className="modal-header">
            <h3>Preview</h3>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div className="modal-body">
            <div
              className="preview-frame"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
