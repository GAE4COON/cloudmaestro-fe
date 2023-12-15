import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
// import { useCookies } from "react-cookie";
// import { loginTest } from "../apis/auth.js";
import Page1 from "./Home/Page1";
import Page2 from "./Home/Page2";
import Page3 from "./Home/Page3";
import Page4 from "./Home/Page4";
import { Button } from "antd";

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
    navigate("/draw/auto");
  };

  const handleJustDraw = () => {
    navigate("/draw");
  };

  const startTourDraw = () => {
    navigate("/draw", {
      state: { tour: true },
    });
  };

  return (
    <>
      <Fragment>
        <HomeContainer>
          <HomeContent>
            {/* <img src="assets/img/hometext.png" alt="logo" className="home-text" /> */}
            <HomeTextContent>
            <HomeText>Cloud Maestro와 함께<br/> 클라우드 환경에 빠르게 적응해보세요.</HomeText>
            <HomeTextDescription>Cloud Maestro는 클라우드에 대한 전문지식이 없는 사람들도 쉽게 클라우드 환경을 이해하고 활용할 수 있도록 돕는 클라우드 마이그레이션 및 도입 지원 플랫폼입니다.</HomeTextDescription>

            </HomeTextContent>
            
            <HomeImg src="assets/img/homelogo.png" alt="logo" />
          </HomeContent>
            {/* <HomeButtonText>지금 그려보세요.</HomeButtonText> */}
            <HomeTextTutorial >
              먼저, <GradientTextContent onClick={()=>startTourDraw()}>튜토리얼</GradientTextContent>을 통해 Cloud Maestro의 기능을 살펴보세요.
            </HomeTextTutorial>
            <HomeSelectBox>
{/* 
            <TutorialButton onClick={handleAutoDraw}
  

            >
              Tutorial
            </TutorialButton> */}


            <DrawButton>
            <StyledButton onClick={handleAutoDraw}>
              Use Template
            </StyledButton>
            <StyledButton onClick={handleJustDraw}>
              Just Draw
            </StyledButton>
            </DrawButton>
          </HomeSelectBox>


        </HomeContainer>

      </Fragment>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </>
  );
}
const HomeTextTutorial = styled.div`
/* margin-top: 40px; */
  font-size: 20px;
margin-left: 10%;
text-align: left;
  font-weight: 600;
  color:#fff;
  margin-bottom: 20px;
  /* flex: 2; */
  font-family: "Noto Sans KR", sans-serif;
  /* font-weight: 800; */
  /* text-align: right; */
  `;

const StyledButton = styled(Button)`
  min-width: 150px;
  height: 40px;
  font-size: 16px;
  color: #0070C0;
  background-color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
`

const TutorialButton = styled(Button)`
  min-width: 150px;
  height: 40px;
  font-size: 16px;
  color: white;
  background-color: #0070C0;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
`

const HomeButtonText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  text-align: left;
  margin-left: 10%;
  margin-bottom: 20px;
  `;

const HomeContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 95vh;
  width: 100%;
  background-image: linear-gradient(135deg, #00B0F0, #0070C0, #002060);
  clip-path: polygon(0 0, 100% 0%, 100% 90%, 0 100%);

 `;

const HomeTextDescription = styled.div`

  font-size: 18px;
  /* font-weight: 600; */
  color: #fff;
  /* flex: 2; */
  font-family: "Noto Sans KR", sans-serif;
  /* font-weight: 800; */
  text-align: left;
  `;

const HomeText = styled.div`
  font-size: 38px;
  font-weight: 600;
  color: #fff;
  flex: 2;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
  text-align: left;
  text-shadow: 1px 1px 1px gray;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 3px solid #fff;
  /* border: 1px solid red; */
    /* max-width: 50%; */
`;

const HomeImg = styled.img`
margin-top: 100px;
  animation: floatAnimation 2s ease-in-out infinite;
  height: auto;
  width: 30%;
  filter: brightness(120%);
`;

const HomeTextContent = styled.div`

`;

const HomeContent = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  flex-direction: row; /* Ensure the direction is row */
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
  gap: 30px;
  height: 60%;
`;

const DrawButton = styled.div`  
  display: flex;
  flex-direction: row;
  flex:1;
  gap: 10px;

  `;

const HomeSelectBox = styled.div`
width: 20%;
  color:#3064D6;
  z-index: 1;
  font-size: 1rem; 
  display: flex;
  flex-direction: column;  
  margin-left: 10%;
  /* flex-direction: row; // Ensures the buttons are in a row */
  /* justify-content: flex-start; // Aligns the buttons to the left */
  gap: 20px; // Keeps space between the buttons
  `;

const GradientTextContent = styled.span`
cursor: pointer;
color: white;
    background-color: #0070C0;
/* background-image: linear-gradient(to right, #00B0F0, #0070C0, #002060); */
/* -webkit-background-clip: text; */
/* background-clip: text; */

/* border: 1px solid #fff; */
/* text-shadow: -0.1px 0px white, 0px 0.1px white, 0.1px 0px white, 0px -01px white; */
/* font-size: 22px; */
font-weight: 800; /* Adjust font weight as needed */
border-radius: 20px;
padding-right: 10px;
margin-right: 5px;
padding-left: 10px;
text-align: center;
justify-content: center;
  &:hover {
    color: #0070C0;
    background-color: #fff;
  }

`

export default Home;
