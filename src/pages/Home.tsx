// import * as S from './Home.styles';

// import { FC, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import bigLogo from '../assets/UniBankBigLogo.svg';
// import { getProblemsAll, getSubjectsAll } from '../services/api';
// import { IProblem, ISubject } from '../interfaces';

// const Home: FC = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [subjectList, setSubjectList] = useState<ISubject[]>([]);
//   const [problemList, setProblemList] = useState<IProblem[]>([]);
//   useEffect(() => {
//     getSubjectsAll().then((data) => {
//       if (data) {
//         const { data: fetchedSubjectsAll } = data;
//         setSubjectList(fetchedSubjectsAll);
//       }
//     });
//     getProblemsAll().then((data) => {
//       if (data) {
//         const { data: fetchedProblemsAll } = data;
//         setProblemList(fetchedProblemsAll);
//       }
//     });
//   }, []);
//   useEffect(() => {
//     console.log(problemList);
//   }, [problemList]);
//   const handleSearch = () => {
//     console.log('검색');
//     // TO DO: 검색 로직 추가
//   };
//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };
//   return (
//     <S.DivHomeContainer>
//       <S.DivBggra></S.DivBggra>
//       <S.ImgBigLogo src={bigLogo} alt="로고" />
//       <S.Heading4>수강하는 과목을 검색하여 공부해 보세요!</S.Heading4>
//       <S.DivSearchBar>
//         <S.InputSearch
//           type="text"
//           placeholder="과목을 검색해 보세요."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <S.ButtonSearch onClick={handleSearch}>🔍</S.ButtonSearch>
//       </S.DivSearchBar>
//       <S.DivSubjectList>
//         {subjectList.map((subject) => (
//           <S.DivSubjectItem key={subject.id}>
//             <S.DivSubjectItemTitle
//               onClick={() => navigate(`/subjects/${subject.id}`)}
//             >
//               {subject.name}
//             </S.DivSubjectItemTitle>
//             <S.DivSubjectItemDescription>
//               {subject.description}
//             </S.DivSubjectItemDescription>
//           </S.DivSubjectItem>
//         ))}
//       </S.DivSubjectList>
//     </S.DivHomeContainer>
//   );
// };

// export default Home;

import './Home.css';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bigLogo from '../assets/UniBankBigLogo.svg';
import { getProblemsAll, getSubjectsAll } from '../services/api';
import { IProblem, ISubject } from '../interfaces';

const Home: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [subjectList, setSubjectList] = useState<ISubject[]>([]);
  const [problemList, setProblemList] = useState<IProblem[]>([]);
  useEffect(() => {
    getSubjectsAll().then((data) => {
      if (data) {
        const { data: fetchedSubjectsAll } = data;
        setSubjectList(fetchedSubjectsAll);
      }
    });
    getProblemsAll().then((data) => {
      if (data) {
        const { data: fetchedProblemsAll } = data;
        setProblemList(fetchedProblemsAll);
      }
    });
  }, []);
  const handleSearch = () => {
    console.log('검색');
    // TO DO: 검색 로직 추가
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const filteringAndNavigate = (subject: ISubject) => {
    const filteredProblems = problemList.filter(
      (problem) => problem.subject_id === subject.id
    );
    navigate(`/subjects/${subject.id}`, {
      state: { problems: filteredProblems, subjectName: subject.name },
    });
  };
  return (
    <div className="home-container">
      <div className="bggra"></div>
      <img src={bigLogo} alt="로고" className="bigLogo" />
      <h4>수강하는 과목을 검색하여 공부해 보세요!</h4>
      <div className="search-bar">
        <input
          type="text"
          placeholder="과목을 검색해 보세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
      </div>
      <div className="subject-list">
        {subjectList.map((subject) => (
          <div key={subject.id} className="subject-item">
            <h3 onClick={() => filteringAndNavigate(subject)}>
              {subject.name}
            </h3>
            <p>{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
