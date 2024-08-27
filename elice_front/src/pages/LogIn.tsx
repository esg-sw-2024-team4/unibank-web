import React, { useState } from "react";
import "../cssfolder/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      if (response.status === 200) {
        alert("로그인 성공");
        navigate("/");
      }
    } catch (error) {
      console.log("로그인 오류:", error);
      alert("로그인 실패");
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h1>서비스 이름</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="login-input"
        />
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      <div className="signup-prompt">
        <span>아직 회원이 아니신가요? </span>
        <button onClick={navigateToSignUp} className="signup-link">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
