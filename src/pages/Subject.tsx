import * as S from './Subject.styles';

import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../routes/Routes';
import { getProblemsBySubjectId, getSubjectById } from '../services/api';
import { IProblem, ISubject } from '../interfaces';
import AuthorFilterSelect from '../components/filter/AuthorFilterComboBox';
import { useRecoilState } from 'recoil';
import { authState } from '../store/authAtom';

const Subject: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token] = useRecoilState(authState);
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<IProblem[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!id || isNaN(+id)) {
          throw new Error('Invalid request...');
        }
        const { data } = await getSubjectById(+id);
        if (data) {
          setSubject(data);
          const problemsData = await getProblemsBySubjectId(+id);
          if (problemsData) {
            setProblems(problemsData);
            setFilteredProblems(problemsData);
          }
        }
      } catch (err) {
        console.error(err);
        navigate(PATHS.notFound);
      }
    })();
  }, [id]);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (!userId) return;
    let filtered = problems;
    if (selectedOption === 'myProblems') {
      filtered = problems.filter(
        (problem) => problem.author_id === Number(userId)
      );
    } else if (selectedOption === 'otherMembersProblems') {
      filtered = problems.filter(
        (problem) => problem.author_id !== Number(userId)
      );
    }
    setFilteredProblems(filtered);
  }, [selectedOption, problems]);

  return (
    <S.SubjectContainer>
      <S.TitleDiv>
        <S.H1>{subject?.name}</S.H1>
        <p>{subject?.description}</p>
      </S.TitleDiv>
      <S.ProblemContainer>
        <S.ProblemBankSection>
          <S.FilterContainer>
            <h2 style={{ marginBottom: '0px' }}>문제 리스트</h2>
            {token.isAuthenticated && (
              <AuthorFilterSelect
                selectedOption={selectedOption}
                onOptionChange={handleOptionChange}
              />
            )}
          </S.FilterContainer>
          <S.DivProblemList>
            {filteredProblems.map((problem) => (
              <S.ParagraphProblemItem key={problem.id}>
                <p>
                  <strong>문제 {problem.id}.</strong> {problem.question_text}
                </p>
              </S.ParagraphProblemItem>
            ))}
          </S.DivProblemList>
        </S.ProblemBankSection>
      </S.ProblemContainer>
      {token.isAuthenticated && (
        <S.WriteQuestionBtn
          type="button"
          onClick={() => {
            navigate(`/writequestion/${id}`, {
              state: { subject_id: id },
            });
          }}
        >
          문제 등록
        </S.WriteQuestionBtn>
      )}
    </S.SubjectContainer>
  );
};

export default Subject;
