import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyDesign.css";
import Sidebar from '../components/MyPageSideBar';


function MyDesign() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        
        
      </div>
    </div>
  );
}

export default MyDesign;
