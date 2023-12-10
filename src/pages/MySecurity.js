import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/App.css";
import styled from "styled-components";
import Sidebar from "../components/MyPageSideBar";
import { getSecurityList } from "../apis/myPage";
import securityResource from '../db/SecurityResource.json'; // JSON 파일 경로
import securityList from '../db/SecurityList.json'; // JSON 파일 경로
import ResourceItem from "../components/ResourceItem";

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

  const extractedGroup = nodeDataArray
  .filter(node => node.isGroup)
  .map(node => node.key);

  // 중복을 제거하기 위해 Set을 사용
  const resourceList = new Set(extractedTexts);
  const groupList = new Set(extractedGroup);

  const bpArray = [];
  const groupArray = [];

  Array.from(resourceList).forEach((resource) => {
    // let formattedResource = resource.replace(/ /g, "").toLowerCase();
    let formattedResource = resource;
    if(resource&&resource.includes("AWS_")) {
    formattedResource = resource.replace(/AWS_/g, "");
    }
    securityResource[formattedResource]?.forEach((bp) => {
      if (!bpArray.includes(bp)) {
        bpArray.push(bp);
      }
    });
  });

  Array.from(groupList).forEach((group) => {
    let formattedGroup = group;
    if(group) {
      formattedGroup = group.split(' ')[0].toLowerCase();
      formattedGroup = formattedGroup.replace(/\d+$/, '');
    }

    securityResource["Group_"+formattedGroup]?.forEach((bp) => {
      if(!groupArray.includes(group)){
        groupArray.push(group);
      }
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
            <ResourceListContainer>
            {
              bpArray.map((bp) => {
                const resource = securityList[bp];
                return resource ? (
                  <ResourceItem key={bp} bp={bp} resource={resource} groupArray={groupArray} />
                ) : (
                  <p key={bp}>Data not found for {bp}</p>
                );
              })
            }
            <div style={{  borderTop: "1px solid #666", marginBottom:"20px"}}/>
            </ResourceListContainer>

          </div>
        </div>
      </div>
    </div>

  );
}

export default MySecurity;

const ResourceListContainer = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  justify-content: space-between;
  /* background-color: #555; */
`

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
