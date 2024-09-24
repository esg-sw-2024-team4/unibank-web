import { FC } from 'react';

import * as S from './Header.styles';

import { useRecoilState } from 'recoil';
import { authState } from '../../store/authAtom';
import { Link } from 'react-router-dom';
import { authenticate, signout } from '../../services/api';
import logo from '../../assets/UniBank.svg';

const Header: FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const handleSignIn = () => {
    setAuth({
      isAuthenticated: false,
      id: '',
      name: '',
      email: '',
      point: '',
    });
    authenticate();
  };
  const handleSignOut = () => {
    signout().finally(() => {
      setAuth({
        isAuthenticated: false,
        id: '',
        name: '',
        email: '',
        point: '',
      });
      location.reload();
    });
  };
  return (
    <S.Header>
      <S.DivContents>
        <S.DivLogoZone>
          <Link to="/">
            <S.ImgLogo src={logo} alt="로고" />
          </Link>
          <div>
            <p style={{ fontSize: '1.05em' }}>대학생을 위한 문제 은행</p>
          </div>
        </S.DivLogoZone>
        <div>
          {!auth.isAuthenticated ? (
            <S.LoginButton
              type="button"
              onClick={() => {
                handleSignIn();
              }}
            >
              Google 소셜 로그인
            </S.LoginButton>
          ) : (
            <S.LogoutButton
              type="button"
              onClick={() => {
                handleSignOut();
              }}
            >
              로그아웃
            </S.LogoutButton>
          )}
          {/* <span> / </span>
          <Link to="/signup" className="signup-link">
            회원가입
          </Link> */}
        </div>
      </S.DivContents>
    </S.Header>
  );
};

export default Header;
