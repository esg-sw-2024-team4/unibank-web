import '../../cssfolder/Header.css';
import { useRecoilState } from 'recoil';
import { authState } from '../../store/authAtom';
import { Link } from 'react-router-dom';
import { authenticate, clearCredentials } from '../../services/api';
import logo from '../../assets/UniBank.svg';

const Header: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const handleSignIn = () => {
    setAuth({
      isAuthenticated: false,
      accessToken: '',
      id: '',
      name: '',
      email: '',
      point: '',
    });
    authenticate();
  };
  const handleSignOut = () => {
    clearCredentials();
    setAuth({
      isAuthenticated: false,
      accessToken: '',
      id: '',
      name: '',
      email: '',
      point: '',
    });
  };
  return (
    <header className="header">
      <div className="contents">
        <div className="logoZone">
          <Link to="/" className="logo-link">
            <img src={logo} alt="로고" className="logo" />
          </Link>
          <div className="detail">
            <p>대학생을 위한 문제 은행</p>
          </div>
        </div>
        <div className="auth-links">
          {!auth.isAuthenticated ? (
            <button
              type="button"
              className="login-link"
              onClick={() => {
                handleSignIn();
              }}
            >
              Google 소셜 로그인
            </button>
          ) : (
            <button
              type="button"
              className="login-link"
              onClick={() => {
                handleSignOut();
              }}
            >
              로그아웃
            </button>
          )}
          {/* <span> / </span>
          <Link to="/signup" className="signup-link">
            회원가입
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
