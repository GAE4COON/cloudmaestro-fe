// SidebarController.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from './Sidebar';
import { DataContext, useData } from './DataContext'; // DataContext의 경로를 수정하세요


function SidebarController() {
  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation();

  const { isSidebarOpen, setIsSidebarOpen } = useData();

  useEffect(() => {
  }, [location]);

  if (location.pathname === "/draw" && isSidebarOpen) {
    return <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return null;
}

export default SidebarController;
