import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <header className="header">
      <nav>
        <div>
          <NavLink to="/">
            <img src="img/logo.png" alt="Logo" className="logo" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/introduce">Introduce</NavLink>
        </div>
        <div>
          <NavLink to="/learn">Learn more</NavLink>
        </div>
        <div>
          <NavLink to="/draw">Go to draw!</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
