import React from 'react';
import '../styles/Header.css'; // CSS 파일을 import 합니다.

function Header() {
  return (
    <header className="header">
      <img src="img/logo.png" alt="Logo" className="logo" /> {/* 로고 이미지. 실제 경로로 변경해야 합니다 */}
      <nav>
        <ul className="menu">
          <li><a href="/menu1">Home</a></li>
          <li><a href="/menu2">Introduce</a></li>
          <li><a href="/menu3">Learn More</a></li>
          <li><a href="/menu4">Go to Draw!</a></li>
        </ul>
        <ul className="login">
          <li><a href="/Login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
