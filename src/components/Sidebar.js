import React, { useRef, useEffect } from 'react';
import { FiX, FiMenu } from 'react-icons/fi';
import "../styles/Sidebar.css";
import { useData } from './DataContext';
import { nodeDataArrayPalette } from '../db/Node'; // nodeDataArrayPalette 가져오기

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();
  const { data } = useData();

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
        <>
          <FiX size={24} onClick={() => setIsOpen(false)} className="icon" />
          <div className="sidebar-content">
            {data && data.length > 0 && (
              <div className="sidebar-title">
                <h2>서비스</h2>
              </div>
            )}
            {data && data.length > 0 ? (
              data.map((item, index) => {
                const node = nodeDataArrayPalette.find(node => node.text === item);
                const source = node ? node.source : '';
                console.log(source);
                return (
                  <div key={index} className="sidebar-item">
                    {source && <img src={source} alt={item} />}
                    <h3>{item}</h3>
                  </div>
                );
              })
            ) : (
              <p>사용하는 서비스가 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        <FiMenu size={24} onClick={() => setIsOpen(true)} className="icon" />
      )}
    </div>
  );
}

export default Sidebar;
