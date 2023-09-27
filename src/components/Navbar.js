import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/img/logo.png";
import { useAuth } from "./../utils/auth/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

import {
  DropdownMenu,
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
  UserProfileImage,
} from "../styles/NavbarStyle";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 메뉴 상태
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleSignOut(event) {
    setUser(null);
    localStorage.removeItem("user");
  }

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logoutNclose = (event) => {
    closeMenu(); // 첫 번째 함수 호출
    handleSignOut(event); // 두 번째 함수 호출
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <NavStyled ref={menuRef}>
        <NavLinkLogo to="/">
          <img src={logo} alt="logo" />
        </NavLinkLogo>

        <NavMenuLeft isOpen={isOpen}>
          <NavLink
            onClick={closeMenu}
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </NavLink>
          <NavLink
            onClick={closeMenu}
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </NavLink>
          <NavLink
            onClick={closeMenu}
            to="/learn"
            className={location.pathname === "/learn" ? "active" : ""}
          >
            Learn More
          </NavLink>
          <NavLink
            onClick={toggleDropdown}
            className={location.pathname.startsWith("/draw") ? "active" : ""}
          >
            Draw!
            {isDropdownOpen && (
              <DropdownMenu>
                <NavLink onClick={closeMenu} to="/draw/network">
                  Network
                </NavLink>
                <NavLink onClick={closeMenu} to="/draw/aws">
                  Aws
                </NavLink>
              </DropdownMenu>
            )}
          </NavLink>

          {!user && (
            <SpecialNavLink
              className="special-nav-link"
              onClick={closeMenu}
              to="/sign-up"
            >
              Login Page
            </SpecialNavLink>
          )}
          {user && (
            <SpecialNavLink className="special-nav-link" onClick={logoutNclose}>
              Sign Out
            </SpecialNavLink>
          )}
        </NavMenuLeft>

        <HamburgerContainer>
          <Hamburger onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu size={50} color="#3b6c7d" />
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
                <NavBtnLink onClick={(e) => handleSignOut(e)}>
                  Sign out
                </NavBtnLink>
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
