import * as S from './SolveProblemModal.style';
import { FC, useEffect, useState } from 'react';
import { IProblem } from '../../interfaces';
import { submitSolution, toggleFavorite } from '../../services/api';
import { useRecoilState } from 'recoil';
import { authState } from '../../store/authAtom';
import ColorStar from '../../assets/ColorStar.svg';
import WhiteStar from '../../assets/WhiteStar.svg';

interface IPropsSolveProblemModal {
  problem: IProblem | null;
  onClose: () => void;
  fetchProblems: () => Promise<void>;
}

const SolveProblemModal: FC<IPropsSolveProblemModal> = ({
  problem,
  onClose,
  fetchProblems,
}) => {
  const [token] = useRecoilState(authState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [selectedAnswerForGuest, setSelectedAnswerForGuest] = useState<
    number | null
  >(null);
  useEffect(() => {
    if (problem) {
      setCorrectAnswer(problem.options.findIndex((o) => o.isCorrect) + 1);
    } else {
      onClose();
    }
  }, [problem]);
  const handleSubmitSolution = async (selectedAnswer: number) => {
    if (problem?.id) {
      setIsProcessing(true);
      try {
        const { accessToken } = token;
        if (accessToken) {
          setSelectedAnswerForGuest(null);
          await submitSolution(accessToken, problem.id, selectedAnswer);
          await fetchProblems();
          problem.answerSubmittedPreviously = selectedAnswer;
        } else {
          setSelectedAnswerForGuest(selectedAnswer);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  const handleToggleFavorite = async () => {
    if (problem?.id) {
      const { accessToken } = token;
      setIsProcessing(true);
      try {
        await toggleFavorite(accessToken, problem.id);
        await fetchProblems();
        problem.isFavorite = !problem.isFavorite;
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {problem && (
          <>
            <S.ModalHeader>
              <S.Title>{`[${problem.source || '출처 미상'}] ${problem.title}`}</S.Title>
              <S.CloseButton onClick={onClose}>X</S.CloseButton>
            </S.ModalHeader>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {token.isAuthenticated && (
                <button
                  type="button"
                  disabled={isProcessing}
                  style={{
                    border: '0.2px solid #B7B0FF',
                    marginLeft: 'auto',
                    marginRight: '0px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    padding: '3px 10px',
                    alignContent: 'center',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 'normal',
                    backgroundColor: problem.isFavorite ? '#ffffff' : '#B7B0FF',
                    color: problem.isFavorite ? '#B7B0FF' : '#ffffff',
                  }}
                  onClick={() => handleToggleFavorite()}
                >
                  {problem.isFavorite ? (
                    <>
                      {'스크랩 취소 '}
                      <img
                        src={ColorStar}
                        alt="ColorStar"
                        style={{
                          marginLeft: '2px',
                          height: '80%',
                          width: 'auto',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {'문제 스크랩 '}
                      <img
                        src={WhiteStar}
                        alt="WhiteStar"
                        style={{
                          marginLeft: '2px',
                          height: '80%',
                          width: 'auto',
                        }}
                      />
                    </>
                  )}
                </button>
              )}
              {problem.imageUrl && (
                <img src={problem.imageUrl} alt={problem.title} />
              )}
              <div style={{ marginTop: '14px', alignItems: 'left' }}>
                {problem.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    style={{
                      backgroundColor: 'white',
                      padding: '3px 9px',
                      //borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      margin: '5px auto',
                      border: 'none',
                      //border: `0.5px solid${(!token.isAuthenticated ? selectedAnswerForGuest : problem.answerSubmittedPreviously) === idx + 1 ? '#B7B0FF' : ' #ffffff'}`,
                    }}
                    disabled={isProcessing}
                    onClick={() => {
                      handleSubmitSolution(idx + 1);
                    }}
                  >
                    {' '}
                    <div
                      style={{
                        width: '20px', // 원의 너비
                        height: '20px', // 원의 높이
                        borderRadius: '50%', // 원 모양
                        backgroundColor: `${(!token.isAuthenticated ? selectedAnswerForGuest : problem.answerSubmittedPreviously) === idx + 1 ? '#B7B0FF' : ' #ffffff'}`,
                        marginRight: '5px', // 텍스트와의 간격
                        display: 'flex', // 중앙 정렬을 위한 flexbox
                        justifyContent: 'center', // 가로 중앙 정렬
                        alignItems: 'center', // 세로 중앙 정렬
                        color: `${(!token.isAuthenticated ? selectedAnswerForGuest : problem.answerSubmittedPreviously) === idx + 1 ? '#ffffff' : ' #B7B0FF'}`,
                        fontWeight: 'bold', // 텍스트 두께
                        fontSize: '12px', // 텍스트 크기
                      }}
                    >
                      {idx + 1}
                    </div>
                    {`${option.optionText}`}
                  </button>
                ))}
              </div>
              {!token.isAuthenticated && selectedAnswerForGuest ? (
                <div style={{ margin: '14px auto', alignContent: 'center' }}>
                  {selectedAnswerForGuest === correctAnswer ? (
                    <>
                      정답입니다!
                      <br />
                      {problem.description}
                    </>
                  ) : (
                    '오답입니다. 다시 한번 풀어보세요!'
                  )}
                </div>
              ) : (
                <>
                  {!isProcessing &&
                  correctAnswer &&
                  !!problem.answerSubmittedPreviously ? (
                    <div
                      style={{
                        margin: '40px auto',
                        alignContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      {problem.answerSubmittedPreviously === correctAnswer ? (
                        <>
                          <span style={{ color: '#AD99FF' }}>정답입니다!</span>{' '}
                          <br />
                          <p style={{ fontSize: '15px' }}>
                            {problem.description}
                          </p>{' '}
                        </>
                      ) : (
                        '오답입니다. 다시 한번 풀어보세요!'
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default SolveProblemModal;
