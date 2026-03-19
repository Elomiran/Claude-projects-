export function exportHTML(blocks, { preview = false } = {}) {
  const bodyContent = blocks.map(block => blockToHTML(block)).join('\n');

  if (preview) {
    return bodyContent;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b; }
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    img { max-width: 100%; height: auto; }
    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 600px) { .columns { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    ${bodyContent}
  </div>
</body>
</html>`;
}

function blockToHTML(block) {
  const { type, props } = block;
  switch (type) {
    case 'heading': {
      const Tag = props.level || 'h2';
      return `<${Tag} style="text-align:${props.align};color:${props.color};margin-bottom:0.75rem">${escapeHTML(props.content)}</${Tag}>`;
    }
    case 'paragraph':
      return `<p style="text-align:${props.align};color:${props.color};line-height:1.7;margin-bottom:1rem">${escapeHTML(props.content)}</p>`;
    case 'image':
      if (!props.src) return '';
      return `<img src="${escapeAttr(props.src)}" alt="${escapeAttr(props.alt)}" style="width:${escapeAttr(props.width)};border-radius:6px;margin-bottom:1rem" />`;
    case 'button': {
      const justify = props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start';
      return `<div style="display:flex;justify-content:${justify};margin-bottom:1rem">
  <a href="${escapeAttr(props.href)}" style="display:inline-block;padding:0.5rem 1.25rem;background:${escapeAttr(props.color)};color:white;border-radius:6px;text-decoration:none;font-weight:500">${escapeHTML(props.label)}</a>
</div>`;
    }
    case 'section':
      return `<section style="background:${escapeAttr(props.bg)};padding:${escapeAttr(props.padding)};border-radius:8px;margin-bottom:1rem"></section>`;
    case 'columns':
      return `<div class="columns" style="margin-bottom:1rem">
  <div>${escapeHTML(props.col1)}</div>
  <div>${escapeHTML(props.col2)}</div>
</div>`;
    default:
      return '';
  }
}

function escapeHTML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str = '') {
  return String(str).replace(/"/g, '&quot;');
}
