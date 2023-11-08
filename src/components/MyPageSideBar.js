import React from "react";
import styled from "styled-components";

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
`;

const SidebarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #edf3ff;
  border-right: 1px solid #e6e6e6;
  padding: 20px;
  box-sizing: border-box;
`;

const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  text-align: left;
  color: #525252;

  &:hover {
    font-weight: 700;
  }
`;

const SidebarTitle = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-bottom: 1px solid #b7b7b7;
  text-align: left;
  padding-bottom: 10px;
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

const Sidebar = () => {
  return (
    <SideContainer>
      <Title>My Page</Title>
      <SidebarContainer>
        <SidebarTitle>도식화 히스토리</SidebarTitle>
        <SidebarItem>네트워크 도식화</SidebarItem>
        <SidebarItem>클라우드 도식화</SidebarItem>

        <SidebarTitle>보안</SidebarTitle>
        <SidebarItem>보안 가이드라인</SidebarItem>
        <SidebarItem>ISO 체크리스트</SidebarItem>

        <SidebarTitle>회원 정보</SidebarTitle>
        <SidebarItem>회원 정보 수정</SidebarItem>
        <SidebarItem>설정</SidebarItem>
      </SidebarContainer>
    </SideContainer>
  );
};

export default Sidebar;
