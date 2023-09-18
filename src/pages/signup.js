/* global google */
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "./../utils/auth/authContext";
import axios from "axios";

function Signup() {
  const { user, setUser } = useAuth();

  async function handleCallbackResponse(response) {
    console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      console.log(userObject);

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
    <div>
      <div id="signInDiv"></div>
      {user && (
        <div>
          <img
            src={user.picture}
            alt={user.name}
            style={{
              borderRadius: "50%", // 이 부분이 동그라미 모양을 만듭니다.
              width: "50px", // 이미지 크기를 조절합니다. 원하는 크기로 변경 가능합니다.
              height: "50px", // 이미지 크기를 조절합니다. 원하는 크기로 변경 가능합니다.
            }}
          />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default Signup;
