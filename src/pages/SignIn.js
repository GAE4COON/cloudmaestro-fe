/* global google */
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth.js";
import { useAuth } from "../utils/auth/authContext";
import jwt_decode from "jwt-decode";

import "../styles/signin.css";

function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  const { user, setUser } = useAuth();

  const handleSignIn = async () => {
    const userData = {
      user_id: id,
      user_pw: password,
    };

    try {
      const response = await login(userData);
      const { accessToken, refreshToken } = response.data;

      setCookie("accessToken", accessToken, {
        path: "/",
        //httpOnly: true,
        // 다른 쿠키 설정들 (예: maxAge, domain, secure 등)도 추가 가능
      });

      setCookie("refreshToken", refreshToken, {
        path: "/",
        //httpOnly: true,
        // 다른 쿠키 설정들 (예: maxAge, domain, secure 등)도 추가 가능
      });

      //console.log("로그인 성공 :", response.data);

      navigate("/");
    } catch (error) {
      //console.log("로그인 실패 :", error.response);
      alert("로그인 실패");
    }
  };

  async function handleCallbackResponse(response) {
    //console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      //console.log(userObject);

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (e) {
      if (e.response) {
        console.error("Server error:", e.response.data);
      } else if (e.request) {
        console.error("No response received:", e.request);
      } else {
        console.error("Error:", e.message);
      }
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "930334345436-48kqha501bfk7c6snk5k2vlai4r1231n.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "signIn",
      shape: "rectangular",
    });
  }, []);

  return (
    <>
      <h1></h1>
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

        <div
          id="signInDiv"
          className="googleDiv"
          style={{ visibility: user ? "hidden" : "visible" }}
        ></div>
      </div>
    </>
  );
}

export default SignIn;
