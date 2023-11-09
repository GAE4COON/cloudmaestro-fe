import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import styled from 'styled-components';
import MyPageSideBar from '../components/MyPageSideBar';
import ManageHuman from '../components/security/ManageHuman';

// sidebarMenu는 메뉴 항목을 정의한 배열이어야 합니다.
import sidebarMenu from '../components/MyPageSideBar'; // 'menu'를 'sidebarMenu'로 변경


function Security(){
    const [isManage, setIsManage] = useState(false);

    let keyword;
    keyword = "Manage";
    useEffect(() => {
        setIsManage(keyword === "Manage");
    })

   

    return (

        <MypageContainer>
            <MyPageSideBar />
            <ResourceContainer>
                <Title> 보안 가이드 라인 </Title>
                {isManage && <ManageHuman />}
            </ResourceContainer>
      </MypageContainer>
  
        
       
  
      

    );

}
export default Security;


const StyledMenu = styled(Menu)`
  text-align: left;
  background: #EDF3FF;
  border-radius: 10px;
  margin-top: 10px;

.ant-menu-submenu-title {
  color: #333; // 글자 색상 변경
  font-weight: bold; // 글자 두께 변경
  font-size: 18px;
  font-family: "Noto Sans KR", sans-serif !important;
}
`

const MypageContainer = styled.div`
  display: flex;
`;

const ResourceContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Title = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  
`;
