import styled, { keyframes } from 'styled-components';

// Define the fadeInOut animation
const fadeInOut = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

// Define the scale-up animation
const scaleUp = keyframes`
  0% {
    transform: scale(0.4);
  }
  50% {
    transform: scale(0.45);
  }
  100% {
    transform: scale(0.4);
  }
`;

export const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IdeaIcon = styled.svg`
  width: 180px;
  height: 180px;
  animation: ${scaleUp} 2s ease-in-out infinite;
`;

export const LoadingText = styled.p`
  color: #5e5e5e;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0rem;
  animation: ${fadeInOut} 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;
