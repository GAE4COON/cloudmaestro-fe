import "../styles/Palette.css";
import React, { memo, useEffect, useRef, useState } from "react";
import * as go from "gojs";
import { nodeDataArrayPalette } from "../db/Node";
import styled from 'styled-components';


function formatKey(key) {
  return String(key)
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const tabs = [
  "Network_icon",
  "Analytics",
  "App-Integration",
  "Blockchain",
  "Business-Applications",
  "Cloud-Financial-Management",
  "Compute",
  "Containers",
  "Customer-Enablement",
  "Database",
  "Developer-Tools",
  "End-User-Computing",
  "Front-End-Web-Mobile",
  "Games",
  "General-Icons",
  "Internet-of-Things",
  "Machine-Learning",
  "Management-Governance",
  "Media-Services",
  "Migration-Transfer",
  "Networking-Content-Delivery",
  "Quantum-Technologies",
  "Robotics",
  "Satellite",
  "Security-Identity-Compliance",
  "Storage",
  "AWS_Groups"
  // Add more tabs here
];

const Palette = memo(({ divClassName }) => {
  const [nodeDataArray, setNodeDataArray] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Storage");
  const [filteredNodes, setFilteredNodes] = useState([]);
  const paletteDivs = useRef({});


  useEffect(() => {
    const $ = go.GraphObject.make;

    let myPalette = $(go.Palette, {
      // enable Ctrl+Z to undo and Ctrl+Y to redo
      "undoManager.isEnabled": true,
      "animationManager.isEnabled": false,
      model: new go.GraphLinksModel(nodeDataArray),
    });

    myPalette.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Panel,
        "Vertical",
        $(
          go.Picture,
          { margin: 5, width: 50, height: 50, background: "white" },
          new go.Binding("source")
        ),

        $(
          go.TextBlock,
          {
            alignment: go.Spot.BottomCenter,
            font: "bold 10pt Noto Sans KR",
            width: 80, // 예를 들어, 최대 너비를 100픽셀로 설정
            overflow: go.TextBlock.WrapFit, // 너비를 초과하는 텍스트를 래핑
            textAlign: "center",
          },
          new go.Binding("text", "key", formatKey)
        )
      )
    );

    function computeStroke(data) {
      // source가 있으면 테두리를 표시하지 않음
      if (data.source) {
        return "transparent";
      }
      // source가 없으면 노드 데이터의 stroke 값을 사용하거나, 기본값으로 "grey"를 사용함
      return data.stroke || "grey";
    }

    myPalette.groupTemplate = $(
      go.Group,
      "Auto",
      $(
        go.Panel,
        "Vertical",
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            "Rectangle",
            {
              width: 47,
              height: 47,
              fill: "transparent",
              strokeWidth: 3,
            },
            new go.Binding("stroke", "", computeStroke)
          ),
          $(
            go.Picture,
            { margin: 5, width: 50, height: 50 },
            new go.Binding("source")
          )
        ),
        $(
          go.TextBlock,
          {
            alignment: go.Spot.BottomCenter,
            font: "bold 10pt Noto Sans KR",
            width: 80,
            overflow: go.TextBlock.WrapFit,
            textAlign: "center",
          },
          new go.Binding("text", "key", formatKey)
        )
      )
    );

    if (paletteDivs.current[selectedTab]) {
      myPalette.div = paletteDivs.current[selectedTab];
    }

    let dataToUse = nodeDataArrayPalette.filter(
      (item) => item.type === selectedTab
    );

    let dataToSearch = nodeDataArrayPalette;
    if (searchTerm) {
      dataToSearch = dataToSearch.filter((item) => {
        return formatKey(item.key)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredNodes(dataToSearch);
      myPalette.model.nodeDataArray = dataToSearch;
    } else {
      setFilteredNodes([]);
      myPalette.model.nodeDataArray = dataToUse;
    }

    return () => {
      myPalette.div = null;
    };
  }, [selectedTab, searchTerm]);

  return (
    <div className={divClassName}>
      <div id="allSampleContent">
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        {filteredNodes.length > 0 && (
          <div>
            <FilteredNodesContainer>
              {filteredNodes.map((node) => (
                <div key={node.key}>
                  - {node.type}: {formatKey(node.key)}
                </div>
              ))}
            </FilteredNodesContainer>

            <ScrollableTabsContainer>
              <Tabs>
                <Tab>
                  <RadioInput
                    type="radio"
                    id="rd_select"
                    name="rd"
                    onClick={() => setSelectedTab("Search")}
                  />
                  <TabLabel htmlFor="rd_select">
                    Search
                  </TabLabel>
                  <div className="tab-content"
                    ref={(el) => (paletteDivs.current["Search"] = el)}
                  />
                </Tab>
              </Tabs>
            </ScrollableTabsContainer>
          </div>
        )}
        {filteredNodes.length === 0 && (
          <ScrollableTabsContainer>
          {tabs.map((tab) => (
           <Tab key={tab}>
           <RadioInput
             type="radio"
             id={`rd_${tab}`}
             name="rd"
             onClick={() => setSelectedTab(tab)}
           />
           <TabLabel htmlFor={`rd_${tab}`}>
             {formatKey(tab)}
           </TabLabel>
           <div className="tab-content"
             ref={(el) => (paletteDivs.current[tab] = el)}
           />
         </Tab>
          ))}
          </ScrollableTabsContainer>
        )}
      </div>
      
    </div>
    
  );
});

export default Palette;

// Styled component for the tabs container
const Tabs = styled.div`
  width: 100%;
  border-radius: 5px;

  overflow: hidden;
`;

// Styled component for the tab itself
const Tab = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;

  color: rgba(0, 0, 0, 0.65);
  
  &:hover {
    color: #bfd3ff;
  }
`;

// Hidden radio input for accessibility
 const RadioInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  border-radius: 5px;
  z-index: -1;
`;

// Styled component for the tab label
const TabLabel = styled.label`
  border-radius: 5px;
  box-shadow: 0 2px 8px #f0f1f2;
  margin-bottom:5px;

  padding: 12px 16px; 
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif !important;

  color: rgba(0, 0, 0, 0.65);

  background: #fff;
  border: 1px solid #dee8ff;
  cursor: pointer;
  &:hover {
    color: #40a9ff;
    background: #e6f7ff;
  }
  &[aria-selected="true"] {
    color: #1890ff;
    font-weight: 500;
    border-bottom: 2px solid #1890ff;
  }
`;

// Styled component for the scrollable container
const ScrollableTabsContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden; /* Add this line to hide horizontal scrollbar */
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
  }
  &::-webkit-scrollbar-track {
    background-color: #fafafa;
  }
`;


// Styled component for the search container
const SearchContainer = styled.div`
margin-bottom: 10px;
  padding: 10px;
  
  display: flex;
  align-items: center;
  background-color: #fff;
  /* box-shadow: 0 2px 8px #f0f1f2; */
`;


// Styled component for the input
const SearchInput = styled.input.attrs({ type: 'text' })`
  outline: none;
  
  border: 1px solid #d9d9d9;
  padding: 6.5px 11px;
  width: 100%;
  border-radius: 2px;
  font-size: 14px;
  transition: all 0.3s;
  &:hover {
    border-color: #40a9ff;
  }
  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

// Styled component for nodes container with filtered results
const FilteredNodesContainer = styled.div`
  font-size: 12px;
  padding: 8px 16px;
  max-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden; /* Add this line to hide horizontal scrollbar */
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  text-align: left;
`;

