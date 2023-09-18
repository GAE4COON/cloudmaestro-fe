import React from "react";
//import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.png";
import { useAuth } from "./../utils/auth/authContext";

const Navbar = () => {
  const { user, setUser } = useAuth();

  async function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <>
      <NavStyled>
        <NavMenuLeft>
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">about</NavLink>
          <NavLink to="/learn">learn more</NavLink>
          <NavLink to="/draw">Go to draw!</NavLink>
        </NavMenuLeft>
        <NavMenuRight>
          {user ? (
            <>
              <NavBtn>
                <UserProfileImage src={user.picture} alt={user.name} />
              </NavBtn>
              {/* <span>{user.name}</span> */}
              <NavBtn>
                <StyledButton onClick={(e) => handleSignOut(e)}>
                  Singout
                </StyledButton>
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn>
                <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
              </NavBtn>
              <NavBtn>
                <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
              </NavBtn>
            </>
          )}
        </NavMenuRight>
      </NavStyled>
    </>
  );
};

export default Navbar;

// Styled Components

export const NavStyled = styled.nav`
  background: #9ab7c1;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc(0.125 * ((100vw - 1000px) / 2));
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #3b6c7d;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  & img {
    width: 150px;
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
export const NavMenuLeft = styled.div`
  left: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavMenuRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
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
  padding: 10px 22px;
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

export const StyledButton = styled.button`
  border-radius: 4px;
  background: #fff;
  padding: 10px 22px;
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
