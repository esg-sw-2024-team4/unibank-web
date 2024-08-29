import axios, { AxiosInstance } from 'axios';

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
