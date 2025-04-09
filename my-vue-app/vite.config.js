import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',  // Polyfill for crypto module if needed
    },
  },
});

