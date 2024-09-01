import styled from 'styled-components';

export const DivHomeContainer = styled.div`
  padding: 0 20px;
  /* Header 아래에 적절한 간격 */
  margin-top: 120px;
  width: 100vw;
`;

export const DivBggra = styled.div`
  /* bggra를 기준으로 이미지 위치 조정 */
  position: relative;
  top: 0%;
  width: 1280px;
  height: 218px;
  flex-shrink: 0;
  border-radius: 1280px;
  opacity: 0.2;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  filter: blur(50px);
`;

export const ImgBigLogo = styled.img`
  /* 부모 요소(bggra)를 기준으로 절대 위치 */
  position: absolute;
  /* 세로 방향 중앙 */
  top: 30%;
  /* 가로 방향 중앙 */
  left: 50%;
  /* 중앙 정렬 */
  transform: translate(-50%, -50%);
  /* 이미지가 배경 위에 오도록 설정 */
  z-index: 1;
  width: 300px;
  height: auto;
`;

export const Heading4 = styled.h4`
  position: absolute;
  /* 세로 방향 중앙 */
  top: 35%;
  /* 가로 방향 중앙 */
  left: 50%;
  /* 중앙 정렬 */
  transform: translate(-50%, -50%);
  /* 이미지가 배경 위에 오도록 설정 */
  z-index: 1;
  color: gray;
`;

export const DivSearchBar = styled.div`
  background: white;
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 10px;
  /* max-width: 400px; */
  /* 중앙 정렬 */
  margin: 0 auto;
  width: 60%;
  box-shadow: 0px 5px 30px #e1e4ff;
`;

export const InputSearch = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  padding: 5px;
  padding-left: 20px;
  font-size: 16px;
`;

export const ButtonSearch = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 7px;
  padding-right: 20px;
  color: #333;

  &:hover {
    /* 돋보기 버튼에 호버 효과 */
    color: #000;
  }
`;

export const Paragraph = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

export const DivSubjectList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* searchbar와 list 사이 적절한 간격 */
  margin-top: 80px;
  /* width: 80%; */
`;

export const DivSubjectItem = styled.div`
  width: 55%;
  margin-bottom: 10px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 30px;
  text-align: left;
`;

export const DivSubjectItemTitle = styled.h3`
  margin: 3px;
  font-size: 1.7em;
`;

export const DivSubjectItemDescription = styled(Paragraph)`
  margin: 7px;
  margin-left: 3px;
`;
