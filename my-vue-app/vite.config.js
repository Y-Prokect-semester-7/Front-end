import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Use dynamic import for NodePolyfills
let NodePolyfills;
if (process.env.BUILD_ENV === 'development') {
  NodePolyfills = import('vite-plugin-node-polyfills');
}

export default defineConfig({
  plugins: [
    vue(),
    NodePolyfills ? NodePolyfills() : undefined, // Dynamically use the plugin
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
});
