import { Builder } from './builder.js';

const builder = new Builder({
  canvas: document.getElementById('canvas'),
  canvasEmpty: document.getElementById('canvasEmpty'),
  componentList: document.getElementById('componentList'),
  propertiesContent: document.getElementById('propertiesContent'),
  previewBtn: document.getElementById('previewBtn'),
  exportBtn: document.getElementById('exportBtn'),
});

builder.init();
