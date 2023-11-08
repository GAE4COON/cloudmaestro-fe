import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  height: 26px;
  justify-content: space-between;
  cursor: pointer;

  & > span {
    height: 4px;
    width: 25px;
    background: #333;
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; // NavLink의 바로 아래에 나타나게 함
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: none; // by default, the menu is not displayed
  animation: ${fadeIn} 0.3s forwards, ${slideDown} 0.3s forwards;
  flex-direction: column;
  width: 200%;
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  // text-align:center;
  // align-items: center;

  &:hover {
    display: flex; // display the dropdown menu when the NavLink is hovered over
  }
`;

export const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; // This ensures that it is always on top
`;

export const NavStyled = styled.nav`
  background: #fff;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc(0.125 * ((100vw - 1000px) / 2));
  z-index: 999;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans KR", sans-serif !important;

`;

export const NavMenuLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  transition: all 0.3s ease-in-out; // Add this line for transition effect

  @media screen and (max-width: 768px) {
    display: flex; // Show the menu all the time but slide it in and out
    flex-direction: column;
    width: 50%;
    height: 200px;
    text-align: center;
    position: fixed;

    right: ${({ $isOpen }) => ($isOpen ? "0" : "-50%")}; // Notice the change here
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")}; // And here
    top: 40px;
    background: #fff;
    z-index: 1;
  }
`;

export const NavMenuRight = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;

  @media screen and (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")}; // Notice the change here
    flex-direction: column;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40px;
    left: 0;
    background: #9ab7c1;
    z-index: 1;
  }
`;


export const NavLinkLogo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 17px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  & img {
    width: 40px;
    height: auto;
  }

  &.active {
    color: #15cdfc;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #fff;
  }
`;

export const NavLink = styled(Link)`
  position: relative;
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 17px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  & img {
    width: 40px;
    height: auto;
  }

  &.active {
    color: #3064d6;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #3064d6;
  }

  &:hover ${DropdownMenu} {
    display: flex;
  }

  @media screen and (max-width: 768px) {
    justify-content: center; // 내용 중앙 정렬
    width: 100%; // 가로 길이 설정
    padding: 0 0rem;

    &:hover {
      background: #dddddd;
    }
  }
`;

export const SpecialNavLink = styled(NavLink)`
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  width: 65px;
  border-radius: 4px;
  background: #fff;
  padding: 5px 12px;
  color: #3064d6;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  // margin-left: 5px;
  align-items: center;
  font-size: 16px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #3064d6;
    font-weight: bold;
  }
`;

export const UserProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;