import * as S from './SelectSubjectModal.style';
import { FC, useEffect, useState } from 'react';
import { getSubjectsByKeyword } from '../../services/api';
import { ISubject } from '../../interfaces';

interface SelectSubjectModalProps {
  onSelect: (selectedSubjectId: number) => void;
  onClose: () => void;
}

const SelectSubjectModal: FC<SelectSubjectModalProps> = ({
  onSelect,
  onClose,
}) => {
  const [filteredSubjectList, setFilteredSubjectList] = useState<ISubject[]>(
    []
  );

  useEffect(() => {
    getSubjectsByKeyword('').then((data) => {
      if (data) {
        const { data: fetchedSubjectsAll } = data;
        setFilteredSubjectList(fetchedSubjectsAll);
      }
    });
  }, []);

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.Title>과목 선택</S.Title>
          <S.CloseButton onClick={onClose}>X</S.CloseButton>
        </S.ModalHeader>
        <S.SubjectList>
          {filteredSubjectList.map((subject) => (
            <S.SubjectItem
              key={subject.id}
              onClick={() => {
                onSelect(subject.id); // 부모 컴포넌트로 선택된 과목 ID 전달
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
