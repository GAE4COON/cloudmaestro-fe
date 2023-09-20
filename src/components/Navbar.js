import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/img/logo.png";
import { useAuth } from "./../utils/auth/authContext";
import { GiHamburgerMenu } from 'react-icons/gi';

import {
  HamburgerContainer,
  Hamburger,
  NavStyled,
  NavMenuLeft,
  NavMenuRight,
  NavLinkLogo,
  NavLink,
  SpecialNavLink,
  NavBtn,
  NavBtnLink,
  StyledButton,
  UserProfileImage
} from '../styles/NavbarStyle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem('user');
  }

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logoutNclose = (event) => {
    closeMenu();  // 첫 번째 함수 호출
    handleSignOut(event);  // 두 번째 함수 호출
  };


  return (
    <>
      <NavStyled ref={menuRef}>
        <NavLinkLogo to="/">
          <img src={logo} alt="logo" />
        </NavLinkLogo>

        <NavMenuLeft isOpen={isOpen}>
          <NavLink onClick={closeMenu} to="/">Home</NavLink>
          <NavLink onClick={closeMenu} to="/about">About</NavLink>
          <NavLink onClick={closeMenu} to="/learn">Learn More</NavLink>
          <NavLink onClick={closeMenu} to="/draw">Go to Draw!</NavLink>
          {!user && <SpecialNavLink className="special-nav-link" onClick={closeMenu} to="/sign-up">Login Page</SpecialNavLink>}
          {user && <SpecialNavLink className="special-nav-link" onClick={logoutNclose}>Sign Out</SpecialNavLink>}

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
                  Sign out
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