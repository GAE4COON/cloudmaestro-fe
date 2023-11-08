import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

function Resource({ title_img, title, tags, guide }) {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "역할",
      children: <p>{guide[2]}</p>,
      style: panelStyle,
    },
    {
      key: "2",
      label: "동작 방식",
      children: <p>{guide[3]}</p>,
      style: panelStyle,
    },
    {
      key: "3",
      label: "온프레미스 매칭",
      children: <p>{guide[4]}</p>,
      style: panelStyle,
    },
    {
      key: "4",
      label: "관리방법(보안 고려사항)",
      children: <p>{guide[5]}</p>,
      style: panelStyle,
    },
  ];

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
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
            <Tag key={index}>#{tag}</Tag> // key를 index로 주고 tag 내용을 표시합니다.
          ))}
        </RightSide>
      </ResourceTitleContainer>
      <hr />
      <div>
        AWS 공식 Doc : <a href={guide[0]}>바로가기 링크</a>
      </div>
      <div>
        시작하기 자습서 : <a href={guide[1]}>바로가기 링크</a>
      </div>
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
      <div>
        더 자세하게 알고싶다면? (기능, 요금, 리소스 등) :
        <a href={guide[6]}>바로가기 링크</a>
      </div>
    </ResourceContain>
  );
}

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
  width: 40px;
  height: 20px;
  font-size: 10px;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #fbb1d5;
  border-radius: 5px;
  margin: 10px;
`;

export default Resource;
