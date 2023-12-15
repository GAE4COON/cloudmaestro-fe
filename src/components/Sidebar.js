import React, { useRef, useEffect, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import "../styles/Sidebar.css";
import { useData } from "./DataContext";
import { nodeDataArrayPalette } from "../db/Node";
import jsonData from '../db/ResourceGuide.json'; // JSON 파일 경로
import styled from "styled-components";


function Sidebar({isOpen, setIsOpen, refSidebar}) {
  const { data } = useData();
  const [nodeRole, setNodeRole] = useState({});
  const [showContent, setShowContent] = useState(false);

  const handleTransitionEnd = () => {
    if (isOpen) {
      setShowContent(true);
    }
  };


  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
    }
    setIsOpen(isOpen)
    console.log("isOpen",isOpen)
  }, [isOpen]);

  useEffect(() => {
    setNodeRole(jsonData); // JSON 파일에서 데이터 가져오기
  }, []);

  var extractedTexts = [];
  if(data!=null){
    extractedTexts = data
    .filter(node => !node.isGroup)
    .filter(node => node.type != "Network_icon")
    .map(node => node.text);
    }

// 중복을 제거하기 위해 Set을 사용
  const resourceList = new Set(extractedTexts);
  const dataArray = Array.from(resourceList);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Event handler for mouse leaving the sidebar
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  return (
    <SidebarMain
    isOpen={isOpen}
      onTransitionEnd={handleTransitionEnd}

      onMouseEnter={handleMouseEnter} // Attach event handler for mouse enter
      onMouseLeave={handleMouseLeave} // Attach event handler for mouse leave
    >
      {isOpen && showContent ? (
        <>

          <FixIcon/>
            {dataArray && dataArray.length > 0 && (
              <SidebarTitle>
                서비스
              </SidebarTitle>
            )}
            {dataArray && dataArray.length > 0 ? (
              dataArray.map((item, index) => {
                const node = nodeDataArrayPalette.find(
                  (node) => node.text === item
                );
                const source = node ? node.source : "";
                return (
                  <SidebarItem key={index}>


                    <div style={{ display: "flex", flexDirection: "column", textAlign: "left", width: "100%" }}>
                      <div className="sidebar-item-title" style={{ fontWeight: "700", borderBottom:"1px solid gray", marginBottom:"5px" }}>{item}</div>

                      <div style={{ display: "flex",  }}>
                        {source && <img src={source} alt={item} style={{ width: "50px", height: "50px", marginRight: "10px" }} />}
                        <div className="sidebar-item-description">{nodeRole[`${item}`] && nodeRole[`${item}`].role ? nodeRole[`${item}`].role : "추후 추가 예정"}</div>
                      </div>
                    </div>
                  </SidebarItem>
                );
              })
            ) : (
              <p>사용하는 서비스가 없습니다.</p>
            )}
        </>
      ) : (
        <>
          <FiMenuIcon size={24} onClick={() => setIsOpen(true)}/>
          <div style={{marginTop: "40px"}}>
            {dataArray && dataArray.length > 0 ? (
              dataArray.map((item, index) => {
                const node = nodeDataArrayPalette.find(
                  (node) => node.text === item
                );
                const source = node ? node.source : "";
                // console.log(source);
                return (
                  <SidebarItemClosed key={index}>
                    {/* <img src={source} alt={item} style={{ width: "50px", height: "50px", marginRight: "10px" }} /> */}
                      <img src={source} />
                  </SidebarItemClosed>
                );
              })
            ) : (
              <p></p>
            )}
            </div>
        </>
      )}
    </SidebarMain>
  );
}

export default Sidebar;


const SidebarMain = styled.div`
  transition: right 0.3s ease-in-out, width 0.3s ease-in-out; /* Smooth transition */
  width: ${props => props.isOpen ? '250px' : '50px'}; /* Dynamic width */

  border-radius: 15px 0 0 15px;
  background-color:#ffffff;
  /* height: 100%; */
  /* width: 100%; */
  
  height: 80vh;
  /* position: fixed; */
  /* transition: width 0.5s ease-in-out;  */
  overflow-y: auto;
  font-family: "Noto Sans KR", sans-serif;
  border: 1px solid #e5e5e5;
  box-shadow: -2px 2px 5px rgba(109, 109, 109, 0.05);

  .open{
    width: 50px;
  
  }

`;

const SidebarItemClosed = styled.div`
  padding: 10px;
  display: flex; /* Flexbox 레이아웃 사용 */
  align-items: left; 
  justify-content: left;
  height: auto; /* 고정된 높이 설정 */
  /* width: 10px; */
  /* height: 10px; */
  img{
    width: 30px;
    height: 30px;
  
  }
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-around; /* 공간을 균등하게 나눔 */
  padding: 10px;
  height: auto; /* 고정된 높이 설정 */
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;

`;

const FixIcon = styled(FiX)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 20px;
  cursor: pointer;
`;

const FiMenuIcon = styled(FiMenu)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 20px;

  cursor: pointer;
`;

const SidebarTitle = styled.p`

margin-top: 0px;
font-size: 18px;
font-weight: 700;
font-family: "Noto Sans KR", sans-serif;


`;