import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Default: 3000
    hmr: {
        overlay: false,
    },
    open: true, // Automatically opens the app in the browser on startup
  },
  build: {
    outDir: 'dist', // Ensure the build output goes to the "build" directory
  }
});