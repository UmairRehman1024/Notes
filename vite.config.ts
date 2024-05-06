import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  define: {
    // "process.env": process.env,
    // // By default, Vite doesn't include shims for NodeJS/
    // // necessary for segment analytics lib to work
    "global": {},
  },
  plugins: [react()],
  resolve: {
    alias: {
      
      '@/components': path.resolve(__dirname, './@/components'),
      '@/lib': path.resolve(__dirname, './@/lib'),
      
    }
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
