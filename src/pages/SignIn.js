import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/signin.css";

function SignIn() {
  // Define state variables
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [Greeting, setGreeting] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/users/hello")
      .then((response) => setGreeting(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = () => {
    // Logic for signing in goes here
    // For example, send `id` and `password` to your API for authentication
  };

  return (
    <>
      <h1></h1>
      <h1>여기는 로그인 페이지 {Greeting}에서 가져왔습니다.</h1>
      <div className="sign-in-form">
        <h1>로그인</h1>
        <div className="input-group">
          <label>아이디</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
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
    </>
  );
}

export default SignIn;
