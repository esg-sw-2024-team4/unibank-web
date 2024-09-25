import * as S from './Home.styles';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bigLogo from '../assets/UniBankBigLogo.svg';
import nextVector from '../assets/nextVector.svg';
import { getSubjectsByKeyword } from '../services/api';
import { ISubject } from '../interfaces';
import useDebounce from '../hooks/useDebounce';
import Header from '../components/shared/Header';

const Home: FC = () => {
  const location = useLocation();
  const [isAuthRequest, setIsAuthRequest] = useState(true);
  useEffect(() => {
    setIsAuthRequest(new URLSearchParams(location.search).has('auth'));
  }, [location]);
  useEffect(() => {
    if (isAuthRequest) {
      window.opener = window;
      window.close();
    }
  }, [isAuthRequest]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjectList, setFilteredSubjectList] = useState<ISubject[]>(
    []
  );
  const confirmedSearchTerm = useDebounce(searchTerm, 500);
  const handleSearch = useCallback(() => {
    getSubjectsByKeyword(confirmedSearchTerm || '').then((data) => {
      if (data) {
        const { data: fetchedSubjectsByKeyword } = data;
        setFilteredSubjectList(fetchedSubjectsByKeyword);
      }
    });
  }, [confirmedSearchTerm]);
  useEffect(() => {
    handleSearch();
  }, [confirmedSearchTerm, handleSearch]);
  const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.scrollTo(0, 0);
    setSearchTerm(e.target.value);
  };
  return (
    <>
      {isAuthRequest ? (
        <></>
      ) : (
        <>
          <Header />
          <S.DivHomeContainer>
            <S.DivBggra />
            <S.ImgBigLogo src={bigLogo} alt="로고" />
            <S.Heading4>수강하는 과목을 검색하여 공부해 보세요!</S.Heading4>
            <S.DivSearchBar>
              <S.InputSearch
                type="text"
                placeholder="과목을 검색해 보세요."
                value={searchTerm}
                onChange={onChangeSearchTerm}
              />
              <S.ButtonSearch onClick={handleSearch}>🔍</S.ButtonSearch>
            </S.DivSearchBar>
            <S.DivSubjectList>
              {filteredSubjectList.map((subject) => (
                <S.DivSubjectItem
                  key={subject.id}
                  onClick={() => navigate(`/subjects/${subject.id}`)}
                >
                  <S.Div>
                    <S.SpanDiv>
                      <S.DivSubjectItemTitle>
                        {subject.name}
                      </S.DivSubjectItemTitle>
                      <S.ParagraphSubjectItemDescription>
                        {subject.description}
                      </S.ParagraphSubjectItemDescription>
                    </S.SpanDiv>
                    <S.NextButton
                      src={nextVector}
                      onClick={() => navigate(`/subjects/${subject.id}`)}
                    />
                  </S.Div>
                </S.DivSubjectItem>
              ))}
            </S.DivSubjectList>
          </S.DivHomeContainer>
        </>
      )}
    </>
  );
};

export default Home;
