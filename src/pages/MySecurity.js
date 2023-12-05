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

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <Sidebar />
          </div>
          <div className="main-container">
            <Title> 보안 권고 list </Title>
            {
              bpArray.map((bp) => (
                <div key={bp}>
                  <h3>{bp}</h3>
                  <p>Checklist:</p>
                  {securityList["backup"][bp]["checklist"].map((check, index) => (
                    <p key={index}>{check}</p>
                  ))}
                  <p>Requirement: {securityList["backup"][bp]["requirement"]}</p>
                </div>
              ))
            }
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
