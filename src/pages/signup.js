/* global google */
import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function Signup() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log(response.credential);
    try {
      var userObject = jwt_decode(response.credential);
      setUser(userObject);
      console.log(userObject);
    } catch (e) {
      console.error("Failed to decode token:", e);
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
          <img src={user.picture} alt={user.name}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default Signup;
