/* global google */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import Resource from "../components/Resource";
import { ResourceGuide } from "../apis/resource";
import "../styles/MyCloud.css";

function MYResource() {
  const [resource, setResource] = useState(null);
  const handleResource = async () => {
    const ResourceData = { title: ["Athena", "OpenSearch"] };

    try {
      const res = await ResourceGuide(ResourceData);
      setResource(res.data.result);
      console.log("응답 성공 :", res.data.result);
    } catch (error) {
      console.log("응답 실패 :", error.res);
    }
  };

  let resourceItems = [];
  if (Array.isArray(resource)) {
    resourceItems = resource.map((item) => ({
      imgPath: item.imgPath || "default-path", // Provide a default value if undefined
      title: item.title || "Default Title",
      tag: item.tag || [], // Ensure this is always an array
      guide1: item.guide1 || "Default Guide1",
      guide2: item.guide2 || "Default Guide2",
      guide3: item.guide3 || "Default Guide3",
      guide4: item.guide4 || "Default Guide4",
    }));
  } else {
    console.error("Resource is not an array:", resource);
  }

  useEffect(() => {
    handleResource();
  }, []);

  return (
    <div className="mypage-container">
      <div className="flex-container">
        <div className="menu-container"></div>
        <Sidebar />
        <div className="main-container">
          <StyledSideMenuTitle>나의 리소스</StyledSideMenuTitle>
          {resourceItems.map(
            (
              item,
              index // 수정된 배열 이름을 사용합니다.
            ) => (
              <Resource
                key={index}
                title_img={item.imgPath}
                title={item.title}
                tags={item.tag} // 수정된 프로퍼티 이름
                guide1={item.guide1}
                guide2={item.guide2}
                guide3={item.guide3}
                guide4={item.guide4}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

const StyledSideMenuTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
  margin-top: 12px;
`;

export default MYResource;
