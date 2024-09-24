import { FC, useEffect } from 'react';

import { fetchUserInfo, clearCredentials } from './services/api';

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
        ['id', 'name', 'email', 'point'].includes(key) &&
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
    fetchUserInfo()
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          const { id, name, email, point } = res.data;
          localStorage.setItem('id', id);
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
          localStorage.setItem('point', point);
          setAuth({
            isAuthenticated: true,
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
          id: '',
          name: '',
          email: '',
          point: '',
        });
      });
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);
  return <AppRoutes />;
};

export default App;
