import React from "react";

interface SignUpFormProps {
  password: string;
  confirmPassword: string;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  //   univ: string;
  //   setUniv: (univ: string) => void;
  //   major: string;
  //   setMajor: (major: string) => void;
  handleSignUp: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  //   univ,
  //   setUniv,
  //   major,
  //   setMajor,
  handleSignUp,
}) => {
  return (
    <form onSubmit={handleSignUp}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      {/* <input
        type="text"
        value={univ}
        onChange={(e) => setUniv(e.target.value)}
        placeholder="대학교"
      />
      <input
        type="text"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="전공"
      /> */}
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUpForm;
