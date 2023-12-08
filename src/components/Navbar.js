import React, { useState, useEffect } from "react";
import { useAuth } from "./../utils/auth/authContext";
import { useLocation, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      try {
        const decodedToken = jwtDecode(ACCESS_TOKEN);
        console.log(decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token");
      }
    } else {
      setUser(null);
    }
  }, [ACCESS_TOKEN, setUser]);

  const handleSignOut = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/home";
  };

  const userDropdownMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/mypage/diagram">MyPage</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleSignOut} icon={<LogoutOutlined />}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
  const homeMenu = (
    <Menu>
      <Menu.Item key="home">
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="autodraw">
        <Link to="/home/autodraw">AutoDraw</Link>
      </Menu.Item>
    </Menu>
  );
  

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/">
        <img src="/assets/img/logo.png" alt="logo" style={{ height: '64px' }} />
      </Link>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ flex: 1 }}>
      <Dropdown overlay={homeMenu} trigger={['hover']}>
          <Link to="/home" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Home
          </Link>
        </Dropdown>
        <Menu.Item key="/draw">
          <Link to="/draw">Draw</Link>
        </Menu.Item>
        <Menu.Item key="/about">
          <Link to="/about">Introduce</Link>
        </Menu.Item>
      </Menu>
      {user ? (
        <Dropdown overlay={userDropdownMenu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            {user.name} <DownOutlined />
          </a>
        </Dropdown>
      ) : (
        <Button.Group>
          <Button type="primary">
            <Link to="/sign-in">로그인</Link>
          </Button>
          <Button>
            <Link to="/sign-up">회원가입</Link>
          </Button>
        </Button.Group>
      )}
    </Header>
  );
};

export default Navbar;
