import '../cssfolder/Subject.css';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../routes/Routes';
import { getProblemsBySubjectId, getSubjectById } from '../services/api';
import { IProblem, ISubject } from '../interfaces';

const Subject: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
        navigate(PATHS.notFound);
        console.error(err);
      }
    })();
  }, [id]);
  return (
    <div className="subject-container">
      <div className="center-container">
        <h1>{subject?.name}</h1>
        <p>총 {problems.length}문제중 0문제 풀이</p>
      </div>
      <div className="community-container">
        <div className="community-section">
          <h2>커뮤니티</h2>
        </div>
        <div className="divider"></div>
        <div className="problem-bank-section">
          <h2>문제은행</h2>
          {/* 문제 리스트를 여기에 추가 */}
          <div className="problem-list">
            {problems.map((problem) => (
              <p key={problem.id} className="problem-item">
                {problem.question_text}
              </p>
            ))}
          </div>
        </div>
      </div>
      <br />
      <button>문제등록</button>
    </div>
  );
};

export default Subject;
