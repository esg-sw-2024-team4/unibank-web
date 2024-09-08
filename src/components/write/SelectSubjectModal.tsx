import * as S from './SelectSubjectModal.style';
import { FC, useEffect, useState } from 'react';
import { getSubjectsByKeyword, postSubject } from '../../services/api';
import { ISubject } from '../../interfaces';
import { useRecoilState } from 'recoil';
import { authState } from '../../store/authAtom';
import Xicon from '../../assets/dismiss.svg';

interface SelectSubjectModalProps {
  onSelect: (selectedSubjectName: string, selectedSubjectId: number) => void;
  onClose: () => void;
}

const SelectSubjectModal: FC<SelectSubjectModalProps> = ({
  onSelect,
  onClose,
}) => {
  const [token] = useRecoilState(authState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filteredSubjectList, setFilteredSubjectList] = useState<ISubject[]>(
    []
  );
  const [enteredSubjectName, setEnteredSubjectName] = useState('');
  useEffect(() => {
    getSubjectsByKeyword('').then((data) => {
      if (data) {
        const { data: fetchedSubjectsAll } = data;
        setFilteredSubjectList(fetchedSubjectsAll);
      }
    });
  }, []);
  const handleClickAddSubject = async () => {
    if (!enteredSubjectName) {
      return;
    }
    setIsProcessing(true);
    try {
      await postSubject(token.accessToken, {
        name: enteredSubjectName,
        description: enteredSubjectName,
      });
      const data = await getSubjectsByKeyword('');
      if (data) {
        const { data: fetchedSubjectsAll } = data;
        setFilteredSubjectList(fetchedSubjectsAll);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.Title>과목 선택</S.Title>
          <S.CloseButton onClick={onClose}>
            <img src={Xicon} alt="닫기" />
          </S.CloseButton>
        </S.ModalHeader>
        <S.SubjectList>
          {filteredSubjectList.map((subject) => (
            <S.SubjectItem
              key={subject.id}
              onClick={() => {
                onSelect(subject.name, subject.id); // 부모 컴포넌트로 선택된 과목 이름과 id 전달
                onClose(); // 모달 닫기
              }}
            >
              {subject.name}
            </S.SubjectItem>
          ))}
        </S.SubjectList>
        <p style={{ marginTop: '30px', marginBottom: '5px', color: 'gray' }}>
          찾는 과목이 없다면, 과목을 직접 추가해 보세요.
        </p>
        <div
          style={{
            display: 'flex',
            width: '95%',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <S.AddSubjectInput
            type="text"
            disabled={isProcessing}
            value={enteredSubjectName}
            placeholder="추가할 과목명을 입력해 주세요."
            onChange={(e) => {
              setEnteredSubjectName(e.target.value);
            }}
          />
          <S.AddSubjectButton
            type="button"
            disabled={isProcessing}
            onClick={() => {
              handleClickAddSubject();
              setEnteredSubjectName('');
            }}
          >
            +
          </S.AddSubjectButton>
        </div>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default SelectSubjectModal;
