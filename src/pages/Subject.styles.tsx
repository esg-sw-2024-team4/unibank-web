import styled from 'styled-components';

export const TitleDiv = styled.div`
  display: flex;
  align-items: baseline;
  color: #4c4c4c;
`;

export const H1 = styled.h1`
  margin-right: 15px;
`;

export const SubjectContainer = styled.div`
  margin-top: 140px;
  width: 70vw;
`;

export const ProblemContainer = styled.div`
  display: flex;
  background: linear-gradient(
    135deg,
    rgba(214, 235, 255, 0.2) 0%,
    rgba(194, 199, 255, 0.2) 100%
  );
  height: 300px;
  border: 0.1px solid lightgray;
  border-radius: 30px;
  padding: 15px;
  padding-left: 30px;
`;

export const ProblemBankSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: baseline;
`;

export const DivProblemList = styled.div`
  /* 문제 리스트를 문제은행 글씨 아래에 배치 */
  margin-top: 10px;
  /* 문제 텍스트 크기 조정 */
  font-size: 16px;
`;

export const ParagraphProblemItem = styled.p`
  margin: 30px 0px;
`;

export const WriteQuestionBtn = styled.button`
  position: fixed; /* 화면에 고정 */
  bottom: 50px; /* 화면 하단에서 30px 위 */
  left: 50%; /* 화면의 수평 중앙 */
  transform: translateX(-50%); /* 중앙 정렬을 위한 변환 */
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

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

/*
.arrow-link {
  text-decoration: none;
  font-size: 24px;
  color: #000;
}

.section-link:hover {
  color: #007bff;
}

.arrow {
  margin-left: 10px;
  font-size: 24px;
}
*/
