import { motion, AnimatePresence } from 'framer-motion';

const ALIGN_OPTIONS = ['left', 'center', 'right'];
const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4'];

function Field({ label, propKey, value, type = 'text', onChange }) {
  return (
    <div className="prop-group">
      <label className="prop-label">{label}</label>
      <input
        className="prop-input"
        type={type}
        value={value ?? ''}
        onChange={e => onChange(propKey, e.target.value)}
      />
    </div>
  );
}

function Select({ label, propKey, value, options, onChange }) {
  return (
    <div className="prop-group">
      <label className="prop-label">{label}</label>
      <select className="prop-input" value={value ?? ''} onChange={e => onChange(propKey, e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o.toUpperCase()}</option>)}
      </select>
    </div>
  );
}

function PropsForm({ block, onUpdate }) {
  const { type, props } = block;
  const f = (label, key, inputType) => (
    <Field key={key} label={label} propKey={key} value={props[key]} type={inputType} onChange={(k, v) => onUpdate(block.id, k, v)} />
  );
  const s = (label, key, options) => (
    <Select key={key} label={label} propKey={key} value={props[key]} options={options} onChange={(k, v) => onUpdate(block.id, k, v)} />
  );

  switch (type) {
    case 'heading':   return <>{f('Text', 'content')}{s('Level', 'level', HEADING_LEVELS)}{s('Align', 'align', ALIGN_OPTIONS)}{f('Color', 'color', 'color')}</>;
    case 'paragraph': return <>{f('Text', 'content')}{s('Align', 'align', ALIGN_OPTIONS)}{f('Color', 'color', 'color')}</>;
    case 'image':     return <>{f('Image URL', 'src', 'url')}{f('Alt Text', 'alt')}{f('Width', 'width')}</>;
    case 'button':    return <>{f('Label', 'label')}{f('Link (href)', 'href', 'url')}{s('Align', 'align', ALIGN_OPTIONS)}{f('Color', 'color', 'color')}</>;
    case 'section':   return <>{f('Background', 'bg', 'color')}{f('Padding', 'padding')}</>;
    case 'columns':   return <>{f('Column 1 Text', 'col1')}{f('Column 2 Text', 'col2')}</>;
    default: return <p className="properties-empty">No properties available</p>;
  }
}

export function PropertiesPanel({ block, onUpdate }) {
  return (
    <aside className="properties">
      <h2 className="sidebar-title">Properties</h2>
      <div className="properties-content">
        <AnimatePresence mode="wait">
          {block ? (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
              exit={{ opacity: 0, x: 12, transition: { duration: 0.12 } }}
            >
              <PropsForm block={block} onUpdate={onUpdate} />
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              className="properties-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Select a component to edit its properties
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
