import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleAutoDraw = () => {
    navigate("/input");
  };

  const handleJustDraw = () => {
    navigate("/draw");
  };

  return (
    <Fragment>
      <div className="home-content">
        <div className="img-container">

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
