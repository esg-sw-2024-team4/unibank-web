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
  useEffect(() => {
    if (problem) {
      setCorrectAnswer(problem.options.findIndex((o) => o.isCorrect) + 1);
    } else {
      onClose();
    }
  }, [problem]);
  const handleSubmitSolution = async (selectedAnswer: number) => {
    if (problem?.id) {
      const { accessToken } = token;
      setIsProcessing(true);
      try {
        await submitSolution(accessToken, problem.id, selectedAnswer);
        await fetchProblems();
        problem.answerSubmittedPreviously = selectedAnswer;
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
                  color: '#B7B0FF',
                  fontSize: '13px',
                  fontWeight: 'normal',
                  backgroundColor: '#ffffff',
                }}
                onClick={() => handleToggleFavorite()}
              >
                {problem.isFavorite ? (
                  <>
                    즐겨찾기 삭제{' '}
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
                    즐겨찾기 추가{' '}
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
              {problem.imageUrl && (
                <img src={problem.imageUrl} alt={problem.title} />
              )}
              <div style={{ marginTop: '14px' }}>{problem.description}</div>
              <div style={{ marginTop: '14px' }}>
                {problem.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    style={{
                      display: 'block',
                      margin: '5px auto',
                      border: `1px solid${problem.answerSubmittedPreviously === idx + 1 ? ' red' : ' #e6e6e6'}`,
                    }}
                    disabled={isProcessing}
                    onClick={() => {
                      handleSubmitSolution(idx + 1);
                    }}
                  >{`${idx + 1}번. ${option.optionText}`}</button>
                ))}
              </div>
              {!isProcessing && correctAnswer && (
                <div style={{ margin: '14px auto' }}>
                  {problem.answerSubmittedPreviously === correctAnswer
                    ? '정답입니다!'
                    : '오답입니다...'}
                </div>
              )}
            </div>
          </>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default SolveProblemModal;
