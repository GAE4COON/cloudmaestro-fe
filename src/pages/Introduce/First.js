import React, { useEffect , useState} from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import "../../styles/Introduce.css";

export default function First() {
  
  const [jsonData, setJsonData] = useState(null);

  const [imageRef, imageInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/json/network.json');
        const filejson = await response.json();
        console.log("filejson" ,filejson);
        setJsonData(filejson); // Store the JSON data in state
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchData();
     
  },[])


  return (
    <div className="about-container">
        <CloudContainer>
            <IntroduceContainer ref={imageRef} inView={imageInView}>
                <h2>클라우드 마이그레이션이란?</h2>
                <p>
                    기존의 기업의 네트워크 장비를 비롯한 물리적 정보자산 
                    환경(On-Premie)을 <span style={{ fontWeight: 'bold', fontSize: 'larger', color: 'blue'  }}>클라우드 환경</span>으로 옮기는 것을 말합니다.
                    글로벌 리더 기업을 비롯하여, 국내 최고 기업이라고 일컬어지는 기업들은 모두 기업의 인프라 자원 중 대부분이 클라우드 환경 내에서 가동하고 있으며, 기업 자체적인 클라우드 환경을 만들기 위한 노력 또한 지속 중입니다.
                </p>
                
            </IntroduceContainer>
            <IntroduceImageContainer ref={imageRef} inView={imageInView}>
                <img src="/assets/introduce_img/chart2.png" alt="logo" />
            </IntroduceImageContainer>

        </CloudContainer>

        <FlexContainer>
            <ButtonContainer ref={imageRef} inView={imageInView}>
                <p>
                이를 뒷받침하듯, 세계 최대의 정보기술 자문회사 Gartner에서도 클라우드 시장의 지속적인 성장을 예측하고 있으며, 
                IBM report에 따르면 2025년까지 대부분의 기업 인프라 자원이 클라우드로 변화해갈 것임을 알 수 있습니다
                </p>
            </ButtonContainer>
        
            <ImageContainer ref={imageRef} inView={imageInView}>
                <img src="assets/introduce_img/gartner.png" alt="logo" />
            </ImageContainer>
        </FlexContainer>

        <CloudContainer>
            <IntroduceContainer ref={imageRef} inView={imageInView}>
                <h2>왜 많은 기업들이 클라우드에 주목할까요?</h2>
                <p>
                    동적이고 유연한 클라우드 특성에서 비롯된 수많은  <span style={{ fontWeight: 'bold', fontSize: 'larger', color: 'blue'  }}>Benefit Point</span>가 존재하기 때문입니다
            
                    글로벌 리더 기업을 비롯하여, 국내 최고 기업이라고 일컬어지는 기업들은 모두 기업의 인프라 자원 중 대부분이 클라우드 환경 내에서 가동하고 있으며, 기업 자체적인 클라우드 환경을 만들기 위한 노력 또한 지속 중입니다.
                </p>
            </IntroduceContainer>
        </CloudContainer>
        
        <FlexContainer2>
        
            <ImageContainer2 ref={imageRef} inView={imageInView}>
                <img src="assets/introduce_img/cloud.png" alt="logo" />
            </ImageContainer2>
            <ButtonContainer2 ref={imageRef} inView={imageInView}>
                <p>
                클라우드란 ‘네트워크를 통해 구성 가능한 컴퓨팅 자원(소프트웨어, 스토리지, 서버, 네트워크) 풀에서 편리고 필요할 때 필요한 만큼 빌려서 사용하고, 최소의 관리 노력과 서비스 사업자를 통하여 신속하게 제공되는 모델’이라고 정의됩니다                </p>
            </ButtonContainer2>
        </FlexContainer2>

        <FlexContainer>
            <ButtonContainer ref={imageRef} inView={imageInView}>
                <p>
                이러한 클라우드 컴퓨팅의 정의에서도 알 수 있듯이, 사용자 주문형으로 설계되어 가상의 자산을 활용하는 것이기에 변동성 및 탄력성이라는 특징을 가집니다. 이러한 특징은 능동적 소비자의 역할의 강조 및 다양한 사회현상을 이유로 시시각각으로 변하고 분화되는 현재 시장의 요구사항에 대한 기업의 대응이 가능하게 합니다.
                </p>
            </ButtonContainer>
        
            <ImageContainer ref={imageRef} inView={imageInView} width="40%">
                <img src="assets/introduce_img/market.png" alt="logo" />
            </ImageContainer>
        </FlexContainer>

        <FlexContainer2>
        
            <ImageContainer2 ref={imageRef} inView={imageInView} width="40%">
                <img src="assets/introduce_img/seeso.png" alt="logo" />
            </ImageContainer2>
            <ButtonContainer2 ref={imageRef} inView={imageInView}>
                <p>
                기존의 온프레미스 환경에서 기업이 자체적으로 구매하고 관리하는 인프라 자원에 대한 비용은 골치 아픈 문제였습니다. 하지만 클라우드 도입에 따라 인프라 자원 구매 비용, 업데이트 비용, 지속적인 관리 비용 등이 운영 비용 하나로 축소될 수 있음 또한 기업 입장에서 큰 이익이 되고 있습니다.
                </p>
            </ButtonContainer2>
        </FlexContainer2>

        <CloudContainer>
            <IntroduceContainer ref={imageRef} inView={imageInView}>
                <h2>마이그레이션은 어떻게 진행될까요?</h2>
                <p>
                Cloud Maestro가 존재하지 않던 기존의 마이그레이션 과정은 자산 식별, 대상 선정, 계획 수립, 실행, 평가 및 모니터링으로 구성되어 있었습니다. 기업 내부에서는 클라우드에 대한 전문인력이 부족하여 주로 외부 컨설턴트를 고용하여 마이그레이션을 진행하여, 기업 특성을 외부인에게 전달하고 이해시키며 그에 맞는 클라우드 환경을 구성해야 했기에 많은 시간과 노력, 그리고 그에 따른 비용이 추가적으로 지출될 수 밖에 없었습니다. 클라우드 환경 운영 또한 컨설턴트에게 지속적으로 의존하였기에 비용은 지출되었으며, 자체적인 운영을 실시한 경우 보안 사고에 대한 우려를 안고 있어야 했습니다.

                </p>
                
            </IntroduceContainer>
            <IntroduceImageContainer ref={imageRef} inView={imageInView} width="70%">
                <img src="/assets/introduce_img/migration.png" alt="logo" />
            </IntroduceImageContainer>

        </CloudContainer>
        <CloudContainer>
            <IntroduceContainer ref={imageRef} inView={imageInView}>
                <p>
                Cloud Maestro를 통해 마이그레이션 절차를 획기적으로 줄이고 비용, 보안, 운영 모두에 대한 인사이트를 얻어갈 수 있습니다! {" "}
                기업 내부 담당자가 기업의 정보 자산과 요구사항만 입력한다면 바로 그에 대한 클라우드 아키텍처를 설계해주며 예상 비용을 산정해주기에, 많은 아키텍처를 쉽고 빠르게 만들고 비교하여 기업에게 맞는 최적의 아키텍처를 선택해나갈 수 있습니다.
                아키텍처에 대한 보안 권고 및 가이드를 통하여 보안 상 주안점을 빠르게 정리하고 환경 변화에 따른 혼돈을 방지할 수 있으며, 리소스 가이드를 통해 현재 클라우드 아키텍처 내부에 존재하는 리소스에 대해 확실해 이해함으로써 자생적인 클라우드 운영이 가능해집니다.

                </p>
                
            </IntroduceContainer>
            <IntroduceImageContainer ref={imageRef} inView={imageInView} width="50%">
                <img src="/assets/introduce_img/migration2.png" alt="logo" />
            </IntroduceImageContainer>

        </CloudContainer>


    </div>
  );
}

