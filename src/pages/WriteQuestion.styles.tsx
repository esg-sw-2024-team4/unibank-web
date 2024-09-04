import styled from 'styled-components';

export const SubjectContainer = styled.div`
  margin-top: 140px;
  width: 70vw;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  color: #4c4c4c;
`;

export const H1 = styled.h1`
  margin-right: 15px;
  font-size: 30px;
`;

export const Icon = styled.img`
  margin-right: 12px;
  padding-bottom: 1px;
`;

export const WriteContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(214, 235, 255, 0.1) 0%,
    rgba(194, 199, 255, 0.1) 100%
  );
  height: auto;
  border: 0.1px solid lightgray;
  border-radius: 30px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-right: 10px;
  width: 150px; /* 라벨의 너비를 고정하여 입력창과의 공간을 유지 */
  text-align: right; /* 라벨을 오른쪽으로 정렬 */
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  height: 500px; /* 높이 5배로 확장 */
  box-sizing: border-box;
  resize: vertical;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const ExitButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const PostButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const QuestionType = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
`;
