import * as S from './SelectSubjectModal.style';
import { FC, useEffect, useState } from 'react';
import { getSubjectsByKeyword, postSubject } from '../../services/api';
import { ISubject } from '../../interfaces';
import { useRecoilState } from 'recoil';
import { authState } from '../../store/authAtom';

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
          <S.CloseButton onClick={onClose}>X</S.CloseButton>
        </S.ModalHeader>
        <S.AddSubjectInput
          type="text"
          disabled={isProcessing}
          value={enteredSubjectName}
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
          과목 추가
        </S.AddSubjectButton>
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
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default SelectSubjectModal;
