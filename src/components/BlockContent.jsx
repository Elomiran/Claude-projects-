export function BlockContent({ block, onChange }) {
  const { type, props } = block;

  switch (type) {
    case 'heading': {
      const Tag = props.level || 'h2';
      return (
        <Tag
          className="block-heading"
          contentEditable
          suppressContentEditableWarning
          style={{ textAlign: props.align, color: props.color }}
          onBlur={e => onChange('content', e.currentTarget.innerText)}
        >
          {props.content}
        </Tag>
      );
    }
    case 'paragraph':
      return (
        <p
          className="block-paragraph"
          contentEditable
          suppressContentEditableWarning
          style={{ textAlign: props.align, color: props.color }}
          onBlur={e => onChange('content', e.currentTarget.innerText)}
        >
          {props.content}
        </p>
      );
    case 'image':
      return props.src
        ? <img src={props.src} alt={props.alt} style={{ width: props.width, maxWidth: '100%', borderRadius: 6 }} />
        : <div className="block-image">📷 No image URL set</div>;
    case 'button': {
      const justify = props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start';
      return (
        <div className="block-button-wrap" style={{ justifyContent: justify }}>
          <span
            className="block-button-el"
            contentEditable
            suppressContentEditableWarning
            style={{ background: props.color }}
            onBlur={e => onChange('label', e.currentTarget.innerText)}
          >
            {props.label}
          </span>
        </div>
      );
    }
    case 'section':
      return (
        <div
          className="block-section"
          style={{ background: props.bg, padding: props.padding }}
        >
          Section — drop content here
        </div>
      );
    case 'columns':
      return (
        <div className="block-columns">
          <div
            className="block-column"
            contentEditable
            suppressContentEditableWarning
            onBlur={e => onChange('col1', e.currentTarget.innerText)}
          >
            {props.col1}
          </div>
          <div
            className="block-column"
            contentEditable
            suppressContentEditableWarning
            onBlur={e => onChange('col2', e.currentTarget.innerText)}
          >
            {props.col2}
          </div>
        </div>
      );
    default:
      return <div>Unknown block: {type}</div>;
  }
}
