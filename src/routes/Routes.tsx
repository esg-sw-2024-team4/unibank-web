import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import Home from '../pages/Home';
import Subject from '../pages/Subject';
import BaseLayout from '../components/layout/Base';

export const PATHS = {
  auth: '/auth',
  home: '/',
  subjectById: '/subjects',
  notFound: '/404',
} as const;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATHS.auth} element={<Auth />} />
        <Route element={<BaseLayout />}>
          <Route
            path={PATHS.home}
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path={PATHS.subjectById}>
            <Route index element={<div>Subject List</div>} />
            <Route
              path={`${PATHS.subjectById}/:id`}
              element={
                <>
                  <Subject />
                </>
              }
            />
          </Route>
          <Route path={PATHS.notFound} element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
