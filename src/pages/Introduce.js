import React, { useEffect, useRef, useState } from "react";
import "../styles/Introduce.css";
import { Tabs } from "antd";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button , Flex} from 'antd';
import IntroduceSecurity from "./Home/IntroduceSecurity"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LogoSection = () => {
  return (
    <div className="logo-container">
      <div className="content">
        <img src="assets/img/introducelogo.png" alt="logo" />
      </div>
    </div>
  );
};

const TabSection = () => {
  const tabs = [
    {
      key: "1",
      label: "Cloud Migration이란?",
      children: "온프레미스의 정보자산을 Cloud 환경으로 이전하는 과정",
    },
    {
      key: "2",
      label: "클라우드 보안, 꼭 필요할까?",
      children:
        "ISO 27001 is an international standard for Information Security Management Systems (ISMS). It provides a framework for establishing, implementing, maintaining, and continually improving an ISMS within the context of an organization's overall business risks. The standard outlines a risk management process and specifies a set of controls that organizations can implement to secure their information assets.",
    },
    {
      key: "3",
      label: "ISO/IEC 27001이란?",
      children:
        "ISO 27001 is an international standard for Information Security Management Systems (ISMS). It provides a framework for establishing, implementing, maintaining, and continually improving an ISMS within the context of an organization's overall business risks. The standard outlines a risk management process and specifies a set of controls that organizations can implement to secure their information assets.",
    },
  ];
  return (
    <div>
      <StyledTabs items={tabs} />
    </div>
  );
};


const Home = () => {
  let ref = useRef(null);
  ref.current = [];

  useEffect(() => {
    ref.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0, // 시작 투명도
          y: 100, // 아래에서 시작 (예: 50px 아래에서 시작)
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  let containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScroll = (e) => {
    if (isAnimating) return;

    let index = ref.current.indexOf(e.currentTarget);

    if (e.deltaY > 0 && index < ref.current.length - 1) {
      setIsAnimating(true);
      gsap.to(containerRef.current, {
        duration: 1,
        scrollTo: {
          y: (index + 1) * window.innerHeight,
        },
        onComplete: () => setIsAnimating(false),
      });
    } else if (e.deltaY < 0 && index > 0) {
      setIsAnimating(true);
      gsap.to(containerRef.current, {
        duration: 1,
        scrollTo: {
          y: (index - 1) * window.innerHeight,
        },
        onComplete: () => setIsAnimating(false),
      });
    }
  };

  const ImageSection = () =>{
      return(
        <FlexContainer>
          <ImageContainer>
            <img src="assets/img/icon1.png" alt="logo" style={{ width: "100px" }}/>
            <ButtonContainer>
            <h2>Architecture</h2>
            <p>
            클라우드 최적화 아키텍처 도식화 
            </p>
            <div style={{ marginTop: '5%'}}>
            </div>
          </ButtonContainer>
          </ImageContainer>
          <ImageContainer>
            <img src="assets/img/icon3.png" alt="logo" style={{ width: "100px" }}/>
            <ButtonContainer>
            <h2>Cost</h2>
            <p>
            서비스, 인스턴스를 고려한 정확한 비용 산정
            </p>
            <div style={{ marginTop: '5%'}}>
            </div>
          </ButtonContainer>
          </ImageContainer>
          <ImageContainer>
            <img src="assets/img/icon2.png" alt="logo" style={{ width: "100px" }} />
            <ButtonContainer>
            <h2>Security</h2>
            <p>
            사전 보안성 점검 보안 권고 및 가이드 기능
            </p>
            <div style={{ marginTop: '5%'}}>
            </div>
          </ButtonContainer>
          </ImageContainer>
        </FlexContainer>
      )
  }

  const Flow=() =>{
    return(
      <SecurityContainer>
        <ButtonContainer>
          <h2>Lift and Shift</h2>
            <p>
              네트워크 기반 클라우드 도식화 (일대일 대응)
            </p>
      </ButtonContainer>
      <div style={{ marginTop: "100px" }}>
        <img src="/assets/img/arrow.png" width="30px" height="30px" alt="Arrow" />
      </div>
      <ButtonContainer>
        <h2>Security</h2>
          <p>
            리소스 사용 상의 보안 가이드 라인
          </p>
          <p>
            아키텍처 설계 상의 보안 권고
          </p>
          <p>
            운영 상의 보안
          </p>
      </ButtonContainer>
      <div style={{ marginTop: "100px" }}>
        <img src="/assets/img/arrow.png" width="30px" height="30px" alt="Arrow" />
      </div>

      <ButtonContainer>
        <h2>Optimize</h2>
          <p>
            사용자 요구사항을 기반으로 한  
            최적화 아키텍처 도출
          </p>
      </ButtonContainer>
      <div style={{ marginTop: "100px" }}>
        <img src="/assets/img/arrow.png" width="30px" height="30px" alt="Arrow" />
      </div>
      <ButtonContainer>
        <h2>Cost</h2>
          <p>
            정확한 예상 비용 산정 결과 도출
          </p>
      </ButtonContainer>
    </SecurityContainer>
    )
  }

  const Introduce=()=>{
    return(
      <div style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: '20px',  marginBottom: "100px"  }}>
            'CLOUD MAESTRO'는 보안 전문가들로 구성된 팀, 'GAE4COON'입니다.
            <br />
            클라우드 마이그레이션 이전 단계에서{" "}
            <span style={{ fontWeight: 'bold' }}>ISO 27001</span>을 기반으로 <br />
            <span style={{ fontWeight: 'bold' }}>보안성을 고려한 아키텍처 도식화</span>를
            제공합니다.
          </p>

      <span style={{ textShadow: '2px 2px lightgray',fontWeight: 'bold',color: '#4D6295' ,fontSize: '50px' }}>
          Cloud Maestro
        </span>
  
    </div>
    )
  }



  return (
    <div className="about-container" ref={containerRef} onWheel={handleScroll}>
      <div ref={addtoRefs}>
        <LogoSection />
      </div>
      <div ref={addtoRefs}>
        <Introduce />
      </div>
      <div  ref={addtoRefs}>
        <ImageSection/>
      </div>
      <div ref={addtoRefs}>
        <TabSection />
      </div>
      <div ref={addtoRefs}>
        <Flow />
      </div>
      <div ref={addtoRefs}>
        <IntroduceSecurity />
      </div>
    </div>
  );
};

export default Home;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    justify-content: center;
  }

  .ant-tabs-tab {
    font-size: 20px;
    width: 30%;
    justify-content: center;
    color: black;
    font-weight: bold;
    margin-left:10px;
  }
  .ant-tabs-content {
    width: 80%; // Set the width of the tab content to 50%
    margin: 0 auto; // Center the content
    text-align:left;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:50vh;
  margin-top:20%;
  font-size: 17px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20vh;
  margin-right: 13%;
  margin-left : 13%;
  margin-top :10%;
`;

const ImageContainer = styled.div`
img {
  margin-top: 10%;
  width:70px;
  height:auto;
}

`;
const ButtonContainer = styled.div`
  text-align: left;
  h2{
    font-size:32px;
    color:(0,0,0,.65);
    font-weight:400;
    white-space:nowrap;
    
  }
  
`;

const SecurityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40vh;
  margin-left:5%;
  margin-right:5%;
`;



