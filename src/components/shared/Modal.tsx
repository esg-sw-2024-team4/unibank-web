import React from 'react';
import { Backdrop, ModalWrapper, CloseButton } from './Modal.styles';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  return (
    <>
      {isVisible && (
        <>
          <Backdrop isVisible={isVisible} onClick={onClose} />
          <ModalWrapper isVisible={isVisible}>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            {children}
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default Modal;
