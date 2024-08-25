import "../cssfolder/Headcss.css";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="contents">
        <Link to="/" className="logo-link">
          <img src="/path/to/your/logo.png" alt="로고" className="logo" />
        </Link>
        <div className="auth-links">
          <Link to="/login" className="login-link">
            로그인
          </Link>
          <span className="divider">/</span>
          <Link to="/signup" className="signup-link">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
