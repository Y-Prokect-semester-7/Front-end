import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import NodePolyfills from 'vite-plugin-node-polyfills';


export default defineConfig({
  plugins: [
    vue(),
    NodePolyfills(),  // This should now work with the default import
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',  // Polyfill for crypto module if needed
    },
  },
});

