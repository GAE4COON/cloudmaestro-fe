import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Menu } from "antd";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const menu = [
  {
    label: '도식화 히스토리',
    key: '1',
    children: [
      {
        label: (
          <Link to="/mypage/network" >네트워크 도식화</Link>
        ),
        key: '12',
      },
      {
        label: (
          <Link to="/mypage/cloud" >클라우드 도식화</Link>
        ),
        key: '13',
      },
    ]
  },
  {
    label: '회원 정보',
    key: '2',
    children: [
      {
        label: (
          <Link to="/mypage/user" >회원 정보 수정</Link>
        ),
        key: '22',
      },
      {
        label: (
          <Link to="/mypage/setting" >설정</Link>
        ),
        key: '23',
      },
    ]
  }
];

const SidebarItem = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    text-align:left;
    color: #525252;

    &:hover {
        font-weight: 700;
    }
`;

const SidebarTitle = styled.div`
    padding-top:40px;
    color: #525252;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-bottom: 1px solid #B7B7B7;
    text-align:left;
    padding-bottom:10px;
`

const Title = styled.div`
    padding-top:40px;
    color: #525252;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align:center;
    padding-bottom:20px;
`

const Sidebar = () => {
    return (
        <div>
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
        </div>
    );
}

export default Sidebar;