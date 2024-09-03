import { FC, ChangeEvent } from 'react';
import * as S from './SolvedFilter.style';

interface Props {
  selectedOption: string;
  onOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SolvedFilter: FC<Props> = ({ selectedOption, onOptionChange }) => {
  // TO DO: '풀이 여부' 필터링 로직 구현
  return (
    <S.InputWrapper>
      <S.FilterComboBox value={selectedOption} onChange={onOptionChange}>
        <option value="" hidden>
          풀이 여부
        </option>
        <option value="all">전체</option>
        <option value="notCompleted">풀이 미완료</option>
        <option value="completed">풀이 완료</option>
      </S.FilterComboBox>
    </S.InputWrapper>
  );
};

export default SolvedFilter;
