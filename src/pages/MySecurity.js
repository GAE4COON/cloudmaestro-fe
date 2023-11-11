import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import styled from 'styled-components';
import MyPageSideBar from '../components/MyPageSideBar';
import ManageHuman from '../components/security/ManageHuman';

// sidebarMenu는 메뉴 항목을 정의한 배열이어야 합니다.
import sidebarMenu from '../components/MyPageSideBar'; // 'menu'를 'sidebarMenu'로 변경
import { PDFViewer } from '@react-pdf/renderer';

function MySecurity(){
    const [isManage, setIsManage] = useState(false);

    let keyword;
    keyword = "Manage";
    useEffect(() => {
        setIsManage(keyword === "Manage");
    })

   

    return (

        <MypageContainer>
            <MyPageSideBar />
            <SecurityContainer>
            <Title> 보안 가이드 라인 </Title>
   
                <ResourceContainer>
            
                    {isManage && <ManageHuman />}
                </ResourceContainer>
  
            </SecurityContainer>
      </MypageContainer>
  
        
       
  
      

    );

}
export default MySecurity;


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
  font-family: "Noto Sans KR", sans-serif !important;

`;


const ResourceContainer = styled.div`

  position: relative;
  width: 80%;
  height: 100%;
  justify-content: center;
  max-height:70vh;

  position: relative;
  padding-left : 40px; 
  padding-right: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border-radius: 8px; /* 모서리 둥글게 처리 */
  background: #FFFFFF; /* 배경색 설정 */
  justify-content: center;
  margin :auto;
  height: auto;

  overflow-x:auto;

  scrollbar-color: darkgrey;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 7px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;

  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);

  }
  

`;


const SecurityContainer = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
  justify-content: center;
  height: auto;

`;


const Title = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  
`;
