import '../cssfolder/Home.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Subject {
  id: number;
  name: string;
  description: string;
}

interface Problem {
  id: number;
  subject_id: number;
  author_id: number;
  question_text: string;
  question_type: string;
  image_url: string;
  source: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [problemList, setProblemList] = useState<Problem[]>([]);

  useEffect(() => {
    getSubjectData();
    getProblemData();
  }, []);

  const getSubjectData = async () => {
    try {
      const response = await axios.get('../../mocks/api/subjects/GET.json');
      setSubjectList(response.data.data);
      console.log(subjectList);
    } catch (error) {
      console.error('Failed to fetch subject data:', error);
    }
  };

  const getProblemData = async () => {
    try {
      const response = await axios.get('../../mocks/api/questions/GET.json');
      setProblemList(response.data.data);
    } catch (error) {
      console.error('문제 리스트 받기 실패', error);
    }
  };

  const handleSearch = () => {
    console.log('검색');
    // 검색 로직 추가해야됨
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const filteringAndNavigate = (subject: Subject) => {
    const filteredProblems = problemList.filter(
      (problem) => problem.subject_id === subject.id
    );
    navigate(`/subjects/${subject.id}`, {
      state: { problems: filteredProblems, subjectName: subject.name },
    });
  };

  return (
    <div className="home-container">
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
