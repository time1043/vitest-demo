/// <reference types="vitest/config" />
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // https://vitest.dev/config/environment#environment
    environment: 'jsdom',
    // https://vitest.dev/config/globals#globals
    globals: true,
    // https://vitest.dev/config/setupfiles#setupfiles
    setupFiles: ['./tests/setup.ts'],
    // https://vitest.dev/guide/coverage#coverage-setup
    coverage: {
      provider: 'v8', // or 'istanbul'
      enabled: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx'],
    },
  },
})
