import styled from "styled-components";
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

export const NavStyled = styled.nav`
  background: #9ab7c1;
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc(0.125 * ((100vw - 1000px) / 2));
  z-index: 999;
  position: relative;
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

    right: ${({ isOpen }) => (isOpen ? '0' : '-50%')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
        top: 40px;
    background: #9ab7c1;
    z-index: 1;
  }
`;



export const NavMenuRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
  color: #3b6c7d;
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
  color: #3b6c7d;
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

  @media screen and (max-width: 768px) {
    justify-content: center; // 내용 중앙 정렬
    width: 100%; // 가로 길이 설정
    padding: 0 0rem;

    &:hover {
      background: #3b6c7d;
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
  border-radius: 4px;
  background: #fff;
  padding: 5px 12px;
  color: #3b6c7d;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  // margin-left: 5px;
  align-items: center;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #3b6c7d;
    color: #fff;
  }
`;

export const StyledButton = styled.button`
  border-radius: 4px;
  background: #fff;
  padding: 5px 12px;
  color: #3b6c7d;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 5px;
  align-items: center;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #3b6c7d;
    color: #fff;
    
  }
`;

export const UserProfileImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

