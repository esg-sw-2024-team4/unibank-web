import '../cssfolder/Subject.css';
import { useParams, useLocation } from 'react-router-dom';
import React from 'react';

interface Problem {
  id: number;
  subject_id: number;
  author_id: number;
  question_text: string;
  question_type: string;
  image_url: string;
  source: string;
}

interface LocationState {
  problems: Problem[];
  subjectName: string;
}

const Subject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { problems, subjectName } = location.state as LocationState;

  console.log(id);

  return (
    <div className="subject-container">
      <div className="center-container">
        <h1>{subjectName}</h1>
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
