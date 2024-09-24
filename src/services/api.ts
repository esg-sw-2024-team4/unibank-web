import axios, { AxiosInstance } from 'axios';
import {
  IMResponse,
  IProblem,
  IRequestBodyProblem,
  ISResponse,
  ISubject,
} from '../interfaces';

const API_URL = '/api';

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

export const authenticate = () => {
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

export const fetchUserInfo = async () => {
  try {
    const res = await instance.get(`/auth/fetch`);
    if (res.status === 204) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};

export const signout = async () => {
  try {
    const { data } = await instance.post(`/auth/signout`);
    return data;
  } catch (error) {
    console.error('Failed to sign out:', error);
  }
};

export const getSubjectsByKeyword = async (search: string) => {
  try {
    const { data } = await instance.get<IMResponse<ISubject>>(`/subjects`, {
      params: { search },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch subjects:', error);
  }
};

export const postSubject = async (subject: Omit<ISubject, 'id'>) => {
  try {
    const { data } = await instance.post(`/subjects`, subject);
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

export const getProblems = async (subjectId: number) => {
  try {
    const qs = subjectId ? `?subject_id=${subjectId}` : '';
    const { data } = await instance.get<IMResponse<IProblem>>(
      `/questions${qs}`
    );
    return data;
  } catch (error) {
    console.error('문제 리스트 받기 실패', error);
  }
};

export const postProblem = async (problem: Omit<IRequestBodyProblem, 'id'>) => {
  try {
    const { data } = await instance.post<IProblem>(`/questions`, problem);
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const putProblem = async (problem: IRequestBodyProblem) => {
  try {
    const { id, ...r } = problem;
    const { data } = await instance.put<IProblem>(`/questions/${id}`, r);
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const deleteProblem = async (id: number) => {
  try {
    const { data } = await instance.delete<IProblem>(`/questions/${id}`);
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const submitSolution = async (id: number, answer: number) => {
  try {
    const { data } = await instance.post(`/questions/${id}/submit`, { answer });
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};

export const toggleFavorite = async (id: number) => {
  try {
    const { data } = await instance.post(`/questions/${id}/favorite`);
    return data;
  } catch (error) {
    console.error('Failed to post a problem:', error);
  }
};
