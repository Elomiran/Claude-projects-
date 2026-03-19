import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Claude-projects-/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',       // React drag-and-drop builder
        site: 'site/index.html',  // Elòmiràn Consult React SPA
      },
    },
  },
});
