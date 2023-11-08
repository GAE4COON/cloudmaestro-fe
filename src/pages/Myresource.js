/* global google */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import Resource from "../components/Resource";

function MYResource() {
  const resourceItems = [
    {
      title_img:
        "/img/AWS_icon/Arch_Management-Governance/Arch_AWS-CloudTrail_48.svg",
      title: "CloudTrail",
      tags: ["로그", "보안"],
      guide: [
        "https://docs.aws.amazon.com/athena/latest/ug/what-is.html",
        "https://aws.amazon.com/ko/athena/getting-started/",
        "눈누난나 CloudTrail 아이씨 몰라...1",
        "눈누난나 CloudTrail 아이씨 몰라...2",
        "눈누난나 CloudTrail 아이씨 몰라...3",
        "눈누난나 CloudTrail 아이씨 몰라...4",
        "https://aws.amazon.com/ko/athena/?nc=sn&loc=1",
      ],
    },
    {
      title_img:
        "/img/AWS_icon/Arch_Security-Identity-Compliance/Arch_Amazon-GuardDuty_48.svg",
      title: "GuardDuty",
      tags: ["로그", "보안"], // 'Tag' 대신 'tags'로 이름을 통일해야 합니다.
      guide: [
        "바로가기",
        "눈누난나 GuardDuty 아이씨 몰라...1",
        "눈누난나 GuardDuty 아이씨 몰라...2",
        "눈누난나 GuardDuty 아이씨 몰라...3",
        "눈누난나 GuardDuty 아이씨 몰라...4",
      ],
    },
  ];

  return (
    <MypageContainer>
      <Sidebar />
      <ResourceContainer>
        <Title>나의 리소스</Title>
        {resourceItems.map(
          (
            item,
            index // 수정된 배열 이름을 사용합니다.
          ) => (
            <Resource
              key={index}
              title_img={item.title_img}
              title={item.title}
              tags={item.tags} // 수정된 프로퍼티 이름
              guide={item.guide}
            />
          )
        )}
      </ResourceContainer>
    </MypageContainer>
  );
}

const MypageContainer = styled.div`
  display: flex;
`;

const ResourceContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Title = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  padding-bottom: 20px;
`;

export default MYResource;
