import React , {useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Button } from 'antd';
import { useInView } from 'react-intersection-observer';


export default function IntroduceSecurity() {
    const [imageRef, imageInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
      });
      const handleDownload = (filelink, filename) => {
        const link = document.createElement("a");
        link.href = filelink;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

  return (
    <div className="about-container" >
    <FlexContainer>
      <ButtonContainer ref={imageRef} inView={imageInView}>
        <div class="intro"> Examples of Security Guidelines by industry</div>
        <p>
        The Beginning of Cloud Computing Migration Security GuideLine
        </p>
        <div>
          <Button type="dashed"
                  onClick={() =>
                    handleDownload(
                      "/assets/pdf/ManageHuman2.pdf",
                      "인적 물류 보안 가이드라인.pdf"
                    )
                  }
                  style={{ marginRight: '30px' }}
                >
                human logistics industry</Button>
          <Button type="dashed"
                  onClick={() =>
                    handleDownload(
                      "/assets/pdf/Media.pdf",
                      "미디어 산업군 보안 가이드라인.pdf"
                    )
                  }
                >
                media industry</Button>
        </div>
      </ButtonContainer>
    </FlexContainer>
    </div>
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

const FlexContainer = styled.div`
    display: flex;
    justify-content: center; // 추가된 부분
    align-items: flex-start;
    text-align: center;
    height:50vh;
`;

const ButtonContainer = styled.div`
${({ inView }) => inView && fadeIn}
  text-align: center;
  .intro{
    font-size:32px;
    color:(0,0,0,.65);
    font-weight:400;
    white-space:nowrap;
  }
  p{
    color : #999;
    line-height:28px;
    font-size:16px;
  }
`;