import * as S from './WriteQuestion.styles';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentIcon from '../assets/DocumentIcon.svg';
import IconX from '../assets/dismiss.svg';
import SelectSubjectModal from '../components/write/SelectSubjectModal';

const WriteQuestion: FC = () => {
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState('');
  const [questionType] = useState('객관식 문제');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [source, setSource] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(
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

  const handleSubjectSelect = (subjectName: string) => {
    setSelectedSubjectName(subjectName); // 선택된 과목 이름 저장
    closeModal();
  };

  const handleSubmit = async () => {
    const questionData = {
      //subject_id: selectedSubjectId,
      author_id: 1,
      question_text: questionText,
      question_type: questionType,
      correct_answer: correctAnswer,
      explanation: explanation,
      image_url: imageUrl,
      source: source,
    };
    try {
      // API 요청 로직
    } catch (error) {
      console.error('An error occurred while submitting the question', error);
    }
  };

  return (
    <S.SubjectContainer>
      <S.TitleDiv>
        <S.Icon src={DocumentIcon} alt="Document Icon" />
        <S.H1>문제 등록하기</S.H1>
        <p>새로운 문제를 등록하세요.</p>
      </S.TitleDiv>
      <S.WriteContainer>
        <S.Button onClick={openModal}>과목 선택</S.Button>
        {selectedSubjectName && <p>선택된 과목: {selectedSubjectName}</p>}
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
      <S.PostButton onClick={handleSubmit}>등록</S.PostButton>
      {isModalOpen && (
        <SelectSubjectModal
          onClose={closeModal}
          onSelect={handleSubjectSelect} // 선택된 과목 ID를 받는 함수
        />
      )}
    </S.SubjectContainer>
  );
};

export default WriteQuestion;
