import apiMocker from 'connect-api-mocker';
import { defineConfig, loadEnv, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

let app: any;

if (process.env.NODE_ENV === 'development') {
  import('express').then((express) => {
    app = express.default();
    app.use('/api', apiMocker('mocks/api'));
  });
}

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
                '/api':
                  mode === 'production'
                    ? {
                        target: process.env.VITE_URL_API_SERVER,
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api/, ''),
                      }
                    : {},
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
        configureServer(serverDev: ViteDevServer) {
          if (mode !== 'production' && !!app) {
            serverDev.middlewares.use(app);
          }
        },
      },
    ],
  });
};
