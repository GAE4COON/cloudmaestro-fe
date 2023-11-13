import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const tagColors = {
  DB: "#809CDA",
  분석: "#11DD32",
  컴퓨팅: "#F9A825",
  컨테이너: "#6666FF",
  스토리지: "#6666FF",
  "네트워킹 및 콘텐츠전송": "#ED7100",
  "Management Governance": "#D32F2F",
  "App Integration": "#F89D76",
  "데이터 보호": "#6666FF",
  "탐지 및 대응": "#3A3838",
  "애플리케이션 보호": "#2DF2FF",
  "네트워크 보호": "#FF2DDD",
};

function Resource({ title_img, title, tags, guide1, guide2, guide3, guide4 }) {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "역할",
      children: <p>{guide1}</p>,
      style: panelStyle,
    },
    {
      key: "2",
      label: "동작 방식",
      children: <p>{guide2}</p>,
      style: panelStyle,
    },
    {
      key: "3",
      label: "온프레미스 매칭",
      children: <p>{guide3}</p>,
      style: panelStyle,
    },
    {
      key: "4",
      label: "관리방법(보안 고려사항)",
      children: <p>{guide4}</p>,
      style: panelStyle,
    },
  ];

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: "#fff",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <ResourceContain>
      <ResourceTitleContainer>
        <LeftSide>
          <img src={title_img} />
          <ResourceName>{title}</ResourceName>
        </LeftSide>
        <RightSide>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              style={{ backgroundColor: tagColors[tag] || "#fbb1d5" }}
            >
              #{tag}
            </Tag> // key를 index로 주고 tag 내용을 표시합니다.
          ))}
        </RightSide>
      </ResourceTitleContainer>
      <hr />
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
    </ResourceContain>
  );
}

const ResourceContain = styled.div`
  position: relative;
  width: 100%;
  height: auto%;
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
  pont-size: 20px;
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

export default Resource;
