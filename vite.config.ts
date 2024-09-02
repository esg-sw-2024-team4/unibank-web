import { defineConfig, loadEnv, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

let app: any;

if (process.env.NODE_ENV === 'development') {
  import('express').then((express) => {
    app = express.default();
    app.use(express.json());
    let user: any = null;
    const subjects = [
      {
        id: 1,
        name: '공학수학1',
        description: '공학수학1',
      },
      {
        id: 2,
        name: '미적분학',
        description: '미적분학',
      },
      {
        id: 3,
        name: '확률과통계',
        description: '확률과통계',
      },
      {
        id: 4,
        name: '회귀분석1',
        description: '확률과통계',
      },
    ];
    const questions = [
      [
        {
          id: 1,
          subject_id: 1,
          author_id: 1,
          question_text: 'What is 2+2?',
          question_type: 'multiple_choice',
          image_url: 'http://example.com/image1.png',
          source: 'Basic Arithmetic Textbook',
        },
        {
          id: 2,
          subject_id: 2,
          author_id: 2,
          question_text: 'Explain the theory of relativity.',
          question_type: 'short_answer',
          image_url: null,
          source: 'Advanced Physics Lecture Notes',
        },
      ],
    ];
    app.get('/api/auth/check', (req: any, res: any) => {
      user = {
        id: 1,
        name: 'admin',
        email: 'unibank@unibank.test.io',
        point: 99999,
      };
      res.json(user);
    });
    app.get('/api/subjects', (req: any, res: any) => {
      res.json({ metadata: { total: subjects.length }, data: subjects });
    });
    app.get('/api/questions', (req: any, res: any) => {
      res.json({ metadata: { total: questions.length }, data: questions });
    });
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
