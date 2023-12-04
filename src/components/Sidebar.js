import React, { useRef, useEffect, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import "../styles/Sidebar.css";
import { useData } from "./DataContext";
import { nodeDataArrayPalette } from "../db/Node"; // nodeDataArrayPalette 가져오기
import jsonData from '../db/ResourceGuide.json'; // JSON 파일 경로


function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();
  const { data } = useData();
  const [nodeRole, setNodeRole] = useState({});

  useEffect(() => {
    setNodeRole(jsonData); // JSON 파일에서 데이터 가져오기
  }, []);

  useEffect(() => {
    function handleMouseMove(event) {
      if (outside.current && outside.current.contains(event.target)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setIsOpen]);

  return (
    <div
      id="sidebar"
      ref={outside}
      className={`sidebar ${isOpen ? "open" : "closed"}`}
    >
      {isOpen ? (
        <>
          <FiX size={24} onClick={() => setIsOpen(false)} className="icon" />
          <div className="sidebar-content">
            {data && data.length > 0 && (
              <div className="sidebar-title">
                <h3 style={{paddingTop:"10px"}}>서비스</h3>
              </div>
            )}
            {data && data.length > 0 ? (
              data.map((item, index) => {
                const node = nodeDataArrayPalette.find(
                  (node) => node.text === item
                );
                const source = node ? node.source : "";
                // console.log(source);
                return (
                  <div key={index} className="sidebar-item">


                    <div style={{ display: "flex", flexDirection: "column", textAlign: "left", width: "100%" }}>
                      <div className="sidebar-item-title" style={{ fontWeight: "700", borderBottom:"1px solid gray", marginBottom:"5px" }}>{item}</div>

                      <div style={{ display: "flex",  }}>
                        {source && <img src={source} alt={item} style={{ width: "50px", height: "50px", marginRight: "10px" }} />}
                        <div className="sidebar-item-description">{nodeRole[`${item}`] && nodeRole[`${item}`].role ? nodeRole[`${item}`].role : "추후 추가 예정"}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>사용하는 서비스가 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <FiMenu size={24} onClick={() => setIsOpen(true)} className="icon" />
          <div className="sidebar-content">
            {data && data.length > 0 ? (
              data.map((item, index) => {
                const node = nodeDataArrayPalette.find(
                  (node) => node.text === item
                );
                const source = node ? node.source : "";
                // console.log(source);
                return (
                  <div key={index} className="sidebar-item-closed">
                    <h3>
                      <img src={source} />
                    </h3>
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
