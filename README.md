# Claude Website Builder

A drag-and-drop website builder built with vanilla JavaScript and Vite.

## Features

- **Drag & Drop** — drag components from the palette onto the canvas
- **Component types**: Heading, Paragraph, Image, Button, Section, Columns
- **Properties panel** — edit content, styles, and settings for each block
- **Block toolbar** — move up/down, duplicate, or delete any block
- **Preview** — see your page rendered in a modal
- **Export** — download a standalone `page.html` file

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Project Structure

```
├── index.html          # App entry point
├── vite.config.js      # Vite config
├── package.json
└── src/
    ├── main.js         # Bootstrap
    ├── builder.js      # Core Builder class (canvas, selection, drag/drop)
    ├── blocks.js       # Block definitions and HTML rendering
    ├── properties.js   # Properties panel rendering
    ├── exporter.js     # HTML export / preview
    └── style.css       # All styles
```
