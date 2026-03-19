const COMPONENTS = [
  { type: 'heading',   icon: 'H',   label: 'Heading' },
  { type: 'paragraph', icon: 'P',   label: 'Paragraph' },
  { type: 'image',     icon: 'IMG', label: 'Image' },
  { type: 'button',    icon: 'BTN', label: 'Button' },
  { type: 'section',   icon: '[]',  label: 'Section' },
  { type: 'columns',   icon: '|||', label: 'Columns' },
];

export function Sidebar({ onAdd }) {
  function handleDragStart(e, type) {
    e.dataTransfer.setData('component-type', type);
    e.dataTransfer.effectAllowed = 'copy';
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Components</h2>
      <div className="component-list">
        {COMPONENTS.map(({ type, icon, label }) => (
          <div
            key={type}
            className="component-item"
            draggable
            onDragStart={e => handleDragStart(e, type)}
            onClick={() => onAdd(type)}
          >
            <span className="component-icon">{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
