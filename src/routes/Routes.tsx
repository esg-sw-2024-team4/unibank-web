import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Subject from '../pages/Subject';
import WriteQuestion from '../pages/WriteQuestion';
import BaseLayout from '../components/layout/BaseLayout';

export const PATHS = {
  home: '/',
  subjectById: '/subjects',
  write: '/write',
  notFound: '/404',
} as const;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path={PATHS.home}
          element={
            <>
              <Home />
            </>
          }
        />
        <Route element={<BaseLayout />}>
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
          <Route
            path={PATHS.write}
            element={
              <>
                <WriteQuestion />
              </>
            }
          />
          <Route path={PATHS.notFound} element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
