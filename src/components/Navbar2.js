import React, { useState } from 'react';
// import './index.css';
import styled from 'styled-components';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';



import {
  NavContainer,

  NavStyled,
  NavMenuLeft,
  NavMenuRight,
  NavLinkLogo,
  NavLink,
  NavBtn,
  NavBtnLink,
  UserProfileImage,
} from "../styles/NavbarStyle";

const { Header } = Layout;

const logo = [
    {
        label: (
            <Link to='/'>
                <img src="/assets/img/logo.png" alt="logo" style={{ height: '40px' }} />
            </Link>
        ),
        key: 'logo',
    }
];
const menu = [
    {
        label: (
            <Link to='/'>
                Home
            </Link>
        ),
        key: 'home',
        children: [
            
            {
                label: (
                    <Link to='/draw/auto'>
                        Auto Draw
                    </Link>
                ),
                key: 'auto'

            },
        ],
    },
    {
        label: (
            <Link to='/draw'>
                Draw
            </Link>
        ),
        key: 'draw',
    },
    {
        label: (
            <Link to='/about'>
                About
            </Link>
        ),
        key: 'about',
        children: [
            {
                label: (
                    <Link to='/about/example'>
                        Example
                    </Link>
                ),
                key: 'example'

            },
        ],
    },
];

const sign = [
    {
        label: (
            <Link to='/sign-in'>
                로그인
            </Link>
        ),
        key: 'sign-in',
    },
    {
        label: (
            <Link to='/sign-up'>
                회원가입
            </Link>
        ),
        key: 'sign-up',
    },
]

const App = () => {
    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
        console.log('click ', e);
    
        // 선택된 메뉴 아이템이 최상위 항목의 하위 항목인 경우
        // 부모 항목의 키를 current로 설정
        let parentKey;
        menu.some(mainItem => {
            if (mainItem.key === e.key || (mainItem.children && mainItem.children.find(child => child.key === e.key))) {
                parentKey = mainItem.key;
                return true;
            }
            return false;
        });
    
        setCurrent(parentKey || e.key);
    };

    const renderMenuItems = (itemsArray) => {
        return itemsArray.map(item => {
            if (item.children) {
                return (
                    <Menu.SubMenu key={item.key} title={item.label}>
                        {renderMenuItems(item.children)}
                    </Menu.SubMenu>
                );
            }
            return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
        });
    };

    return (
        <NavContainer>

                <NavStyled onClick={onClick} selectedKeys={[current]} mode="horizontal" items={logo}></NavStyled>
                <NavStyled onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menu}></NavStyled>
                <NavStyled onClick={onClick} selectedKeys={[current]} mode="horizontal" items={sign}></NavStyled>
        
        </NavContainer>
    );
}


export default App;