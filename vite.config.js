import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // React builder app
        main: 'index.html',
        // Elòmiràn Consult static pages
        site: 'site/index.html',
        about: 'site/about.html',
        contact: 'site/contact.html',
        services: 'site/services.html',
        'how-we-work': 'site/how-we-work.html',
      },
    },
  },
});
