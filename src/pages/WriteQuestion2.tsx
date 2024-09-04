import * as S from './WriteQuestion.styles';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentIcon from '../assets/DocumentIcon.svg';
import IconX from '../assets/dismiss.svg';
import SelectSubjectModal from '../components/write/SelectSubjectModal';

const WriteQuestion2: FC = () => {
  const navigate = useNavigate();

  // 과목 선택 관련
  const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(
    null
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubjectSelect = (subjectName: string, subjectId: number) => {
    setSelectedSubjectName(subjectName);
    setSelectedSubjectId(subjectId);
    closeModal();
  };

  const onClickBackButton = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const [input, setInput] = useState({
    subjectId: selectedSubjectId,
    authorId: 1,
    questionText: questionText,
    questionType: questionType,
    correctAnswer: correctAnswer,
    explanation: explanation,
    imageUrl: imageUrl,
    source: source,
  });
  
  useEffect(() => {
    if (userInfo) {
      console.log(`유저:${userInfo}`);
      console.log('useEffect 실행');
    }
  }, [userInfo]);
  useEffect(() => {
    setImageFiles(sendingImages.current);
    console.log(imageFiles);
  }, [imageFiles]);

  if (BETest && !userInfo) {
    return null;
  }

  const onSubmit = async () => {
    if (!input.questionText) {
      alert('문제를 입력해 주세요.');
      return;
    }
    if (!input.explanation) {
      alert('문제의 풀이를 입력해 주세요.');
      return;
    }


  return(
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
          {/*</S.InputWrapper><</S.WriteContainer>S.Input type="file" accept="image/*" onChange={handleImageUpload} />*/}
          {/*</S.SubjectContainer>{imageUrl && <S.ImagePreview src={imageUrl} alt="Preview" />} */}
        </S.InputWrapper>
      </S.WriteContainer>
      <S.ExitButton src={IconX} onClick={onClickBackButton} />
      <S.Text>
        ※ 허위, 중복, 성의없는 내용을 작성할 경우, 서비스 이용이 제한될 수
        있습니다.
      </S.Text>
      <S.PostButton
        onClick={async () => {
          if (selectedSubjectId !== null) {
            await handleSubmit();
            navigate(`/subjects/${selectedSubjectId}`);
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
          onSelect={handleSubjectSelect} // 선택된 과목 ID와 이름을 받는 함수
        />
      )}
    </S.SubjectContainer>
  );
};

export default WriteQuestion2;
