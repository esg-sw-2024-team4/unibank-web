import * as S from './Home.styles';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bigLogo from '../assets/UniBankBigLogo.svg';
import nextVector from '../assets/nextVector.svg';
import { checkToken, getSubjectsByKeyword } from '../services/api';
import { ISubject } from '../interfaces';
import useDebounce from '../hooks/useDebounce';
import Loading from '../components/loading/Loading';
import Header from '../components/shared/Header';

const Home: FC = () => {
  const location = useLocation();
  const [isAuthRequest, setIsAuthRequest] = useState(true);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const providedToken = params.get('token');
    if (providedToken) {
      checkToken(providedToken)
        .then((res) => {
          if (res.data) {
            const { id, name, email, point } = res.data;
            localStorage.setItem('id', id);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('point', point);
            localStorage.setItem('accessToken', providedToken);
            window.dispatchEvent(new Event('storage'));
          }
        })
        .finally(() => {
          window.close();
        });
    } else {
      setIsAuthRequest(false);
    }
  }, [location]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjectList, setFilteredSubjectList] = useState<ISubject[]>(
    []
  );
  const confirmedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2초 후에 로딩 종료

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  useEffect(() => {
    if (!loading) {
      handleSearch();
    }
  }, [confirmedSearchTerm, loading]);

  const handleSearch = async () => {
    const data = await getSubjectsByKeyword(confirmedSearchTerm || '');
    if (data) {
      const { data: fetchedSubjectsByKeyword } = data;
      setFilteredSubjectList(fetchedSubjectsByKeyword);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {isAuthRequest ? (
        <></>
      ) : (
        <>
          <Header />
          <S.DivHomeContainer>
            {loading ? (
              <Loading />
            ) : (
              <>
                <S.DivBggra />
                <S.ImgBigLogo src={bigLogo} alt="로고" />
                <S.Heading4>수강하는 과목을 검색하여 공부해 보세요!</S.Heading4>
                <S.DivSearchBar>
                  <S.InputSearch
                    type="text"
                    placeholder="과목을 검색해 보세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <S.ButtonSearch onClick={handleSearch}>🔍</S.ButtonSearch>
                </S.DivSearchBar>
                <S.DivSubjectList>
                  {filteredSubjectList.map((subject) => (
                    <S.DivSubjectItem key={subject.id}>
                      <S.Div>
                        <S.SpanDiv>
                          <S.DivSubjectItemTitle
                            onClick={() => navigate(`/subjects/${subject.id}`)}
                          >
                            {subject.name}
                          </S.DivSubjectItemTitle>
                          <S.DivSubjectItemDescription>
                            {subject.description}
                          </S.DivSubjectItemDescription>
                        </S.SpanDiv>
                        <S.NextButton
                          src={nextVector}
                          onClick={() => navigate(`/subjects/${subject.id}`)}
                        />
                      </S.Div>
                    </S.DivSubjectItem>
                  ))}
                </S.DivSubjectList>
              </>
            )}
          </S.DivHomeContainer>
        </>
      )}
    </>
  );
};

export default Home;
