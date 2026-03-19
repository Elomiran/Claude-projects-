export function getDefaultProps(type) {
  const defaults = {
    heading: {
      content: 'New Heading',
      level: 'h2',
      align: 'left',
      color: '#1e293b',
    },
    paragraph: {
      content: 'Start typing your text here...',
      align: 'left',
      color: '#334155',
    },
    image: {
      src: '',
      alt: 'Image',
      width: '100%',
    },
    button: {
      label: 'Click Me',
      href: '#',
      align: 'left',
      color: '#4f46e5',
    },
    section: {
      bg: '#f8f9fa',
      padding: '2rem',
    },
    columns: {
      col1: 'Column 1 content',
      col2: 'Column 2 content',
    },
  };
  return { ...(defaults[type] || {}) };
}

export function createBlock(type, id) {
  return { id, type, props: getDefaultProps(type) };
}

export function renderBlock(block) {
  const { type, props } = block;
  switch (type) {
    case 'heading': {
      const Tag = props.level || 'h2';
      return `<${Tag} class="block-heading" contenteditable="true" style="text-align:${props.align};color:${props.color}">${props.content}</${Tag}>`;
    }
    case 'paragraph':
      return `<p class="block-paragraph" contenteditable="true" style="text-align:${props.align};color:${props.color}">${props.content}</p>`;
    case 'image':
      if (props.src) {
        return `<img src="${props.src}" alt="${props.alt}" style="width:${props.width};max-width:100%;border-radius:6px;" />`;
      }
      return `<div class="block-image">📷 No image URL set</div>`;
    case 'button':
      return `<div class="block-button-wrap" style="justify-content:${props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start'}">
        <span class="block-button-el" contenteditable="true" style="background:${props.color}">${props.label}</span>
      </div>`;
    case 'section':
      return `<div class="block-section" style="background:${props.bg};padding:${props.padding}">Section — drop content here</div>`;
    case 'columns':
      return `<div class="block-columns">
        <div class="block-column" contenteditable="true">${props.col1}</div>
        <div class="block-column" contenteditable="true">${props.col2}</div>
      </div>`;
    default:
      return `<div>Unknown block: ${type}</div>`;
  }
}
