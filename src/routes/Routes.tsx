import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import Header from '../components/shared/Header';
import Home from '../pages/Home';
import Subject from '../pages/Subject';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/subject"
          element={
            <>
              <Header />
              <Subject />
            </>
          }
        />
        {/* <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignIn />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
