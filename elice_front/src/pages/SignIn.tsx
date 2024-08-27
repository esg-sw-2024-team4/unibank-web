import React, { useState } from "react";
import "../cssfolder/SignIn.css"; // CSS 파일 가져오기
import EmailVerification from "../components/EmailVerification";
import TermsAndConditions from "../components/TermsAndConditions";
import SignUpForm from "../components/SignUpForm";
import axios from "axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(true);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [univ, setUniv] = useState<string>("");
  // const [major, setMajor] = useState<string>("");

  const [allAgree, setAllAgree] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);

  // 이메일 인증 요청
  const handleSendVerification = async () => {
    try {
      const response = await axios.post("/이메일 인증 api", { email });
      if (response.status === 200) {
        alert("인증 코드가 이메일로 전송되었습니다.");
        setIsVerificationSent(true);
      }
    } catch (error) {
      console.log("인증 코드 전송 오류:", error);
      alert("인증 코드 전송 실패");
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("/이메일 인증 api", {
        email,
        code: verificationCode,
      });
      if (response.status === 200) {
        alert("이메일 인증 성공");
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.log("이메일 인증 오류:", error);
      alert("이메일 인증 실패");
    }
  };

  // 회원가입 요청
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post("/users", {
        email,
        password,
        // univ,
        // major,
      });
      if (response.status === 201) {
        alert("회원가입 성공");
      }
    } catch (error) {
      console.log("회원가입 오류:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="signin-container">
      <h3>회원가입</h3>

      <TermsAndConditions
        allAgree={allAgree}
        showTerms={showTerms}
        setAllAgree={setAllAgree}
        setShowTerms={setShowTerms}
      />

      <EmailVerification
        email={email}
        setEmail={setEmail}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleSendVerification={handleSendVerification}
        handleVerifyCode={handleVerifyCode}
        isVerificationSent={isVerificationSent}
      />

      <SignUpForm
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        // univ={univ}
        // setUniv={setUniv}
        // major={major}
        // setMajor={setMajor}
        handleSignUp={handleSignUp}
      />
    </div>
  );
};

export default SignIn;
