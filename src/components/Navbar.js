import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.png";
import { useAuth } from "./../utils/auth/authContext";
import { GiHamburgerMenu } from 'react-icons/gi';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();

  async function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <>
      <NavStyled>
      <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>

        <NavMenuLeft isOpen={isOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/learn">Learn More</NavLink>
          <NavLink to="/draw">Go to Draw!</NavLink>
        </NavMenuLeft>

        <HamburgerContainer>
          <Hamburger onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu size={50} color='#3b6c7d' />
          </Hamburger>
        </HamburgerContainer>

        <NavMenuRight isOpen={isOpen}>
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

// Styled Components

const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Hamburger = styled.div`
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

const NavStyled = styled.nav`
  background: #9ab7c1;
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc(0.125 * ((100vw - 1000px) / 2));
  z-index: 10;
  position: relative;
`;


const NavMenuLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;


  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 50%;
    height: 200px;
    text-align: center;
    position: absolute;
    right:0;
    top: 40px;
    background: #9ab7c1;
    z-index: 1;
  }
`;

const NavMenuRight = styled.div`
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

export default Navbar;
