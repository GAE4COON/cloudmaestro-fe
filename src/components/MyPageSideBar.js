import React, { useState } from "react";

import {  Menu } from "antd";
import "../styles/MyPage.css";
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
              <Link to="/myypage/setting" >설정</Link>
              ),
            key: '23',
        },
        ]
      }
];

const MyPageSideBar = () => {
    const [current, setCurrent] = useState([]);

  const onClick = (e) => {
    console.log('click ', e.key);
    setCurrent(e.key);
  };

    return (
      <div className="container">
        <div className="menu-container">
          <Link to="/mypage">
          My Page
          </Link>
        <StyledMenu
          defaultOpenKeys={['1', '2']}
          mode={"inline"}
          items={menu}
          onClick={onClick}
        >
        </StyledMenu>
        </div>
      </div>
    );
  };
export default MyPageSideBar;



const StyledMenu = styled(Menu)`


text-align: left;
background: #EDF3FF;
border-radius: 10px;
margin-top: 10px;


.ant-menu-submenu-title {
  color: #333; // 글자 색상 변경
  font-weight: bold; // 글자 두께 변경
  font-size: 18px;
  
    font-family: "Noto Sans KR", sans-serif !important;
  



}
`
