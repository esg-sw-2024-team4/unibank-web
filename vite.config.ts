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
        description: '공학수학1에 대한 설명',
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
      {
        id: 1,
        subject_id: 1,
        author_id: 1,
        question_text: '다음 편미분방정식의 해를 구하라',
        image_url: 'http://example.com/image1.png',
        source: 'Basic Arithmetic Textbook',
      },
      {
        id: 2,
        subject_id: 1,
        author_id: 2,
        question_text:
          '다음 편미분방정식의 계수와 독립 및 종속변수에 대하여 설명하라',
        image_url: 'http://example.com/image1.png',
        source: 'Basic Arithmetic Textbook',
      },
      {
        id: 3,
        subject_id: 1,
        author_id: 1,
        question_text: 'What is 2+5?',
        image_url: 'http://example.com/image1.png',
        source: 'Basic Arithmetic Textbook',
      },
      {
        id: 4,
        subject_id: 1,
        author_id: 1,
        question_text: 'What is 2*5?',
        image_url: 'http://example.com/image1.png',
        source: 'Basic Arithmetic Textbook',
      },
      {
        id: 5,
        subject_id: 2,
        author_id: 2,
        question_text: 'Explain the theory of relativity.',
        image_url: '',
        source: 'Advanced Physics Lecture Notes',
      },
    ];
    app.get('/api/auth/check', (_: any, res: any) => {
      user = {
        id: 1,
        name: 'admin',
        email: 'unibank@unibank.test.io',
        point: 99999,
      };
      res.json(user);
    });
    app.get('/api/subjects', (req: any, res: any) => {
      const { search } = req.query;
      const filteredSubjects = !search
        ? subjects
        : subjects.filter((subject) =>
            subject.name.toLowerCase().includes(search.toLowerCase())
          );
      res.json({
        metadata: { total: filteredSubjects.length },
        data: filteredSubjects,
      });
    });
    app.post('/api/subjects', (req: any, res: any) => {
      if (!user) {
        res.status(401).end();
        return;
      }
      if (subjects.find((subject) => subject.name === req.body.name)) {
        res.status(400).json({ message: 'Subject already exists' });
        return;
      }
      const newSubject = {
        id: subjects.length + 1,
        author_id: user.id,
        ...req.body,
      };
      subjects.push(newSubject);
      res.json({ data: newSubject });
    });
    app.get('/api/subjects/:id', (req: any, res: any) => {
      const id = subjects.findIndex((subject) => subject.id === +req.params.id);
      if (id === -1) {
        res.status(404).end();
        return;
      }
      res.json({ data: subjects[id] });
    });
    app.get('/api/questions', (_: any, res: any) => {
      res.json({ metadata: { total: questions.length }, data: questions });
    });
    app.post('/api/questions', (req: any, res: any) => {
      if (!user) {
        res.status(401).end();
        return;
      }
      const newQuestion = {
        id: questions.length + 1,
        author_id: user.id,
        ...req.body,
      };
      questions.push(newQuestion);
      res.json({ data: newQuestion });
    });
    app.put('/api/questions/:id', (req: any, res: any) => {
      const id = questions.findIndex(
        (question) => question.id === +req.params.id
      );
      if (id === -1) {
        res.status(404).end();
        return;
      }
      questions[id] = { ...questions[id], ...req.body };
      res.status(204).end();
    });
    app.delete('/api/questions/:id', (req: any, res: any) => {
      const id = questions.findIndex(
        (question) => question.id === +req.params.id
      );
      if (id === -1) {
        res.status(404).end();
        return;
      }
      questions.splice(id, 1);
      res.status(204).end();
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
              port: 5173,
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
