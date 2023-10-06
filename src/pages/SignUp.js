/* global google */
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../utils/auth/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const checkIdDuplication = async () => {
    const data = {
      user_id: id,
    };
    try {
      const response = await axios.post(
        "/api/v1/users/id-dup-check",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result) {
        alert("이미 사용중인 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("Error checking ID duplication:", error);
      alert("아이디 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSignUp = () => {
    // 가입 로직을 여기에 구현
    console.log("Signed up with:", { id, password, email, phone });
  };
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      console.log(userObject);

      setTimeout(() => {
        navigate("/");
      }, 1500);

      // const res = await axios.post("YOUR_BACKEND_ENDPOINT", {
      //   token: response.credential,
      // });

      // console.log(res.data);
      // Handle successful response from your server
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
    <div className="sign-up-form">
      <h1>회원가입</h1>
      <div className="input-group">
        <label>아이디</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={checkIdDuplication}>중복확인</button>
      </div>

      <div className="input-group">
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div></div>
      </div>

      <div className="input-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div></div>
      </div>

      <div className="input-group">
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => console.log("인증 요청")}>인증요청</button>
      </div>

      <div className="input-group">
        <label>휴대전화</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div></div>
      </div>

      <button onClick={handleSignUp} className="submit">
        제출
      </button>

      <p>
        아이디가 있는 경우 <a href="/login">로그인해주세요</a>. 가입 후 아이디
        변경은 불가합니다. 가입을 하면 <a href="/terms">이용약관</a>,{" "}
        <a href="/privacy">개인정보취급 방침</a> 및 개인정보3자제공에 동의하게
        됩니다.
      </p>
      {user ? (
        <div>
          <img
            src={user.picture}
            alt={user.name}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
          />
          <h3>{user.name}</h3>
        </div>
      ) : null}
      <div
        id="signInDiv"
        className="googleDiv"
        style={{ visibility: user ? "hidden" : "visible" }}
      ></div>
    </div>
  );
}

export default Signup;
