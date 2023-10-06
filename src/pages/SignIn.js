import React, { useState } from "react";

import "../styles/signin.css";

function SignIn() {
  // Define state variables
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Logic for signing in goes here
    // For example, send `id` and `password` to your API for authentication
  };

  return (
    <div className="sign-in-form">
      <h1>로그인</h1>
      <div className="input-group">
        <label>아이디</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>

      <div className="input-group">
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSignIn} className="submit">
        제출
      </button>
    </div>
  );
}

export default SignIn;
