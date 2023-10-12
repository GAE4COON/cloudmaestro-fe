import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useCookies } from "react-cookie";
import { loginTest } from "../apis/auth.js";
import { summaryFile } from "../apis/file";

function Home() {
  const navigate = useNavigate();
  const [Greeting, setGreeting] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    // useCookies 훅에서 제공하는 cookies 객체를 사용하여 accessToken 값을 가져옵니다.
    const token = cookies.accessToken;

    const fetchData = async () => {
      if (token) {
        try {
          const response = await loginTest(token);
          setGreeting(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token found in cookies.");
      }
    };
  }, [cookies]);

  const handleAutoDraw = () => {
    navigate("/home/autodraw");
  };

  const handleJustDraw = () => {
    navigate("/draw");
  };

  const uploadFile = async (event) => {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);

      const file = event.target.files[0];
      const fd = new FormData();
      fd.append("file", file);
      try {
        const response = await summaryFile(fd);
          console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    } 
  };

  return (
    <Fragment>
      <div className="home-content">
        <div className="img-container">
          <h1>{Greeting}</h1>
          <h1>{Greeting}</h1>

          <label htmlFor="customFileUpload" className="custom-file-label">
          Upload
        </label>
        <input
          type="file"
          id="customFileUpload"
          className="custom-file-input"
          onChange={uploadFile}
        />
          <img
            src="assets/img/Cloud-architecture.png"
            alt="logo"
            className="home-img"
          />
          <div className="home-select-box">
            <h1>WELCOME TO CLOUD MAESTRO!</h1>
            <h2 className="home-select-text">
              Automated Diagram of a Cloud Architecture with Security
              Considerations
            </h2>
            <button className="home-btn" onClick={handleAutoDraw}>
              Auto Draw!
            </button>
            <button className="home-btn" onClick={handleJustDraw}>
              Just Draw!
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
