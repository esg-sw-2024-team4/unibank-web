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
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-weight: bold;
  display: block;
  font-size: 16px;
  color: #333;
  margin-left: 10px;
  width: 150px; /* 라벨의 너비를 고정하여 입력창과의 공간을 유지 */
  text-align: left; /* 라벨을 오른쪽으로 정렬 */
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
  width: 20px;
  height: 20px;
  cursor: pointer;
  top: 163px;
  right: 16%;
`;

export const PostButton = styled.button`
  position: relative;
  left: 100%;
  transform: translateX(-110%);
  margin-right: 0px;
  margin-top: 20px;
  padding: 15px 22px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 70px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 40px;
  background-color: #cbcbcb;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b2b2b2;
  }
`;

export const QuestionType = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
`;

export const Text = styled.div`
  font-size: 13px;
  color: #7e7b7b;
`;
