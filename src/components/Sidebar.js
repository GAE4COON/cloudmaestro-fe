import React, { useRef, useEffect } from 'react';
import { FiX, FiMenu } from 'react-icons/fi'; // X 아이콘, 사이드바 닫기 버튼으로 사용
import "../styles/Sidebar.css";
import { useData } from './DataContext';

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();
  const { data } = useData(); // access the data from context

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
       <div className="sidebar-content">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="sidebar-item">
              {/* 각 아이템 렌더링. 이것은 일반적인 예시입니다; 실제 데이터 구조에 맞게 조정해야 합니다. */}
              <h3>{item}</h3>
            </div>
          ))
        ) : (
          <p>사용 가능한 데이터가 없습니다.</p>
        )}
      </div>
      <span className="exit-menu">Resource GuideLine</span>
    </div>
  );
  
}

export default Sidebar;
