import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as NodePolyfills from 'vite-plugin-node-polyfills'; // Correct import for ES module

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    NodePolyfills(),  // Use the imported NodePolyfills
  ],
  resolve: {
    alias: {
      // Alias the crypto module to use the browser-friendly crypto-browserify
      crypto: 'crypto-browserify',
    },
  },
});
