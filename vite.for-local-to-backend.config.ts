import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return defineConfig({
    base: '/',
    plugins: [
      react(),
      {
        name: 'http-proxy-middleware',
        config() {
          return {
            server: {
              proxy: {
                '/api': {
                  target: process.env.VITE_URL_API_SERVER,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, ''),
                },
              },
            },
            preview: {
              proxy: {
                '/api': {
                  target: process.env.VITE_URL_API_SERVER,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, ''),
                },
              },
            },
          };
        },
      },
    ],
  });
};