// CSS animations and styled components remain unchanged


const fadeIn = css`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  animation: fadeIn 1s ease-out forwards;
`;

const CloudContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // Centers children horizontally in the container
    justify-content: center; // Centers children vertically in the container
    margin-top: ${props => props.marginTop};
  // Remove 'item-align' as it's not a valid CSS property

  // Add more styling as needed
`;
const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px; // Adjust as needed
  padding: 20px; // Adjust as needed
  width:60%;
 

  h2 {
    font-size: 2em; // Adjust as needed
    margin-bottom: 10px; // Adjust as needed
  }

  p {
    font-size: 1.2em; // Adjust as needed
    text-align: left;
  }

  div {
    margin-top: 5%; // You already have this inline, but it can be included here for consistency
  }


`;
const IntroduceImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // Adjust as needed

  img {
    max-width: ${props => props.width || '40%'};
    height: auto; // Ensures the image maintains its aspect ratio
    // Add any additional styling for the image
  }

  // Add any additional styling for the container
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  
`;

const ImageContainer = styled.div`
${({ inView }) => inView && fadeIn}
img {
max-width: ${props => props.width || '70%'};
  max-height: 60%; /* Reduced height */
  height: auto;
  margin-top : 5%;
  margin-bottom:5%;
  margin-right:20%;
}
flex: 7;
`;
const ButtonContainer = styled.div`
${({ inView }) => inView && fadeIn}
  text-align: left;
  flex:3;
  font-size: 1.15em; // Adjust as needed
  h2{
    color:(0,0,0,.65);
    font-weight:400;
    white-space:nowrap;
    margin-top: 40%; // Add top margin if needed, adjust as necessary
    margin-bottom: 20px; // Space below the h2, adjust as necessary
  }
  margin-left:20%;
`;

const FlexContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const ImageContainer2 = styled.div`
${({ inView }) => inView && fadeIn}
    img {
        max-width: ${props => props.width || '70%'};
        max-height: 60%; /* Reduced height */
        height: auto;
        margin-top : 5%;
        margin-bottom:5%;
        margin-right:20%;
    }
    flex: 6;
    margin-left:20%;

`;
const ButtonContainer2 = styled.div`
${({ inView }) => inView && fadeIn}
    text-align: left;
    flex:4;
    font-size: 1.15em; // Adjust as needed
    h2{
    color:(0,0,0,.65);
    font-weight:400;
    white-space:nowrap;
    margin-top: 40%; // Add top margin if needed, adjust as necessary
    margin-bottom: 20px; // Space below the h2, adjust as necessary
    }
    margin-right:20%;

`;