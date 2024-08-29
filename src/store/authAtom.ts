import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    accessToken: '',
    id: '',
    name: '',
    email: '',
    point: '',
  },
});
