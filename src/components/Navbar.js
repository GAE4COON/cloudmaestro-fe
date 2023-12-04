import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./../utils/auth/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

import {
  NavContainer,
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
  Username,
} from "../styles/NavbarStyle";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const menuRef = useRef(null);
  const location = useLocation();
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

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ACCESS_TOKEN]);

  async function handleSignOut(event) {
    setUser(null);
    localStorage.clear();
    window.location.href = "/home"; //
    // window.location.reload(); // 현재 페이지 새로고침
  }

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logoutNclose = (event) => {
    closeMenu(); // 첫 번째 함수 호출
    handleSignOut(event); // 두 번째 함수 호출
  };

  return (
    <NavContainer>
      <NavStyled ref={menuRef}>
        <NavLinkLogo to="/">
          <img src="/assets/img/logo.png" alt="logo" />
        </NavLinkLogo>

        <NavMenuLeft $isOpen={isOpen} onMouseLeave={closeMenu}>
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className={location.pathname.startsWith("/home") ? "active" : ""}
          >
            <NavLink onClick={closeMenu} to="/home">
              Home
            </NavLink>
            {isDropdownOpen && (
              <DropdownMenu>
                <NavLink onClick={closeMenu} to="/home">
                  Home
                </NavLink>
                <NavLink
                  style={{ paddingTop: "8px" }}
                  onClick={closeMenu}
                  to="/home/autodraw"
                >
                  AutoDraw
                </NavLink>
              </DropdownMenu>
            )}
          </div>

          <NavLink
            onClick={closeMenu}
            to="/draw"
            className={location.pathname === "/draw" ? "active" : ""}
          >
            Draw
          </NavLink>

          <div
            onClick={closeMenu}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className={location.pathname.startsWith("/about") ? "active" : ""}
          >
            <NavLink to="/about">About</NavLink>
            {isDropdownOpen && (
              <DropdownMenu>
                <NavLink onClick={closeMenu} to="/about">
                 Introduce
                </NavLink>
                <NavLink
                  style={{ paddingTop: "8px" }}
                  onClick={closeMenu}
                  to="/about/example"
                >
                  Learn Example
                </NavLink>
              </DropdownMenu>
            )}
          </div>

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
              SignOut
            </SpecialNavLink>
          )}
        </NavMenuLeft>

        <HamburgerContainer>
          <Hamburger onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu size={50} color="#3b6c7d" />
          </Hamburger>
        </HamburgerContainer>

        <NavMenuRight $isOpen={isOpen}>
          {user ? (
            <>
              <NavBtn>
                <Username>{user.name}님</Username>
                <NavBtnLink onClick={closeMenu} to="/mypage/diagram">
                  MyPage
                </NavBtnLink>
                <NavBtnLink onClick={(e) => handleSignOut(e)}>
                  SignOut
                </NavBtnLink>
              </NavBtn>
            </>
          ) : (
            <>
              <NavBtn>
                <NavBtnLink to="/sign-in">로그인</NavBtnLink>
              </NavBtn>
              <NavBtn>
                <NavBtnLink to="/sign-up">회원가입</NavBtnLink>
              </NavBtn>
            </>
          )}
        </NavMenuRight>
      </NavStyled>
    </NavContainer>
  );
};

export default Navbar;
