import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { PATHS } from '../interfaces';
import Home from '../pages/Home';
import Subject from '../pages/Subject';
import WriteQuestion from '../pages/WriteQuestion';
import BaseLayout from '../components/layout/BaseLayout';
import NotFound from '../pages/NotFound';
import EditQuestion from '../pages/EditQuestion';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATHS.home} element={<Home />} />
        <Route element={<BaseLayout />}>
          <Route path={PATHS.subjectById}>
            <Route index element={<Navigate to={PATHS.notFound} replace />} />
            <Route path={`${PATHS.subjectById}/:id`} element={<Subject />} />
          </Route>
          <Route path={PATHS.write} element={<WriteQuestion />} />
          <Route path={PATHS.edit} element={<EditQuestion />} />
          <Route path={PATHS.notFound} element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
