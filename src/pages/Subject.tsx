import '../cssfolder/Subject.css';
import { Link } from 'react-router-dom';

const Subject = () => {
  return (
    <div className="subject-container">
      <div className="center-container">
        <p>과목이름</p>
        <p>총 ~문제중 0문제 풀이</p>
      </div>
      <div className="community-container">
        <div className="community-section">
          <h2>커뮤니티</h2>
          <Link to="/community" className="arrow-link">
            <span className="arrow">&gt;</span>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="problem-bank-section">
          <h2>문제은행</h2>
          <Link to="/problem-bank" className="arrow-link">
            <span className="arrow">&gt;</span>
          </Link>
        </div>
      </div>
      <br />
      <button>문제등록</button>
    </div>
  );
};

export default Subject;
