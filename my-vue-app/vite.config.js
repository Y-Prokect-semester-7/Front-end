import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'node-polyfill-webpack-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Other aliases can go here
      crypto: require.resolve('crypto-browserify')
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        nodePolyfills()
      ],
    },
  },
});

