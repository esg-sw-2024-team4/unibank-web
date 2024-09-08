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
  z-index: 999;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
`;

export const ModalHeader = styled.div`
  justify-content: space-between;
  align-items: center;
  {/*border-bottom: 0.5px solid #ddd;*/}
  padding-bottom: 20px;
`;

export const Source = styled.h3`
  font-weight: lighter;
  font-size: 13px;
  color: gray;
  text-align: left;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 19px;
  font-weight: normal;
`;

export const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  top: 25px;
  right: 20px;
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
  &:hover {
    background-color: #e0e0e0;
  }
`;
