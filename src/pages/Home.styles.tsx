import styled from 'styled-components';

export const DivHomeContainer = styled.div`
  padding: 0 20px;
  /* Header 아래에 적절한 간격 */
  margin-top: 120px;
  width: 100vw;
`;

export const DivBggra = styled.div`
  /* bggra를 기준으로 이미지 위치 조정 */
  position: absolute;
  top: 25%;
  width: 1280px;
  height: 218px;
  flex-shrink: 0;
  border-radius: 1280px;
  opacity: 0.2;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  filter: blur(50px);
  z-index: 1;
`;

export const ImgBigLogo = styled.img`
  position: relative;
  top: 70px;
  left: 50%;
  /* 중앙 정렬 */
  transform: translate(-50%, -50%);
  /* 이미지가 배경 위에 오도록 설정 */
  z-index: 1;
  width: 300px;
  height: auto;
`;

export const Heading4 = styled.h4`
  position: relative;
  text-align: center;
  /* 세로 방향 중앙 */
  top: 50px;
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
  margin-top: 75px;
  margin-top: 75px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0px 5px 30px #e1e4ff;
  z-index: 5;
  width: 85%;

  @media screen and (min-width: 768px) {
    width: 60%;
  }
`;

export const InputSearch = styled.input`
  z-index: 5;
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
  z-index: 8;

 &:hover {
    background: #f0f0f0;
    transform: scale(1.05);
    border-radius: 50px;
    }
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
  margin-bottom: 80px;
`;

export const DivSubjectItem = styled.div`
  width: 80%;
  margin-bottom: 10px;
  padding: 30px;
  background-color: #ededed;
  border-radius: 30px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(214, 235, 255, 0.25) 0%,
      rgba(194, 199, 255, 0.25) 100%
    );
  }

  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const DivSubjectItemTitle = styled.h3`
  display: inline-block;
  font-size: 1.4em;
  color: #666666;
  text-align: left;
  white-space: nowrap; /* 줄 바꿈을 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 줄임표 추가 */
  margin: 0px;
`;

export const ParagraphSubjectItemDescription = styled(Paragraph)`
  display: inline-block;
  margin-top: 8px;
  margin-bottom: 5px;
  margin-left: 3px;
  text-align: left;
  font-size: 1em;
  color: #666666;
  flex-wrap: nowrap;
`;

export const Div = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  flex-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative; /* NextButton의 절대 위치를 기준으로 함 */
`;

export const SpanDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  text-align: left;
`;

export const NextButton = styled.img`
  position: absolute;
  right: 5px;
  top: 50%; /* 수직 중앙 */
  transform: translateY(-50%); /* 정확히 수직 중앙으로 이동 */
`;
