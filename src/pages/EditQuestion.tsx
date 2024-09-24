import * as S from './WriteQuestion.styles';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/authAtom';
import DocumentIcon from '../assets/DocumentIcon.svg';
import IconX from '../assets/dismiss.svg';
import SelectSubjectModal from '../components/write/SelectSubjectModal';
import { putProblem } from '../services/api'; // Axios 인스턴스를 사용하는 API 함수
import { IPropsEditQuestion, IRequestBodyProblem, PATHS } from '../interfaces';

const EditQuestion: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [problem, setProblem] = useState<IPropsEditQuestion>();
  useEffect(() => {
    const { state } = location;
    if (!state) {
      navigate(PATHS.notFound);
    }
    setProblem(state);
  }, [location, navigate]);
  const auth = useRecoilValue(authState);
  const [questionType] = useState('객관식 문제');
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [enteredOptions, setEnteredOptions] = useState<string[]>([]);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>('');
  const [source, setSource] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(
    ''
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  useEffect(() => {
    setQuestionText(problem?.title || '');
    setCorrectAnswer(problem?.options.find((o) => o.isCorrect)?.option || null);
    setEnteredOptions(problem?.options.map((o) => o.optionText) || []);
    setExplanation(problem?.description || '');
    setImageUrl(problem?.imageUrl || '');
    setSource(problem?.source || '');
    setSelectedSubjectName(problem?.subjectName || '');
    setSelectedSubjectId(problem?.subjectId || null);
  }, [problem]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onClickBackButton = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSubjectSelect = (subjectName: string, subjectId: number) => {
    setSelectedSubjectName(subjectName);
    setSelectedSubjectId(subjectId);
    closeModal();
  };
  const handleSubmit = async () => {
    if (!auth.isAuthenticated) {
      alert('로그인 후 다시 시도해주세요.');
      return;
    }
    if (!problem?.isOwned) {
      alert('본인이 작성한 문제만 수정할 수 있습니다.');
      return;
    }
    if (selectedSubjectId === null || isNaN(selectedSubjectId)) {
      console.error('Invalid Subject ID');
      alert('유효하지 않은 과목 ID입니다.');
      return;
    }
    if (!correctAnswer || correctAnswer <= 0 || correctAnswer > 5) {
      alert('정답이 보기에 없습니다.');
      return;
    }
    const questionData: IRequestBodyProblem = {
      id: problem.id,
      subject_id: selectedSubjectId,
      title: questionText,
      description: explanation,
      image_url: imageUrl || '',
      source: source,
      options: enteredOptions.map((ot, idx) => {
        return {
          option: idx + 1,
          option_text: ot,
          is_correct: correctAnswer === idx + 1,
        };
      }),
    };
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const limitSz = 4096;
      if (blob.size / 1024 / 1024 > limitSz) {
        alert(new Error('Image file size should be less than 4MB'));
      }
      const b64s = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve((reader.result as string).split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      questionData.image_url = `data:image/jpeg;base64,${b64s}`;
    }
    try {
      // Axios를 사용하여 문제 데이터 전송
      await putProblem(questionData);
      navigate(`/subjects/${selectedSubjectId}`);
    } catch (error) {
      console.error('An error occurred while submitting the question', error);
      alert('문제 수정에 실패했습니다.');
    }
  };
  return (
    <S.SubjectContainer>
      {/* 컴포넌트 UI 코드 그대로 유지 */}
      <S.TitleDiv>
        <S.Icon src={DocumentIcon} alt="Document Icon" />
        <S.H1>문제 수정하기</S.H1>
        <p>문제를 수정하세요.</p>
      </S.TitleDiv>
      <S.WriteContainer>
        <S.Button onClick={openModal}>과목 선택</S.Button>
        {selectedSubjectName && (
          <p>
            선택된 과목: {selectedSubjectName}({selectedSubjectId})
          </p>
        )}
        <S.InputWrapper>
          <S.Label>문제 작성</S.Label>
          <S.TextArea
            placeholder="문제를 작성해 주세요."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>문제 유형</S.Label>
          <S.QuestionType>{questionType}</S.QuestionType>
        </S.InputWrapper>
        {enteredOptions.map((opt, idx) => (
          <S.InputWrapper key={idx}>
            <S.Label>{`보기 ${idx + 1}`}</S.Label>
            <S.Input
              type="text"
              placeholder={`보기 ${idx + 1}을 입력하세요.`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...enteredOptions];
                newOptions[idx] = e.target.value;
                setEnteredOptions(newOptions);
              }}
            />
          </S.InputWrapper>
        ))}
        <S.InputWrapper>
          <S.Label>정답</S.Label>
          <S.Input
            type="number"
            placeholder="정답을 입력하세요."
            value={correctAnswer ?? ''}
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>풀이</S.Label>
          <S.Input
            type="text"
            placeholder="문제에 대한 풀이를 입력하세요."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>출처</S.Label>
          <S.Input
            type="text"
            placeholder="작성한 문제의 출처를 입력하세요."
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>이미지 업로드</S.Label>
          <S.Input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageUrl && <S.ImagePreview src={imageUrl} alt="Preview" />}
        </S.InputWrapper>
      </S.WriteContainer>
      <S.ExitButton src={IconX} onClick={onClickBackButton} />
      <S.Text>
        ※ 허위, 중복, 성의없는 내용을 작성할 경우, 서비스 이용이 제한될 수
        있습니다.
      </S.Text>
      <S.PostButton
        onClick={async () => {
          if (selectedSubjectName !== null) {
            await handleSubmit();
          } else {
            alert('과목을 선택해 주세요.');
          }
        }}
      >
        등록하기
      </S.PostButton>

      {isModalOpen && (
        <SelectSubjectModal
          onClose={closeModal}
          onSelect={handleSubjectSelect}
        />
      )}
    </S.SubjectContainer>
  );
};

export default EditQuestion;
