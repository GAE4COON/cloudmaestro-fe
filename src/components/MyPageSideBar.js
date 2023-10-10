import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 250px;
    height: 100vh;
    background-color: #f7f7f7;
    border-right: 1px solid #e6e6e6;
    padding: 20px;
    box-sizing: border-box;
`;

const SidebarItem = styled.div`
    padding: 10px 15px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
    &:hover {
        background-color: #e6e6e6;
    }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <div className='side_title' style={{fontWeight:"bold", borderBottom: "1px solid black", paddingTop: "20px", padding: "10px"}}>
                도식화 히스토리
            </div>

            <SidebarItem>네트워크 도식화</SidebarItem>
            <SidebarItem>클라우드 도식화</SidebarItem>
            <div className='side_title' style={{fontWeight:"bold", borderBottom: "1px solid black", paddingTop: "30px", padding: "10px"}}>
                보안
            </div>

            <SidebarItem>보안 가이드라인</SidebarItem>
            <SidebarItem>ISO 체크리스트</SidebarItem>
            <div className='side_title' style={{fontWeight:"bold", borderBottom: "1px solid black", paddingTop: "20px", padding: "10px"}}>
                회원 정보
            </div>

            <SidebarItem>회원 정보 수정</SidebarItem>
            <SidebarItem>설정</SidebarItem>

        </SidebarContainer>
    );
}

export default Sidebar;