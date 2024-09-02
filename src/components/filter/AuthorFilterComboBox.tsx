import { FC, ChangeEvent } from 'react';
import * as S from './AuthorFilterComboBox.style'; // 스타일 컴포넌트가 정의된 파일

interface Props {
  selectedOption: string;
  onOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const AuthorFilterSelect: FC<Props> = ({ selectedOption, onOptionChange }) => {
  return (
    <S.InputWrapper>
      <S.FilterComboBox value={selectedOption} onChange={onOptionChange}>
        <option value="" hidden>
          출제자 구분
        </option>
        <option value="myProblems">내가 출제한 문제</option>
        <option value="otherMembersProblems">다른 회원이 출제한 문제</option>
        <option value="all">전체</option>
      </S.FilterComboBox>
    </S.InputWrapper>
  );
};

export default AuthorFilterSelect;
