import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// FIIK Cloud 3 — Pilot Execution + Evidence + Evaluation module.
// Independently runnable prototype; mounts under "/" so it can be
// re-based under a shared shell when merged with the other FIIK clouds.
export default defineConfig({
  plugins: [react()],
  base: './',
});
