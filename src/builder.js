import { createBlock, renderBlock, getDefaultProps } from './blocks.js';
import { renderProperties } from './properties.js';
import { exportHTML } from './exporter.js';

export class Builder {
  constructor(elements) {
    this.elements = elements;
    this.blocks = [];
    this.selectedId = null;
    this.nextId = 1;
  }

  init() {
    this.setupDragFromPalette();
    this.setupCanvasDrop();
    this.setupButtons();
  }

  // --- Drag from palette ---
  setupDragFromPalette() {
    const items = this.elements.componentList.querySelectorAll('.component-item');
    items.forEach(item => {
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('component-type', item.dataset.type);
        e.dataTransfer.effectAllowed = 'copy';
      });
    });
  }

  // --- Drop onto canvas ---
  setupCanvasDrop() {
    const { canvas, canvasEmpty } = this.elements;

    canvas.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      canvasEmpty.classList.add('drag-over');
    });

    canvas.addEventListener('dragleave', () => {
      canvasEmpty.classList.remove('drag-over');
    });

    canvas.addEventListener('drop', e => {
      e.preventDefault();
      canvasEmpty.classList.remove('drag-over');
      const type = e.dataTransfer.getData('component-type');
      if (type) {
        this.addBlock(type);
      }
    });
  }

  // --- Add block ---
  addBlock(type) {
    const block = createBlock(type, this.nextId++);
    this.blocks.push(block);
    this.renderCanvas();
    this.selectBlock(block.id);
  }

  // --- Render canvas ---
  renderCanvas() {
    const { canvas, canvasEmpty } = this.elements;

    // Remove existing block elements
    canvas.querySelectorAll('.canvas-block').forEach(el => el.remove());

    if (this.blocks.length === 0) {
      canvasEmpty.style.display = '';
    } else {
      canvasEmpty.style.display = 'none';
      this.blocks.forEach(block => {
        const el = this.createBlockElement(block);
        canvas.appendChild(el);
      });
    }
  }

  // --- Create DOM element for a block ---
  createBlockElement(block) {
    const el = document.createElement('div');
    el.className = 'canvas-block';
    el.dataset.id = block.id;
    if (block.id === this.selectedId) el.classList.add('selected');

    el.innerHTML = `
      <div class="block-toolbar">
        <button class="move-up-btn" title="Move up">↑</button>
        <button class="move-down-btn" title="Move down">↓</button>
        <button class="duplicate-btn" title="Duplicate">⧉</button>
        <button class="delete-btn" title="Delete">✕</button>
      </div>
      ${renderBlock(block)}
    `;

    // Select on click
    el.addEventListener('click', e => {
      if (!e.target.closest('.block-toolbar')) {
        this.selectBlock(block.id);
      }
    });

    // Toolbar actions
    el.querySelector('.move-up-btn').addEventListener('click', e => {
      e.stopPropagation();
      this.moveBlock(block.id, -1);
    });
    el.querySelector('.move-down-btn').addEventListener('click', e => {
      e.stopPropagation();
      this.moveBlock(block.id, 1);
    });
    el.querySelector('.duplicate-btn').addEventListener('click', e => {
      e.stopPropagation();
      this.duplicateBlock(block.id);
    });
    el.querySelector('.delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      this.deleteBlock(block.id);
    });

    // Make content editable for text blocks
    const editable = el.querySelector('[contenteditable]');
    if (editable) {
      editable.addEventListener('input', () => {
        block.props.content = editable.innerText;
      });
    }

    return el;
  }

  // --- Select block ---
  selectBlock(id) {
    this.selectedId = id;
    this.renderCanvas();
    const block = this.blocks.find(b => b.id === id);
    if (block) {
      this.elements.propertiesContent.innerHTML = renderProperties(block);
      this.bindPropertyInputs(block);
    }
  }

  // --- Bind property inputs ---
  bindPropertyInputs(block) {
    const inputs = this.elements.propertiesContent.querySelectorAll('[data-prop]');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        block.props[input.dataset.prop] = input.value;
        this.renderCanvas();
      });
      input.addEventListener('change', () => {
        block.props[input.dataset.prop] = input.value;
        this.renderCanvas();
      });
    });
  }

  // --- Block operations ---
  moveBlock(id, direction) {
    const idx = this.blocks.findIndex(b => b.id === id);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= this.blocks.length) return;
    [this.blocks[idx], this.blocks[newIdx]] = [this.blocks[newIdx], this.blocks[idx]];
    this.renderCanvas();
  }

  duplicateBlock(id) {
    const idx = this.blocks.findIndex(b => b.id === id);
    const original = this.blocks[idx];
    const clone = {
      ...original,
      id: this.nextId++,
      props: { ...original.props },
    };
    this.blocks.splice(idx + 1, 0, clone);
    this.renderCanvas();
    this.selectBlock(clone.id);
  }

  deleteBlock(id) {
    this.blocks = this.blocks.filter(b => b.id !== id);
    if (this.selectedId === id) {
      this.selectedId = null;
      this.elements.propertiesContent.innerHTML =
        '<p class="properties-empty">Select a component to edit its properties</p>';
    }
    this.renderCanvas();
  }

  // --- Buttons ---
  setupButtons() {
    this.elements.previewBtn.addEventListener('click', () => this.openPreview());
    this.elements.exportBtn.addEventListener('click', () => this.exportPage());
  }

  openPreview() {
    const html = exportHTML(this.blocks, { preview: true });
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Preview</h3>
          <button class="modal-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="preview-frame">${html}</div>
        </div>
      </div>
    `;
    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  exportPage() {
    const html = exportHTML(this.blocks, { preview: false });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    a.click();
    URL.revokeObjectURL(url);
  }
}
