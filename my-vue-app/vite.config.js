import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Correctly resolve the crypto module using 'path' for ESM compatibility
      crypto: path.resolve(__dirname, 'node_modules/crypto-browserify'),
    },
  },
});
