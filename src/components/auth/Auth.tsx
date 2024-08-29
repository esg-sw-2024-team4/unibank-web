import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { checkToken } from '../../services/api';

const Auth: FC = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      window.history.replaceState({}, 'Login via Google...', '/auth');
      checkToken(token)
        .then((res) => {
          if (res.data) {
            const { id, name, email, point } = res.data;
            localStorage.setItem('id', id);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('point', point);
            localStorage.setItem('accessToken', token);
            window.dispatchEvent(new Event('storage'));
          }
        })
        .finally(() => {
          window.close();
        });
    }
  }, [searchParams]);
  return <></>;
};

export default Auth;
