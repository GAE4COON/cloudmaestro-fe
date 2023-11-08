import React, { useRef, useEffect } from 'react';
import { FiX, FiMenu } from 'react-icons/fi'; // X 아이콘, 사이드바 닫기 버튼으로 사용
import "../styles/Sidebar.css";

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();

  // Clicking outside of the sidebar closes it
  useEffect(() => {
    function handleClickOutside(event) {
      if (outside.current && !outside.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div id="sidebar" ref={outside} className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <FiX size={24} onClick={() => setIsOpen(false)} className="icon" />
      ) : (
        <FiMenu size={24} onClick={() => setIsOpen(true)} className="icon" />
      )}
      <span className="exit-menu">Resource GuideLine</span>
    </div>
  );
  
}

export default Sidebar;
