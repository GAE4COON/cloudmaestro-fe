import React, { useEffect, useRef, useState } from "react";
import "../styles/Introduce.css";
import { Tabs } from "antd";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LogoSection = () => {
  return (
    <div className="logo-container">
      <div className="content">
        <img src="assets/img/introducelogo.png" alt="logo" />
        <p>
          'CLOUD MAESTRO'는 보안 전문가들로 구성된 팀, 'GAE4COON'입니다.
          <br />
          클라우드 마이그레이션 이전 단계에서{" "}
          <span className="highlight">ISO 27001</span>을 기반으로 <br />
          <span className="highlight">보안성을 고려한 아키텍처 도식화</span>를
          제공합니다.
        </p>
      </div>
    </div>
  );
};

const TabSection = () => {
  const tabs = [
    {
      key: "1",
      label: "Cloud Migration이란?",
      children: "온프레미스의 정보자산을 Cloud 환경으로 이전하는 과정"
    },
    {
      key: "2",
      label: "클라우드 보안, 꼭 필요할까?",
      children: "ISO 27001 is an international standard for Information Security Management Systems (ISMS). It provides a framework for establishing, implementing, maintaining, and continually improving an ISMS within the context of an organization's overall business risks. The standard outlines a risk management process and specifies a set of controls that organizations can implement to secure their information assets."
    },
    {
      key: "3",
      label: "ISO/IEC 27001이란?",
      children: "ISO 27001 is an international standard for Information Security Management Systems (ISMS). It provides a framework for establishing, implementing, maintaining, and continually improving an ISMS within the context of an organization's overall business risks. The standard outlines a risk management process and specifies a set of controls that organizations can implement to secure their information assets."
    }
  ];
  return (
    <div className="container2">
      <StyledTabs items = {tabs}/>
      </div>
  );
};

const ImageSection = () => {
  return (
    <>
      <div className="img">
        <ImageWithCaption
          src="/assets/img/Draw(Network).png"
          alt="input_img"
          caption="On Premise"
        />
      </div>

      <div className="img">
        <ImageWithCaption
          src="/assets/img/Draw(AWS).png"
          alt="output_img"
          caption="After Migration"
        />
      </div>
    </>
  );
};

const ImageWithCaption = ({ src, alt, caption }) => {
  return (
    <>
      <img src={src} alt={alt} className="box-shadow" />
      <p>{caption}</p>
    </>
  );
};

const ContentSection = () => {
  return (
    <>
      <div className="content-dummy">
        <ContentBlock
          summaryText="보안성을 고려한 클라우드..."
          securityText="보안 기능"
        />
        <ContentBlock
          summaryText="보안성을 고려한 클라우드..."
          securityText="성능 최적화"
        />
        <ContentBlock
          summaryText="보안성을 고려한 클라우드..."
          securityText="비용 최적화"
        />
      </div>
    </>
  );
};

const ContentBlock = ({ summaryText, securityText }) => (
  <div className="content-block">
    <p>{summaryText}</p>
    <p>{securityText}</p>
  </div>
);

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

  return (
    <div className="about-container" ref={containerRef} onWheel={handleScroll}>
      <div ref={addtoRefs}>
        <LogoSection />
      </div>
      <div ref={addtoRefs}>
        <TabSection />
      </div>
      <div ref={addtoRefs}>
        <ImageSection />
      </div>
      <div ref={addtoRefs}>
        <ContentSection />
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
    width: 33vh;
    justify-content: center;
    align-items: center;
    color: black;
    font-weight: bold;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  font-size: 17px;
`;
