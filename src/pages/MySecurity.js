import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/App.css";
import styled from "styled-components";
import Sidebar from "../components/MyPageSideBar";
import { getSecurityList } from "../apis/myPage";
import securityResource from '../db/SecurityResource.json'; // JSON 파일 경로
import securityList from '../db/SecurityList.json'; // JSON 파일 경로

//import { PDFViewer } from '@react-pdf/renderer';

function MySecurity() {

  const location = useLocation();
  console.log("location", location.state.info);
  const fileName = location.state.info.filename
  const file = location.state.info.file.result;
  const nodeDataArray = file["nodeDataArray"];

  // isGroup이 true인 노드를 제외하고 text 속성만 추출
  const extractedTexts = nodeDataArray
    .filter(node => !node.isGroup)
    .map(node => node.text);

  // 중복을 제거하기 위해 Set을 사용
  const resourceList = new Set(extractedTexts);


  useEffect(() => {
    const handleSecurityList = async () => {
      try {
        const res = await getSecurityList(fileName);
        console.log(res);
      } catch (error) {
        console.error("응답 실패 :", error.res);
      }
    };

    handleSecurityList();
  }, []);

  const bpArray = [];

  Array.from(resourceList).forEach((resource) => {
    securityResource[resource]?.forEach((bp) => {
      if (!bpArray.includes(bp)) {

        bpArray.push(bp);
      }
    });
  });

  bpArray.sort();


  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <Sidebar />
          </div>
          <div className="main-container">
          <StyledSideMenuTitle>
              <div>보안 권고 리스트</div>
              </StyledSideMenuTitle>
              <ResourceContain>
            {
              bpArray.map((bp) => (
                <div key={bp}>
                        <ResourceTitleContainer>

          <ResourceName>{bp}</ResourceName>
          </ResourceTitleContainer>

                  <p>Checklist:</p>
                  {securityList["backup"][bp]["checklist"].map((check, index) => (
                    <p key={index}>{check}</p>
                  ))}
                  <p>Requirement: {securityList["backup"][bp]["requirement"]}</p>
                </div>
              ))
            }
     </ResourceContain>

          </div>
        </div>
      </div>
    </div>

  );
}

export default MySecurity;

const Title = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;

const StyledSideMenuTitle = styled.div`
  position: relative;
  /* display: flex; */
  width: 100%;
  height: 32px;
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
  margin-top: 25px;
  padding-right: 25px;
  padding-left: 25px;
  /* margin-left: 30px; */
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  margin-left: 50px;
`;


const ResourceContain = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-left: 20px;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ResourceTitleContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  
`;

const ResourceName = styled.div`
    font-family: "Noto Sans KR", sans-serif !important;

  font-size: 20px;
  margin-left: 15px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  width: auto;
  height: 20px;
  font-size: 10px;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  color: white;
  font-weight: 500;
`;
