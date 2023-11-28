import React , {useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Button } from 'antd';
import { useInView } from 'react-intersection-observer';

export default function Page2() {
    const [imageRef, imageInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
      });
      

    
  

  return (
    <FlexContainer>
      <ButtonContainer ref={imageRef} inView={imageInView}>
        <h2>Rehost</h2>
        <p>
        One-to-one response of network environment to AWS environment
        </p>
        <div style={{ marginTop: '5%'}}>
          <a href="./draw">
          <Button type="primary">See More</Button>
          </a>
        </div>
      </ButtonContainer>
      
      <ImageContainer ref={imageRef} inView={imageInView}>
        <img src="assets/img/Home(AWS)Rehost.png" alt="logo" />
      </ImageContainer>
    </FlexContainer>
  );
}


// Define the CSS animation
const fadeIn = css`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  animation: fadeIn 1s ease-out forwards;
`;

const slideInFromRight = css`
  @keyframes slideInFromRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  animation: fadeIn 1s ease-out forwards;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  
`;

const ImageContainer = styled.div`
${({ inView }) => inView && fadeIn}
img {
  max-width: 70%; /* Reduced width */
  max-height: 60%; /* Reduced height */
  height: auto;
  margin-top : 5%;
  margin-bottom:5%;
}
flex: 7;
`;
const ButtonContainer = styled.div`
${({ inView }) => inView && fadeIn}
  text-align: left;
  flex:3;
  h2{
    font-size:32px;
    color:(0,0,0,.65);
    font-weight:400;
    white-space:nowrap;
    margin-top: 40%; // Add top margin if needed, adjust as necessary
    margin-bottom: 20px; // Space below the h2, adjust as necessary
  }
  margin-left:12%;
`;