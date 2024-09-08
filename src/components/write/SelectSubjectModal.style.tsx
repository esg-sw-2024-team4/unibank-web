import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const SubjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SubjectItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: #f4f4f4;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease; /* 부드러운 전환 효과 추가 */

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(214, 235, 255, 0.25) 0%,
      rgba(194, 199, 255, 0.25) 100%
    );
  }
`;

export const AddSubjectInput = styled.input`
  width: 80%;
  height: 40px; /* 고정된 높이 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

export const AddSubjectButton = styled.button`
  width: 37px;
  height: 34px; /* 고정된 높이 */
  padding-bottom: 3px;
  border: none;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  cursor: pointer;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
`;
