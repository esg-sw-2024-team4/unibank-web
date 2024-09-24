import { FC, useEffect } from 'react';

import { fetchUserInfo } from './services/api';

import { useSetRecoilState } from 'recoil';
import { authState } from './store/authAtom';

import AppRoutes from './routes/Routes';

const App: FC = () => {
  const setAuth = useSetRecoilState(authState);
  useEffect(() => {
    fetchUserInfo()
      .then((data) => {
        if (data !== null) {
          const { id, name, email, point } = data;
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
        setAuth({
          isAuthenticated: false,
          id: '',
          name: '',
          email: '',
          point: '',
        });
      });
  }, []);
  return <AppRoutes />;
};

export default App;
