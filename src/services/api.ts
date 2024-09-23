import axios, { AxiosInstance } from 'axios';
import {
  IMResponse,
  IProblem,
  IRequestBodyProblem,
  ISResponse,
  ISubject,
} from '../interfaces';

const API_URL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_URL_API_SERVER;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
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
    `${API_URL}/auth${import.meta.env.DEV ? '?local=true' : ''}`,
    'Login via Google...',
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

export const checkToken = (token: string) =>
  instance.get(`/auth/check`, withBearer(token));

export const getSubjectsByKeyword = async (search: string) => {
  const { data } = await instance.get<IMResponse<ISubject>>(`/subjects`, {
    params: { search },
  });
  return data;
};

export const postSubject = async (
  token: string,
  subject: Omit<ISubject, 'id'>
) => {
  try {
    const { data } = await instance.post(
      `/subjects`,
      subject,
      withBearer(token)
    );
    return data;
  } catch (error) {
    console.error('Failed to post a subject:', error);
  }
};

export const getSubjectById = async (subjectId: number) => {
  try {
    if (!subjectId) {
      throw new Error('Invalid subject id...');
    }
    const { data } = await instance.get<ISResponse<ISubject>>(
      `/subjects/${subjectId}`
    );
    return data;
  } catch (error) {
    console.error('Failed to fetch a subject', error);
  }
};

export const getProblems = async (subjectId: number, token?: string) => {
  try {
    const qs = subjectId ? `?subject_id=${subjectId}` : '';
    const { data } = await instance.get<IMResponse<IProblem>>(
      `/questions${qs}`,
      token ? withBearer(token) : {}
    );
    return data;
  } catch (error) {
    console.error('문제 리스트 받기 실패', error);
  }
};

export const postProblem = async (
  token: string,
  problem: Omit<IRequestBodyProblem, 'id'>
) => {
  try {
    const { data } = await instance.post<IProblem>(
      `/questions`,
      problem,
      withBearer(token)
    );
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const putProblem = async (
  token: string,
  problem: IRequestBodyProblem
) => {
  try {
    const { id, ...r } = problem;
    const { data } = await instance.put<IProblem>(
      `/questions/${id}`,
      r,
      withBearer(token)
    );
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const deleteProblem = async (token: string, id: number) => {
  try {
    const { data } = await instance.delete<IProblem>(
      `/questions/${id}`,
      withBearer(token)
    );
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const submitSolution = async (
  token: string,
  id: number,
  answer: number
) => {
  try {
    const { data } = await instance.post(
      `/questions/${id}/submit`,
      { answer },
      withBearer(token)
    );
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const toggleFavorite = async (token: string, id: number) => {
  try {
    const { data } = await instance.post(
      `/questions/${id}/favorite`,
      {},
      withBearer(token)
    );
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};
