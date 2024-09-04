import * as S from './WriteQuestion.styles';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/authAtom';
import DocumentIcon from '../assets/DocumentIcon.svg';
import IconX from '../assets/dismiss.svg';
import SelectSubjectModal from '../components/write/SelectSubjectModal';

const WriteQuestion: FC = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState); // Recoil 상태를 사용하여 인증 상태를 가져옵니다.

  const [questionText, setQuestionText] = useState('');
  const [questionType] = useState('객관식 문제');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
      alert('로그인 후 다시 시도해주세요.'); // 적절한 사용자 피드백 제공
      return;
    }

    // Check if selectedSubjectId is a number
    if (selectedSubjectId === null || isNaN(selectedSubjectId)) {
      console.error('Invalid Subject ID');
      alert('유효하지 않은 과목 ID입니다.');
      return;
    }

    // 'options' 배열 생성
    const options = [
      {
        option: 1,
        option_text: '답안 1 내용', // 여기에 실제 답안을 넣어야 함
        is_correct: correctAnswer === 1, // correctAnswer가 1이면 true
      },
      {
        option: 2,
        option_text: '답안 2 내용', // 여기에 실제 답안을 넣어야 함
        is_correct: correctAnswer === 2,
      },
      {
        option: 3,
        option_text: '답안 3 내용', // 여기에 실제 답안을 넣어야 함
        is_correct: correctAnswer === 3,
      },
      {
        option: 4,
        option_text: '답안 4 내용', // 여기에 실제 답안을 넣어야 함
        is_correct: correctAnswer === 4,
      },
    ];

    const questionData = {
      subject_id: selectedSubjectId,
      title: questionText,
      description: explanation,
      image_url: imageUrl,
      source: source,
      options: options,
    };

    const formData = new FormData();
    formData.append(
      'questionData',
      new Blob([JSON.stringify(questionData)], { type: 'application/json' })
    );

    // 이미지가 있다면 FormData에 추가
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      formData.append('image', blob);
    }

    try {
      const response = await fetch(`/api/questions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`, // Recoil 상태에서 가져온 토큰 사용
          // 'Content-Type': 'multipart/form-data', // 이 헤더는 fetch가 자동으로 설정하므로 주석 처리
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('문제 등록에 실패했습니다.');
      }
      navigate(`/subjects/${selectedSubjectId}`);
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
          console.log(selectedSubjectName);
          console.log(selectedSubjectId);
          console.log(typeof selectedSubjectId); // 'number', 'string' 등
          if (selectedSubjectName !== null) {
            await handleSubmit(); // handleSubmit 함수 내에서 navigate 호출됨
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

export default WriteQuestion;
