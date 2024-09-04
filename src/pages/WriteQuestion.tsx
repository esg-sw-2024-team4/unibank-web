import * as S from './WriteQuestion.styles';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/authAtom';
import DocumentIcon from '../assets/DocumentIcon.svg';
import IconX from '../assets/dismiss.svg';
import SelectSubjectModal from '../components/write/SelectSubjectModal';
import { postProblem } from '../services/api'; // Axios 인스턴스를 사용하는 API 함수
import { IProblem } from '../interfaces';

const WriteQuestion: FC = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  const [questionText, setQuestionText] = useState('');
  const [questionType] = useState('객관식 문제');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [source, setSource] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(
    null
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
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
    if (!auth.isAuthenticated || !auth.accessToken) {
      console.error('No token found');
      alert('로그인 후 다시 시도해주세요.');
      return;
    }

    if (selectedSubjectId === null || isNaN(selectedSubjectId)) {
      console.error('Invalid Subject ID');
      alert('유효하지 않은 과목 ID입니다.');
      return;
    }

    const options = [
      {
        option: 1,
        option_text: '답안 1 내용',
        is_correct: correctAnswer === 1,
      },
      {
        option: 2,
        option_text: '답안 2 내용',
        is_correct: correctAnswer === 2,
      },
      {
        option: 3,
        option_text: '답안 3 내용',
        is_correct: correctAnswer === 3,
      },
      {
        option: 4,
        option_text: '답안 4 내용',
        is_correct: correctAnswer === 4,
      },
    ];

    const questionData: Omit<IProblem, 'id'> = {
      subject_id: selectedSubjectId,
      title: questionText,
      description: explanation,
      image_url: imageUrl || '', // Optional field, provide default empty string
      source: source,
      options: options,
    };

    const formData = new FormData();
    formData.append('questionData', JSON.stringify(questionData));

    // 이미지가 있다면 FormData에 추가
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      formData.append('image', blob, 'image.jpg'); // blob과 파일명을 설정
    }

    try {
      // Axios를 사용하여 문제 데이터 전송
      await postProblem(auth.accessToken, questionData);
      // await putProblem(auth.accessToken, { id: 1, ...questionData });
      navigate(`/subjects/${selectedSubjectId}`);
    } catch (error) {
      console.error('An error occurred while submitting the question', error);
      alert('문제 등록에 실패했습니다.');
    }
  };

  return (
    <S.SubjectContainer>
      {/* 컴포넌트 UI 코드 그대로 유지 */}
      <S.TitleDiv>
        <S.Icon src={DocumentIcon} alt="Document Icon" />
        <S.H1>문제 등록하기</S.H1>
        <p>새로운 문제를 등록하세요.</p>
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

export default WriteQuestion;
