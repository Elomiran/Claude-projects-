export function renderProperties(block) {
  const { type, props } = block;

  const field = (label, key, inputType = 'text', extra = '') =>
    `<div class="prop-group">
      <label class="prop-label">${label}</label>
      <input class="prop-input" type="${inputType}" data-prop="${key}" value="${props[key] || ''}" ${extra} />
    </div>`;

  const select = (label, key, options) => {
    const opts = options.map(o =>
      `<option value="${o.value}" ${props[key] === o.value ? 'selected' : ''}>${o.label}</option>`
    ).join('');
    return `<div class="prop-group">
      <label class="prop-label">${label}</label>
      <select class="prop-input" data-prop="${key}">${opts}</select>
    </div>`;
  };

  const alignOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];

  const headingLevels = ['h1', 'h2', 'h3', 'h4'].map(v => ({ value: v, label: v.toUpperCase() }));

  switch (type) {
    case 'heading':
      return `
        ${field('Text', 'content')}
        ${select('Level', 'level', headingLevels)}
        ${select('Align', 'align', alignOptions)}
        ${field('Color', 'color', 'color')}
      `;
    case 'paragraph':
      return `
        ${field('Text', 'content')}
        ${select('Align', 'align', alignOptions)}
        ${field('Color', 'color', 'color')}
      `;
    case 'image':
      return `
        ${field('Image URL', 'src', 'url')}
        ${field('Alt Text', 'alt')}
        ${field('Width', 'width')}
      `;
    case 'button':
      return `
        ${field('Label', 'label')}
        ${field('Link (href)', 'href', 'url')}
        ${select('Align', 'align', alignOptions)}
        ${field('Color', 'color', 'color')}
      `;
    case 'section':
      return `
        ${field('Background', 'bg', 'color')}
        ${field('Padding', 'padding')}
      `;
    case 'columns':
      return `
        ${field('Column 1 Text', 'col1')}
        ${field('Column 2 Text', 'col2')}
      `;
    default:
      return '<p class="properties-empty">No properties available</p>';
  }
}
