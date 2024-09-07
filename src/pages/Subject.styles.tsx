import styled from 'styled-components';

export const TitleDiv = styled.div`
  display: flex;
  align-items: baseline;
  color: #4c4c4c;
  margin-top: 120px;
`;

export const H1 = styled.h1`
  margin-right: 15px;
`;

export const SubjectContainer = styled.div`
  width: 70vw;
  margin: 0 auto;
  position: relative;
`;

export const ProblemContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(214, 235, 255, 0.2) 0%,
    rgba(194, 199, 255, 0.2) 100%
  );
  width: 100%;
  height: auto;
  border: 0.1px solid lightgray;
  border-radius: 30px;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 150px;
  position: relative; /* 우측에 FilterContainer를 정렬하기 위해 상대 위치 설정 */
`;

export const ProblemBankSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 좌측 정렬 */
  padding-left: 10px; /* 좌측 padding 유지 */
`;

export const DivProblemList = styled.div`
  margin-top: 10px;
  font-size: 16px;
  padding-left: 10px; /* 좌측 padding 유지 */
`;

export const DivProblemItem = styled.div`
  margin: 30px 0px;
`;

export const WriteQuestionBtn = styled.button`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 22px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  cursor: pointer;
  border-radius: 30px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const SubjectHeader = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 10px;
`;

export const FilterContainer = styled.div`
  position: absolute;
  right: 40px; /* ProblemContainer의 우측 끝에 정렬 */
  top: 50px; /* 위쪽에 적절한 여백 설정 */
  display: flex;
  align-items: center;
  white-space: nowrap; /* 텍스트가 줄 바꿈 없이 한 줄로 출력되도록 설정 */
`;
