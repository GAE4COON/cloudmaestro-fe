/* global google */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/MyPageSideBar";
import styled from "styled-components";
import "../styles/myresource.css";
import "../styles/App.css";
import { useAuth } from "./../utils/auth/authContext";
import jwtDecode from "jwt-decode";
import "../styles/mypageInfo.css";

function Mypage() {
  const { user, setUser } = useAuth();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken);
        // 주의: 실제 환경에서는 토큰이 만료되었는지 확인하는 로직도 필요합니다.
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token");
      }
    } else {
      setUser(null);
    }
  }, [ACCESS_TOKEN]);
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
              <div>{user.sub}님의 마이페이지</div>
            </StyledSideMenuTitle>
            {/* mypage id, email imformation */}
            <div className="mypage-info-container">
              <div className="input-group">
                <label>아이디</label>
                <input
                  type="text"
                  // value={id}
                  // onChange={handleIdChange}
                />
              </div>
              <div className="input-group">
                <label>비밀번호</label>
                <input
                  type="password"
                  // value={password}
                  // onChange={handlePasswordChange}
                />
              </div>

              <div className="input-group">
                <label>닉네임</label>
                <input
                  type="text"
                  // value={name}
                  // onChange={handleNameChange}
                />
              </div>

              <div className="input-group">
                <label>이메일</label>
                <input
                  type="email"
                  // value={email}
                  // onChange={handleEmailChange}
                />
              </div>
            </div>
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
