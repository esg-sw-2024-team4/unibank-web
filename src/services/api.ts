import axios, { AxiosInstance } from 'axios';
import { IMResponse, IProblem, ISubject } from '../interfaces';

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
  return window.open(
    import.meta.env.DEV ? '/auth?token=abcd1234' : '/api/auth',
    'Login via Google...',
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export const checkToken = (token: string) =>
  instance.get('/api/auth/check', withBearer(token));

export const getSubjectsAll = async () => {
  try {
    const res = await instance.get<IMResponse<ISubject>>('/api/subjects');
    const { data } = res;
    return data;
  } catch (error) {
    console.error('Failed to fetch subject data:', error);
  }
};

export const getSubjectById = async (subjectId: number) => {
  if (!subjectId) {
    throw new Error('Invalid subject id...');
  }
  const res = await getSubjectsAll();
  const allSubjects = res?.data || [];
  const foundSubject = allSubjects.find((subject) => subject.id === subjectId);
  if (!foundSubject) {
    throw new Error('No subjects found...');
  }
  return foundSubject;
};

export const getProblemsAll = async () => {
  try {
    const res = await instance.get<IMResponse<IProblem>>('/api/questions');
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

export const searchSubjects = async (searchTerm: string) => {
  try {
    const allSubjects = await getSubjectsAll();
    const filteredSubjects = allSubjects?.data.filter((subject: ISubject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredSubjects;
  } catch (error) {
    console.error('Failed to search subjects:', error);
    return [];
  }
};
