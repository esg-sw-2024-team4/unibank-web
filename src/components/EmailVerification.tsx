import React from 'react';

interface EmailVerificationProps {
  email: string;
  setEmail: (email: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  handleSendVerification: () => void;
  handleVerifyCode: () => void;
  isVerificationSent: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
  handleSendVerification,
  handleVerifyCode,
  isVerificationSent,
}) => {
  return (
    <>
      <div className="email-verification-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <button onClick={handleSendVerification}>코드 전송</button>
      </div>

      {isVerificationSent && (
        <div className="email-check-container">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증 코드"
          />
          <button onClick={handleVerifyCode}>확인</button>
        </div>
      )}
    </>
  );
};

export default EmailVerification;
