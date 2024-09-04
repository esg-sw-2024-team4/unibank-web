import axios, { AxiosInstance } from 'axios';
import { IMResponse, IProblem, ISResponse, ISubject } from '../interfaces';

const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const withBearer = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const clearCredentials = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('point');
};

export const authenticate = () => {
  clearCredentials();
  const width = 500,
    height = 600,
    left = window.screenX + (window.outerWidth - width) / 2,
    top = window.screenY + (window.outerHeight - height) / 2;
  console.log(import.meta.env.IS_FORCE_PRODUCTION);
  return window.open(
    import.meta.env.VITE_IS_FORCE_PRODUCTION !== 'true' && import.meta.env.DEV
      ? '/auth?token=abcd1234'
      : `${import.meta.env.VITE_URL_API_SERVER}/auth`,
    'Login via Google...',
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export const checkToken = (token: string) =>
  instance.get('/api/auth/check', withBearer(token));

export const getSubjectsByKeyword = async (search: string) => {
  const res = await instance.get<IMResponse<ISubject>>('/api/subjects', {
    params: { search },
  });
  const { data } = res;
  return data;
};

export const postSubject = async (
  token: string,
  subject: Omit<ISubject, 'id'>
) => {
  try {
    const res = await instance.post(
      '/api/subjects',
      subject,
      withBearer(token)
    );
    return res.data;
  } catch (error) {
    console.error('Failed to post a subject:', error);
  }
};

export const getSubjectById = async (subjectId: number) => {
  if (!subjectId) {
    throw new Error('Invalid subject id...');
  }
  const res = await instance.get<ISResponse<ISubject>>(
    `/api/subjects/${subjectId}`
  );
  if (!res.data) {
    throw new Error('No subject found...');
  }
  const { data } = res;
  return data;
};

export const getProblemsAll = async (subjectId?: number) => {
  try {
    const qs = subjectId ? `?subject_id=${subjectId}` : '';
    const res = await instance.get<IMResponse<IProblem>>(`/api/questions${qs}`);
    const { data } = res;
    return data;
  } catch (error) {
    console.error('문제 리스트 받기 실패', error);
  }
};

export const getProblemsBySubjectId = async (subjectId: number) => {
  if (!subjectId) {
    throw new Error('Invalid subject id...');
  }
  const res = await getProblemsAll();
  const allProblems = res?.data || [];
  return allProblems.filter((problem) => problem.subject_id === subjectId);
};

export const postProblem = async (
  token: string,
  problem: Omit<IProblem, 'id'>
) => {
  try {
    const res = await instance.post(
      '/api/questions',
      problem,
      withBearer(token)
    );
    return res.data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const putProblem = async (token: string, problem: IProblem) => {
  try {
    const { id, subject_id, title, description, image_url, source } = problem;
    const res = await instance.put<IProblem>(
      `/api/questions/${id}`,
      {
        subject_id,
        title,
        description,
        image_url,
        source,
      },
      withBearer(token)
    );
    return res.data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const deleteProblem = async (token: string, id: number) => {
  try {
    const res = await instance.delete<IProblem>(
      `/api/questions/${id}`,
      withBearer(token)
    );
    return res.data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};
