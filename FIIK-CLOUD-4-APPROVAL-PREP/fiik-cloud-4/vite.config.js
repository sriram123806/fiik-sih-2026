import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// FIIK — Cloud 4 module. Kept as a standalone Vite app so it can run
// independently, and so its src/ tree can be merged into the shared
// FIIK shell later without carrying framework-specific baggage.
export default defineConfig({
  plugins: [react()],
  base: './',
})
