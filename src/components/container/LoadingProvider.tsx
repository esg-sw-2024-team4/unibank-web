import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loadingState } from '../../store/loadingAtom';
import Loading from '../loading/Loading';

const LoadingProvider = () => {
  const location = useLocation();
  const [loading, setLoading] = useRecoilState(loadingState);
  useEffect(() => {
    setLoading({ loadingRouting: true });
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading({ loadingRouting: false });
    }, 500);
    return () => clearTimeout(timer);
  }, [location, setLoading]);
  return (
    <>
      {loading.loadingRouting && <Loading />}
      <Outlet />
    </>
  );
};

export default LoadingProvider;
