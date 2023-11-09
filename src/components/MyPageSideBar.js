import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Menu } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const menu = [
  {
    label: "도식화 히스토리",
    key: "1",
    children: [
      {
        label: <Link to="/mypage/network">네트워크 도식화</Link>,
        key: "12",
      },
      {
        label: <Link to="/mypage/cloud">클라우드 도식화</Link>,
        key: "13",
      },
    ],
  },
  {
    label: "회원 정보",
    key: "2",
    children: [
      {
        label: <Link to="/mypage/user">회원 정보 수정</Link>,
        key: "22",
      },
      {
        label: <Link to="/mypage/setting">설정</Link>,
        key: "23",
      },
    ],
  },
];

const MyPageSideBar = () => {
  const [current, setCurrent] = useState([]);
  const location = useLocation(); // 현재 경로를 얻기 위해 useLocation 훅 사용

  useEffect(() => {
    // 메뉴 항목과 location.pathname을 비교하여 현재 선택된 키를 설정합니다.
    let currentKey;
    menu.forEach((item) => {
      // 상위 메뉴 항목에 대한 검사
      if (item.children) {
        const match = item.children.find(
          (child) => child.label.props.to === location.pathname
        );
        if (match) {
          currentKey = match.key;
        }
      }
    });
    setCurrent(currentKey);
  }, [location, menu]);
  const onClick = (e) => {
    console.log("click ", e.key);
    setCurrent(e.key);
  };
  return (
    <StyledSideMenu>
      <StyledSideMenuTitle>
        <Link to="/mypage">My Page</Link>
      </StyledSideMenuTitle>
      <StyledMenu
        defaultOpenKeys={["1", "2"]}
        selectedKeys={current ? [current] : []} // 선택된 키를 배열로 설정
        mode={"inline"}
        items={menu}
        onClick={onClick}
      />
    </StyledSideMenu>
  );
};
export default MyPageSideBar;

const StyledSideMenu = styled.div`
  padding-top: 50px;
  width: 256px;
  flex: 1;
`;

const StyledSideMenuTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 20px;
`;

const StyledMenu = styled(Menu)`
  text-align: left;
  background: #edf3ff;
  border-radius: 10px;
  margin-top: 10px;

  .ant-menu-submenu-title {
    color: #333; // 글자 색상 변경
    font-weight: bold; // 글자 두께 변경
    font-size: 18px;
    font-family: "Noto Sans KR", sans-serif !important;
  }
`;
