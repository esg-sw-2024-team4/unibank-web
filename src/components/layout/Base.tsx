import Header from '../shared/Header';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
