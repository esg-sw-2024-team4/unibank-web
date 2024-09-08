import { FC } from 'react';
import * as S from './FavoriteFilter.style';

interface IPropsFavoriteFilter {
  showAvailable: boolean;
  toggle: () => void;
}

const FavoriteFilter: FC<IPropsFavoriteFilter> = ({
  showAvailable,
  toggle,
}) => {
  return (
    <S.InputWrapper>
      <S.Check
        onClick={() => toggle()}
        style={{
          backgroundColor: showAvailable ? '#C2C7FF' : '#f7f7f7',
          border: `1px solid ${showAvailable ? '#7F7F7F' : '#7F7F7F'}`,
        }}
      />
      <span>즐겨찾기한 문제만 보기</span>
    </S.InputWrapper>
  );
};

export default FavoriteFilter;
