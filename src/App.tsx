import { FC, useEffect } from 'react';

import { checkToken, clearCredentials } from './services/api';

import { useRecoilState } from 'recoil';
import { authState } from './store/authAtom';

import AppRoutes from './routes/Routes';

const App: FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    const listener = (event: StorageEvent) => {
      const { key } = event;
      if (
        key &&
        ['id', 'name', 'email', 'point', 'accessToken'].includes(key) &&
        event.newValue
      ) {
        setAuth({
          ...auth,
          isAuthenticated: true,
          [key]: event.newValue,
        });
      }
    };
    window.addEventListener('storage', listener);
    const token = localStorage.getItem('accessToken');
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res.data) {
            const { id, name, email, point } = res.data;
            localStorage.setItem('id', id);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('point', point);
            localStorage.setItem('accessToken', token);
            setAuth({
              isAuthenticated: true,
              accessToken: token,
              id,
              name,
              email,
              point,
            });
          }
        })
        .catch(() => {
          clearCredentials();
          setAuth({
            isAuthenticated: false,
            accessToken: '',
            id: '',
            name: '',
            email: '',
            point: '',
          });
        });
    }
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);
  useEffect(() => {}, [auth]);
  return <AppRoutes />;
};

export default App;
