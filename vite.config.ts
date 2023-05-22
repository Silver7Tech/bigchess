import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
const TARGET = process.env.PROXY_TARGET || 'http://localhost:3000';
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    port: 8000,
    host: true,
    open: true,
    strictPort: true,
    proxy: {
      '/trpc': {
        target: TARGET,
      },
      '/ws': {
        target: TARGET,
        ws: true,
      },
      '/api/v2': {
        target: TARGET,
        secure: false,
        configure(proxy, options) {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            req.setEncoding('utf8');
            proxyReq.setHeader('Host', new URL(TARGET).host);
            proxyReq.setHeader('Origin', TARGET);
            proxyReq.setHeader('Referer', TARGET);
          });
        },
      },
    },
  },
});
