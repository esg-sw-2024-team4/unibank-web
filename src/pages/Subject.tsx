import * as S from './Subject.styles';

import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../routes/Routes';
import { getProblemsBySubjectId, getSubjectById } from '../services/api';
import { IProblem, ISubject } from '../interfaces';
// import { useRecoilState } from 'recoil';
// import { authState } from '../store/authAtom';

const Subject: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [token] = useRecoilState(authState);
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [problems, setProblems] = useState<IProblem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        if (!id || isNaN(+id)) {
          throw new Error('Invalid request...');
        }
        const data = await getSubjectById(+id);
        if (data) {
          setSubject(data);
          getProblemsBySubjectId(+id).then((data) => {
            if (data) {
              setProblems(data);
            }
          });
        }
      } catch (err) {
        console.error(err);
        navigate(PATHS.notFound);
      }
    })();
  }, [id]);
  return (
    <S.SubjectContainer>
      <div>
        <h1>{subject?.name}</h1>
        <p>총 {problems.length}문제중 0문제 풀이</p>
      </div>
      <S.CommunityContainer>
        <S.CommunitySection>
          <h2>커뮤니티</h2>
        </S.CommunitySection>
        <S.DivDivider></S.DivDivider>
        <S.ProblemBankSection>
          <h2>문제은행</h2>
          {/* 문제 리스트를 여기에 추가 */}
          <S.DivProblemList>
            {problems.map((problem) => (
              <S.ParagraphProblemItem key={problem.id}>
                {problem.question_text}
              </S.ParagraphProblemItem>
            ))}
          </S.DivProblemList>
        </S.ProblemBankSection>
      </S.CommunityContainer>
      <br />
      <button type="button">문제등록</button>
    </S.SubjectContainer>
  );
};

export default Subject;
