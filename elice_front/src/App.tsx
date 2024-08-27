import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import LogIn from "./pages/LogIn";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
