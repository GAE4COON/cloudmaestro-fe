import React, { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";

export default function Page4() {
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
    <FlexContainer>
      <ButtonContainer ref={imageRef} inView={imageInView}>
        <div class="intro"> Cloud Maestro 제품소개서 다운로드</div>

        <p>Download the Cloud Maestro product introduction</p>
        <div>
          <Button
            type="dashed"
            onClick={() =>
              handleDownload(
                "/assets/pdf/CloudMaestro_Introduce.pdf",
                "CloudMaestro 소개서.pdf"
              )
            }
          >
            <DownloadOutlined />
            Cloud Maestro introduction Download
          </Button>
        </div>
      </ButtonContainer>
    </FlexContainer>
  );
}

// Define the CSS animation
const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 1s ease-out forwards;
`;

const FlexContainer = styled.div`
font-family: "Noto Sans KR", sans-serif;

  display: flex;
  justify-content: center; // 추가된 부분
  align-items: center; // 추가된 부분
  text-align: center;
  height: 100vh;
  width: 100%;
`;

const ButtonContainer = styled.div`
  ${({ inView }) => inView && fadeIn}
  position: relative;
  text-align: center;
  .intro {
    font-size: 32px;
    color: (0, 0, 0, 0.65);
    font-weight: 400;
    white-space: nowrap;
  }
  p {
    color: #999;
    line-height: 28px;
    font-size: 16px;
  }
`;
