/* global google */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import Resource from "../components/Resource";
import { ResourceGuide } from "../apis/resource";
import "../styles/resource.css";

function MYResource() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resource, setResource] = useState(null);
  const [filteredResource, setFilteredResource] = useState([]);
  const [resourceItems, setResourceItems] = useState([]);

  useEffect(() => {
    if (resource) {
      const filtered = resource.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResource(filtered);
      console.log("필터된 리소스 :", filtered);
    }
  }, [searchTerm, resource]);

  useEffect(() => {
    const handleResource = async () => {
      const ResourceData = {
        title: [
          "Athena",
          "Redshift",
          "VPC",
          "Aurora",
          "Elastic Kubernetes Service",
          "EC2"
        ],
      };

      try {
        const res = await ResourceGuide(ResourceData);
        setResource(res.data.result);
        console.log("응답 성공 :", res.data.result);
      } catch (error) {
        console.error("응답 실패 :", error.res);
      }
    };

    handleResource();
  }, []);

  useEffect(() => {
    if (resource) {
      const filtered = resource.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResource(filtered);
    }
  }, [searchTerm, resource]);

  // 필터링된 리소스를 기반으로 resourceItems 상태 업데이트
  useEffect(() => {
    const newResourceItems = (
      Array.isArray(filteredResource) ? filteredResource : resource
    ).map((item) => ({
      imgPath: item.imgPath || "default-path",
      title: item.title || "Default Title",
      tag: item.tag || [],
      guide1: item.guide1 || "Default Guide1",
      guide2: item.guide2 || "Default Guide2",
      guide3: item.guide3 || "Default Guide3",
      guide4: item.guide4 || "Default Guide4",
    }));
    setResourceItems(newResourceItems);
  }, [filteredResource, resource]);

  return (
    <div className="mypage-container">
      <div className="flex-container">
        <div className="menu-container"></div>
        <Sidebar />
        <div className="main-container">
          <StyledSideMenuTitle>
            <div>나의 리소스</div>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
          </StyledSideMenuTitle>
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
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
  margin-top: 12px;
  justify-content: space-between;
  padding-right: 25px;
  padding-left: 25px;
  margin-left: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  /* box-shadow: 0 2px 8px #f0f1f2; */
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  outline: none;

  border: 1px solid #d9d9d9;
  width: 100%;
  height: 32px;
  radius: 2px;
  border-radius: 2px;
  font-size: 14px;
  transition: all 0.3s;
  &:hover {
    border-color: #40a9ff;
  }
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export default MYResource;
