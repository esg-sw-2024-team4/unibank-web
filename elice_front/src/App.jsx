import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

const App = () => {
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
