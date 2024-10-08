import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0 20px 20px -10px rgba(32, 44, 153, 0.02);
  z-index: 10;
`;

export const DivContents = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  @media screen and (min-width: 768px) {
    max-width: 1100px;
    margin: 0 auto;
  }
`;

export const DivLogoZone = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: gray;
`;

export const ImgLogo = styled.img`
  margin-right: 12px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
`;

export const LoginButton = styled(Button)`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const LogoutButton = styled(Button)`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
