import * as S from './Subject.styles';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProblem, getProblems, getSubjectById } from '../services/api';
import { IProblem, IPropsEditQuestion, ISubject, PATHS } from '../interfaces';
import AuthorFilter from '../components/filter/AuthorFilter';
import SolvedFilter from '../components/filter/SolvedFilter';
import FavoriteFilter from '../components/filter/FavoriteFilter';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../store/authAtom';
import SolveProblemModal from '../components/solve/SolveProblemModal';
import { loadingState } from '../store/loadingAtom';

const Subject: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useRecoilValue(authState);
  const [subject, setSubject] = useState<ISubject | null>(null);
  const setLoading = useSetRecoilState(loadingState);
  const [fetchedProblems, setFetchedProblems] = useState<IProblem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<IProblem[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showAvailable, setShowAvailable] = useState(false);
  const fetchData = useCallback(
    async (useLoading: boolean = true) => {
      try {
        if (!id || isNaN(+id)) {
          throw new Error('Invalid request...');
        }
        if (useLoading) {
          setLoading({ loadingRouting: true });
        }
        const responseSubject = await getSubjectById(+id);
        if (responseSubject) {
          setSubject(responseSubject.data);
          const responseProblemsBySubject = await getProblems(+id);
          setFetchedProblems(responseProblemsBySubject?.data || []);
        }
      } catch (err) {
        console.error(err);
        navigate(PATHS.notFound);
      } finally {
        if (useLoading) {
          setLoading({ loadingRouting: false });
        }
      }
    },
    [id, navigate, setLoading]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData, auth]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentSolvingProblemId, setCurrentSolvingProblemId] =
    useState<number>(0);
  const closeModal = () => {
    setIsModalOpened(false);
  };
  useEffect(() => {
    const newFilteredProblems = fetchedProblems.filter((p) => {
      return !auth.isAuthenticated
        ? true
        : (selectedOption === 'myProblems'
            ? p.isOwned
            : selectedOption === 'otherMembersProblems'
              ? !p.isOwned
              : selectedOption === 'completed'
                ? p.answerSubmittedPreviously
                : selectedOption === 'notCompleted'
                  ? !p.answerSubmittedPreviously
                  : true) && (showAvailable ? p.isFavorite : true);
    });
    setFilteredProblems(newFilteredProblems);
    if (
      currentSolvingProblemId &&
      !newFilteredProblems.find((p) => p.id === currentSolvingProblemId)
    ) {
      setCurrentSolvingProblemId(0);
    }
  }, [
    auth,
    id,
    selectedOption,
    fetchedProblems,
    showAvailable,
    currentSolvingProblemId,
  ]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleDeleteQuestion = async (id: number) => {
    if (!auth.isAuthenticated) {
      return;
    }
    setLoading({ loadingRouting: true });
    try {
      await deleteProblem(id);
      setFetchedProblems([]);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading({ loadingRouting: false });
    }
  };
  return (
    <>
      <S.SubjectContainer>
        <S.TitleDiv>
          <S.H1>{subject?.name}</S.H1>
          <p>{subject?.description}</p>
        </S.TitleDiv>
        <S.ProblemContainer>
          <S.ProblemBankSection>
            {auth.isAuthenticated && (
              <S.FilterContainer>
                <AuthorFilter
                  selectedOption={selectedOption}
                  onOptionChange={handleOptionChange}
                />
                <SolvedFilter
                  selectedOption={selectedOption}
                  onOptionChange={handleOptionChange}
                />
                <FavoriteFilter
                  showAvailable={showAvailable}
                  toggle={() => setShowAvailable(!showAvailable)}
                />
              </S.FilterContainer>
            )}
            <S.SubjectHeader>
              <h2 style={{ marginBottom: '0px' }}>문제 리스트</h2>
            </S.SubjectHeader>
            <S.DivProblemList>
              {filteredProblems.map((problem, idx) => (
                <S.DivProblemItem key={idx}>
                  <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <div
                      style={{
                        display: 'flex',
                        cursor: 'pointer',
                        alignItems: 'center',
                      }}
                      onClick={() => {
                        setCurrentSolvingProblemId(problem.id);
                        setIsModalOpened(true);
                      }}
                    >
                      <strong style={{ minWidth: 'max-content' }}>
                        문제 {idx + 1}.
                      </strong>
                      <div style={{ marginLeft: '10px' }}>{problem.title}</div>
                    </div>
                    {problem.isOwned && (
                      <div
                        style={{
                          display: 'flex',
                          columnGap: '4px',
                          marginLeft: '8px',
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            display: 'block',
                            border: '1px solid #ccc',
                            borderRadius: '14px',
                          }}
                          onClick={() => {
                            if (!subject) {
                              return;
                            }
                            const { id: subjectId, name: subjectName } =
                              subject;
                            if (!subjectId || !subjectName) {
                              return;
                            }
                            const props: IPropsEditQuestion = {
                              ...problem,
                              subjectId,
                              subjectName,
                            };
                            navigate(`/edit`, { state: props });
                          }}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          style={{
                            display: 'block',
                            border: '1px solid #ccc',
                            borderRadius: '14px',
                          }}
                          onClick={() => {
                            handleDeleteQuestion(problem.id);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </S.DivProblemItem>
              ))}
            </S.DivProblemList>
          </S.ProblemBankSection>
        </S.ProblemContainer>
        {auth.isAuthenticated && (
          <S.WriteQuestionBtn
            type="button"
            onClick={() => {
              navigate(`/write`);
            }}
          >
            문제 등록
          </S.WriteQuestionBtn>
        )}
        {currentSolvingProblemId && isModalOpened ? (
          <SolveProblemModal
            problem={
              filteredProblems.find((p) => p.id === currentSolvingProblemId) ||
              null
            }
            onClose={closeModal}
            fetchProblems={fetchData.bind(null, false)}
          />
        ) : (
          <></>
        )}
      </S.SubjectContainer>
    </>
  );
};

export default Subject;
