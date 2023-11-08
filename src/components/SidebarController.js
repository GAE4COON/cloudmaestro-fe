// SidebarController.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from './Sidebar';

function SidebarController() {
  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation();

  useEffect(() => {
  }, [location]);

  if (location.pathname === "/draw") {
    return <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return null;
}

export default SidebarController;
