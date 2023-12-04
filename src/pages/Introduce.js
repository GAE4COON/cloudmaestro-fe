import React, { useEffect, useRef, useState } from "react";
import "../styles/Introduce.css";
import { Tabs } from "antd";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button , Flex} from 'antd';
import IntroduceSecurity from "./Introduce/IntroduceSecurity";
// PAGE 

import First from "./Introduce/First";
import Second from  "./Introduce/Second";
import Third from "./Introduce/Third"
import Introduce from "./Introduce/intro";
const { TabPane } = Tabs;

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
const tabs = [
  {
    key: "1",
    label: "Cloud Migration이란?",
    id: "section1",
    content: <First />,
  },
  {
    key: "2",
    label: "클라우드 보안, 꼭 필요할까?",
    id: "section2",
    content: <Second />,
  },
  {
    key: "3",
    label: "ISO/IEC 27001이란?",
    id: "section3",
    content: <Third />,
  },
];

function StyledTabs({ items, activeTab, onTabClick }) {
  return (
    <StyledTabsContainer>
    {items.map((item) => (
      <StyledTab
        key={item.id}
        onClick={() => {
          if (activeTab !== item.id) {
            onTabClick(item.id);
          } else {
            const labelRef = document.getElementById(item.id);
            if (labelRef) {
              labelRef.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }}
        active={activeTab === item.id}
      >
        <h2>{item.label}</h2>
      </StyledTab>
    ))}
  </StyledTabsContainer>
  );
}

const StyledTabsContainer = styled.div`
  margin-top:20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTab = styled.div`
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
width: 100%;
height:20vh;
font-size: 17px;
`;




const Home = () => {
  const [activeTab, setActiveTab] = useState(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  let ref = useRef(null);
  ref.current = [];
  let isScrolling = false;

  const handleTabClick = (id) => {
    // Scroll to the clicked section
    const sectionRef = id === "section1" ? section1Ref : id === "section2" ? section2Ref : section3Ref;
    scrollTo(sectionRef.current);

    // Set the active tab
    setActiveTab(id);
  };

  // Custom scroll function
  const scrollTo = (element) => {
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element.offsetTop,
        },
      });
    }
  };

  useEffect(() => {
    // Scroll to the active section when the activeTab changes
    const sectionRef = activeTab === "section1" ? section1Ref.current : activeTab === "section2" ? section2Ref.current : section3Ref.current;
    scrollTo(sectionRef);
  }, [activeTab]);
  
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
      <div>
        <div>
          <StyledTabs items={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
          {/* Add your sections with corresponding IDs */}
          <div ref={section1Ref} id="section1">
            {activeTab === "section1" && <First />}
          </div>
          <div ref={section2Ref} id="section2">
            {activeTab === "section2" && <Second />}
          </div>
          <div ref={section3Ref} id="section3">
            {activeTab === "section3" && <Third />}
          </div>
        </div>
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
  margin-top:5%;
  margin-left:5%;
  margin-right:5%;
`;





