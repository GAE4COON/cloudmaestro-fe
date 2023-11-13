import React, { useRef, useEffect } from 'react';
import { FiX, FiMenu } from 'react-icons/fi'; // X 아이콘, 사이드바 닫기 버튼으로 사용
import "../styles/Sidebar.css";
import { useData } from './DataContext';

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();
  const { data } = useData(); // access the data from context

  useEffect(() => {
    function handleMouseMove(event) {
      if (outside.current && outside.current.contains(event.target)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setIsOpen]);

  return (
    <div id="sidebar" ref={outside} className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? (
        <FiX size={24} onClick={() => setIsOpen(false)} className="icon" />
      ) : (
        <FiMenu size={24} onClick={() => setIsOpen(true)} className="icon" />
      )}
       <div className="sidebar-content">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="sidebar-item">
              <h3>{item}</h3>
            </div>
          ))
        ) : (
          <p>사용하는 서비스가 없습니다.</p>
        )}
      </div>
    </div>
  );
  
}

export default Sidebar;
