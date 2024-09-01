import styled from 'styled-components';

export const SubjectContainer = styled.div`
  margin-top: 140px;
  width: 70vw;
`;

export const CommunityContainer = styled.div`
  display: flex;
  background-color: rgb(234, 206, 206);
  height: 300px;
  border-radius: 30px;
  padding: 15px;
`;

export const CommunitySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: baseline;
`;

export const ProblemBankSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: baseline;
`;

export const DivDivider = styled.div`
  width: 0.5px;
  background-color: #000;
  margin: 0 20px;
`;

export const DivProblemList = styled.div`
  /* 문제 리스트를 문제은행 글씨 아래에 배치 */
  margin-top: 10px;
  /* 문제 텍스트 크기 조정 */
  font-size: 16px;
`;

export const ParagraphProblemItem = styled.p``;

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
