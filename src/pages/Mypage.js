/* global google */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import "../styles/App.css";

function Mypage() {
  // 필터링된 리소스를 기반으로 resourceItems 상태 업데이트

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <Sidebar />
          </div>
          <div className="main-container">
            <StyledSideMenuTitle>
              <div>나의 리소스</div>
            </StyledSideMenuTitle>
          </div>
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
  margin-top: 25px;
  justify-content: space-between;
  padding-right: 25px;
  padding-left: 25px;
  margin-left: 30px;
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

export default Mypage;
