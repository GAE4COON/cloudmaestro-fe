import React, { useState, useEffect } from "react";
import "../styles/Example.css";
import "../styles/App.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useExampleFile } from "../components/useExampleFile";

const Learn = () => {
  const [index, setIndex] = useState(1);
  const [displayedText1, setDisplayedText1] = useState("");
  const location = useLocation();
  const type = location?.state?.type;

  const { getExampleFile } = useExampleFile();

  useEffect(() => {
    animateText("Get Started with Clound Migration", setDisplayedText1, 100);

    console.log("type:", type);

    if (type) {
      if (type === "excel") {
        window.scrollTo(0, 300);
      }
      if (type === "json") {
        window.scrollTo(0, 1570);
      }
    }
  }, [location]);

  const animateText = (fullText, setter, speed) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setter(fullText.substring(0, i));
      if (i === fullText.length) {
        clearInterval(interval);
      }
    }, speed);
  };

  const renderNameSection = (name) => <div className="name">{name}</div>;

  const nameSection = (name) => <div className="mainname">{name}</div>;

  const explainNetwork = (summary, index, img_src, img_json) => (
    <div className="explain">
      <div className="summary">
        <div className="summary">
          Network Example 1<br />
          how to make safe network environment
        </div>
        <div className="link">
          <Link to={`/learnmore/${index}`}>Learn More</Link>
        </div>
      </div>
      <div className="img">
        <Link to="/draw" state={img_json}>
          <img className="custom-img" src={img_src} alt="도식화하는 이미지" />
        </Link>
      </div>
    </div>
  );

  const explainAWS = (summary, index, img_src, img_json) => (
    <div className="explain">
      <div className="summary">
        <div className="summary">
          Network Example 1<br />
          how to make safe network environment
        </div>
        <div className="link">
          <Link to={`/learnmore/${index}`}>Learn More</Link>
        </div>
      </div>
      <div className="img">
        <Link to="/draw" state={img_json}>
          <img className="custom-img" src={img_src} alt="도식화하는 이미지" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      <div className="container1">
        <div className="content">
          <p>{displayedText1}</p>
        </div>
      </div>

      <button onClick={() => getExampleFile(1)}>1번 템플릿 가져오기</button>
      <button onClick={() => getExampleFile(2)}>2번 템플릿 가져오기</button>

      {nameSection("Network Excel")}
      <div className="Excels">
        <div id="Excels-left" />
        <div>
          <div id="block">
            <div>{renderNameSection("User Guide for Input")}</div>
            <div>
              {explainNetwork(
                "user",
                1,
                "/assets/learn_template/Network1.png",
                "/assets/learn_template/Network1.json"
              )}
            </div>
          </div>
          <div id="block">
            <div>{renderNameSection("Network Excel")}</div>
            <div>{explainNetwork("User Guide for Input", 2)}</div>
          </div>
        </div>
        <div id="Excels-right" />
      </div>

      {nameSection("Network Draw")}
      <div className="Excels">
        <div id="Excels-left" />
        <div>
          <div id="block">
            <div>{renderNameSection("Network Excel")}</div>
            <div>
              {explainAWS(
                "user",
                3,
                "/assets/learn_template/AWS1.png",
                "/assets/learn_template/AWS1.json"
              )}
            </div>
          </div>
          <div id="block">
            <div>{renderNameSection("Network Excel")}</div>
            <div>{explainAWS("User Guide for Input", 4)}</div>
          </div>
          <div id="block">
            <div>{renderNameSection("Network Excel")}</div>
            <div>{explainAWS("User Guide for Input", 5)}</div>
          </div>
          <div id="block">
            <div>{renderNameSection("Network Excel")}</div>
            <div>{explainAWS("User Guide for Input", 6)}</div>
          </div>
        </div>
        <div id="Excels-right" />
      </div>
    </div>
  );
};

export default Learn;
