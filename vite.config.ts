import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure a single copy of three across the app + postprocessing + r3f/drei
    // (stats-gl ships its own three; without this, "Multiple instances of Three.js"
    // breaks postprocessing's instanceof checks → the PixelBlast composer renders nothing).
    dedupe: ["three"],
  },
})
