import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
// import { useCookies } from "react-cookie";
// import { loginTest } from "../apis/auth.js";
import Page1 from "./Home/Page1";
import Page2 from "./Home/Page2";
import Page3 from "./Home/Page3";

function Home() {
  const navigate = useNavigate();
  // const [Greeting, setGreeting] = useState("");
  // const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  // useEffect(() => {
  //   // useCookies 훅에서 제공하는 cookies 객체를 사용하여 accessToken 값을 가져옵니다.
  //   const token = cookies.accessToken;

  //   const fetchData = async () => {
  //     if (token) {
  //       try {
  //         const response = await loginTest(token);
  //         setGreeting(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       console.log("No token found in cookies.");
  //     }
  //   };
  // }, [cookies]);

  const handleAutoDraw = () => {
    navigate("/home/auto");
  };

  const handleJustDraw = () => {
    navigate("/draw");
  };

  return (
    <>
    <Fragment>
      <div className="home-content">
        <img src="assets/img/hometext.png" alt="logo" className="home-text" />
        <img src="assets/img/homelogo.png" alt="logo" className="home-logo" />
        <div className="home-select-box">
          <button className="home-btn" onClick={handleAutoDraw}>
            Auto Draw!
          </button>
          <button className="home-btn" onClick={handleJustDraw}>
            Just Draw!
          </button>
        </div>
      </div>
    </Fragment>
    <Page1 />
    <Page2 />
    <Page3 />
    </>
  );
}

export default Home;
