import { FC, useState, useEffect } from 'react';
import * as S from './FavoriteFilter.style';

const FavoriteFilter: FC = () => {
  const [showAvailable, setShowAvailable] = useState(false);

  const handleCheckClick = () => {
    setShowAvailable(!showAvailable);
  };

  useEffect(() => {
    // TO DO: 즐겨찾기 필터링 구현
  }, [showAvailable]);

  return (
    <S.InputWrapper>
      {/* showAvailable 상태에 따라 스타일이 변경되도록 스타일 컴포넌트에 조건부 클래스 추가 */}
      <S.Check
        onClick={handleCheckClick}
        style={{
          backgroundColor: showAvailable ? '#C2C7FF' : '#E8E8E8',
          border: `1px solid ${showAvailable ? '7F7F7F' : '#7F7F7F'}`,
        }}
      />
      <span>즐겨찾기한 문제만 보기</span>
    </S.InputWrapper>
  );
};

export default FavoriteFilter;
