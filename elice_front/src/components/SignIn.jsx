import React, { useState } from "react";
import "../cssfolder/Signin.css";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 선택 문항 (?)
  const [univ, setUniv] = useState("");
  const [major, setMajor] = useState("");
  const [name, setName] = useState("");

  // 약관 관련
  const [allAgree, setAllAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users", {
        email,
        password,
        univ,
        major,
      });
      if (response.status == 201) {
        alert("회원가입 성공");
      }
    } catch (error) {
      console.log("회원가입 오류:", error);
      alert("회원가입 실패");
    }
  };
  return (
    <div className="signin-container">
      <p className="ptag">회원가입</p>
      <p className="agreetag">약관 동의</p>
      <div className="terms-container">
        <div>
          <label className="terms-label">
            <input
              style={{ margin: "1px" }}
              type="checkbox"
              checked={allAgree}
              onChange={(e) => setAllAgree(e.target.checked)}
            />
            <p style={{ fontSize: "15px" }}>아래 약관에 모두 동의합니다.</p>
          </label>
        </div>
        <div className="terms-right">
          <span className="terms-link" onClick={() => setShowTerms(!showTerms)}>
            전문보기
          </span>
        </div>
      </div>
      {showTerms && (
        <div className="terms-content">
          <p>약관내용</p>
        </div>
      )}
      {/* 내용 추가해야됨 */}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <br />
        <br />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignIn;
