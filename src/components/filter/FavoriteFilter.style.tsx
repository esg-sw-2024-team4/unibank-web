import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  color: black;
  border: none;
  white-space: nowrap;
`;

export const Check = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
  /* on/off style은 FavoriteFilter.tsx에서 조건부로 처리 */
`;
