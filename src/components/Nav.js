import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/introduce">Introduce</NavLink>
      </div>
      <div>
        <NavLink to="/draw">Draw</NavLink>
      </div>
      <div>
        <NavLink to="/learnmore">LearnMore</NavLink>
      </div>
      <div>
        <NavLink to="/mypage">MyPage</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
