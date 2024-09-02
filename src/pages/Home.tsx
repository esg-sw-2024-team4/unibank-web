import * as S from './Home.styles';

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bigLogo from '../assets/UniBankBigLogo.svg';
import nextVector from '../assets/nextVector.svg';
import { getProblemsAll, getSubjectsAll } from '../services/api';
import { getProblemsAll, getSubjectsByKeyword } from '../services/api';
import { IProblem, ISubject } from '../interfaces';

const Home: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // const [subjectList, setSubjectList] = useState<ISubject[]>([]);
  const [problemList, setProblemList] = useState<IProblem[]>([]);
  const [filteredSubjectList, setFilteredSubjectList] = useState<ISubject[]>(
    []
  );
  useEffect(() => {
    getSubjectsByKeyword('').then((data) => {
      if (data) {
        const { data: fetchedSubjectsAll } = data;
        // setSubjectList(fetchedSubjectsAll);
        setFilteredSubjectList(fetchedSubjectsAll);
      }
    });
    getProblemsAll().then((data) => {
      if (data) {
        const { data: fetchedProblemsAll } = data;
        setProblemList(fetchedProblemsAll);
      }
    });
  }, []);

  useEffect(() => {
    console.log(problemList);
  }, [problemList]);

  const handleSearch = async () => {
    console.log('검색');
    const data = await getSubjectsByKeyword(searchTerm);
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
    <S.DivHomeContainer>
      <S.DivBggra></S.DivBggra>
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
              ></S.NextButton>
            </S.Div>
          </S.DivSubjectItem>
        ))}
      </S.DivSubjectList>
    </S.DivHomeContainer>
  );
};

export default Home;
