/* global google */
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAuth } from "../utils/auth/authContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../styles/signup.css";

function Signup() {
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
    <div className="sign-up-content">
      <br></br>
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
