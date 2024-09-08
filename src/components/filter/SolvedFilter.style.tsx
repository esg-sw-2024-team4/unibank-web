import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  color: black;
  border: none;
`;

export const FilterComboBox = styled.select`
  padding: 5px 8px;
  font-size: 14px;
  border: 3px solid #f7f7f7;
  border-radius: 20px;
  background-color: #f7f7f7;
  cursor: pointer;
  width: auto;
  margin-left: 10px;

  &:hover {
    background-color: #f0f0f0;
    border: 3px solid #f0f0f0;
  }
`;
