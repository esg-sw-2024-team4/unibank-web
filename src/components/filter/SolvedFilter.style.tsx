import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  color: black;
  border: none;
`;

export const FilterComboBox = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
