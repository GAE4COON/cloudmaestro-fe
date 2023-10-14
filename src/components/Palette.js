import "../styles/Palette.css";
import React, { memo, useEffect, useRef, useState } from "react";
import * as go from "gojs";

// import { nodeDataArrayPalette } from "../db/NodeAWS";
import { nodeDataArrayPalette } from "../db/Node";

function formatKey(key) {
  key = String(key);

  // _를 공백으로 대체합니다.
  let words = key.replace(/_/g, ' ').split(' ');

  // 각 단어의 첫 글자를 대문자로 바꿉니다.
  let result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return result;
}

const Palette = memo(({ divClassName }) => {
  // const [setNodeDataArray] = useState([]);
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState([]);
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

    myPalette.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Panel, "Vertical",
          $(go.Picture,
            { margin: 5, width: 50, height: 50, background: "white" },
            new go.Binding("source")
          ),

          $(go.TextBlock,
            {
              alignment: go.Spot.BottomCenter,
              font: "bold 10pt sans-serif",
              width: 80,  // 예를 들어, 최대 너비를 100픽셀로 설정
              overflow: go.TextBlock.WrapFit,  // 너비를 초과하는 텍스트를 래핑
              textAlign: "center"
            },
            new go.Binding("text", "key", formatKey))
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
        go.Group, "Auto",
        $(go.Panel, "Vertical",
          $(go.Panel, "Auto",
            $(go.Shape, "Rectangle", 
            {
              width: 47, 
              height: 47,
              fill: "transparent",
              strokeWidth: 3
            },
              new go.Binding("stroke", "", computeStroke)
            ),
            $(go.Picture,
              { margin: 5, width: 50, height: 50},
              new go.Binding("source")
            )
          ),
          $(go.TextBlock,
            {
              alignment: go.Spot.BottomCenter,
              font: "bold 10pt sans-serif",
              width: 80,
              overflow: go.TextBlock.WrapFit,
              textAlign: "center"
            },
            new go.Binding("text", "key", formatKey))
        )
      );
      
    let dataToUse = nodeDataArrayPalette.filter(
      (item) => item.type === selectedTab
    );
    if (paletteDivs.current[selectedTab]) {
      myPalette.div = paletteDivs.current[selectedTab];
    }

    let dataToSearch = nodeDataArrayPalette;
    if (searchTerm) {
      dataToSearch = dataToSearch.filter(item => {
        return formatKey(item.key).toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredNodes(dataToSearch);

      myPalette.model.nodeDataArray = dataToSearch; // 팔레트에 검색된 노드들을 설정
    } else {
      setFilteredNodes([]);
      myPalette.model.nodeDataArray = dataToUse;

    }


    return () => {
      myPalette.div = null;

    };
  }, [nodeDataArray, selectedTab, searchTerm]);

  return (
    <div className={divClassName}>
      <div id="allSampleContent">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredNodes.length > 0 && (
          <div>
            <div className="filtered-nodes-container">
              {filteredNodes.map(node => (
                <div key={node.key}>
                  {node.type}: {formatKey(node.key)}
                </div>
              ))}
            </div>

            <div className="scrollable-tabs-container">
              <div className="tabs">
                <div className="tab">
                  <input type="radio" id="rd99" name="rd" onClick={() => setSelectedTab("Search")} />
                  <label className="tab-label" htmlFor="rd99">Search</label>
                  <div className="tab-content" ref={el => paletteDivs.current['Search'] = el} />
                </div>
              </div>
            </div>
          </div>
        )}


        {filteredNodes.length == 0 &&

          <div className="scrollable-tabs-container">
            <div className="tabs">
              {/* Network node */}
              <div className="tab">
                <input type="radio" id="rd27" name="rd" onClick={() => setSelectedTab("Network_icon")} />

                <label className="tab-label" htmlFor="rd27">Network</label>
                <div className="tab-content" ref={el => paletteDivs.current['Network_icon'] = el} />
              </div>
              <div className="tab">
                <input
                  type="radio"
                  id="rd1"
                  name="rd"
                  onClick={() => setSelectedTab("Analytics")}
                />
                <label className="tab-label" htmlFor="rd1">
                  Analytics
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Analytics"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd2"
                  name="rd"
                  onClick={() => setSelectedTab("App-Integration")}
                />
                <label className="tab-label" htmlFor="rd2">
                  App-Integration
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["App-Integration"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd3"
                  name="rd"
                  onClick={() => setSelectedTab("Blockchain")}
                />
                <label className="tab-label" htmlFor="rd3">
                  Blockchain
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Blockchain"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd4"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Business-Applications")
                  }
                />
                <label className="tab-label" htmlFor="rd4">
                  Business-Applications
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Business-Applications"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd5"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Cloud-Financial-Management")
                  }
                />
                <label className="tab-label" htmlFor="rd5">
                  Cloud-Financial-Management
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                  (paletteDivs.current[
                    "Cloud-Financial-Management"
                  ] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd6"
                  name="rd"
                  onClick={() => setSelectedTab("Compute")}
                />
                <label className="tab-label" htmlFor="rd6">
                  Compute
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Compute"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd7"
                  name="rd"
                  onClick={() => setSelectedTab("Containers")}
                />
                <label className="tab-label" htmlFor="rd7">
                  Containers
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Containers"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd8"
                  name="rd"
                  onClick={() => setSelectedTab("Customer-Enablement")}
                />
                <label className="tab-label" htmlFor="rd8">
                  Customer-Enablement
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Customer-Enablement"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd9"
                  name="rd"
                  onClick={() => setSelectedTab("Database")}
                />
                <label className="tab-label" htmlFor="rd9">
                  Database
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Database"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd10"
                  name="rd"
                  onClick={() => setSelectedTab("Developer-Tools")}
                />
                <label className="tab-label" htmlFor="rd10">
                  Developer-Tools
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Developer-Tools"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd11"
                  name="rd"
                  onClick={() => setSelectedTab("End-User-Computing")}
                />
                <label className="tab-label" htmlFor="rd11">
                  End-User-Computing
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["End-User-Computing"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd12"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Front-End-Web-Mobile")
                  }
                />
                <label className="tab-label" htmlFor="rd12">
                  Front-End-Web-Mobile
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Front-End-Web-Mobile"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd13"
                  name="rd"
                  onClick={() => setSelectedTab("Games")}
                />
                <label className="tab-label" htmlFor="rd13">
                  Games
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Games"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd14"
                  name="rd"
                  onClick={() => setSelectedTab("General-Icons")}
                />
                <label className="tab-label" htmlFor="rd14">
                  General-Icons
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["General-Icons"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd15"
                  name="rd"
                  onClick={() => setSelectedTab("Internet-of-Things")}
                />
                <label className="tab-label" htmlFor="rd15">
                  Internet-of-Things
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Internet-of-Things"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd16"
                  name="rd"
                  onClick={() => setSelectedTab("Machine-Learning")}
                />
                <label className="tab-label" htmlFor="rd16">
                  Machine-Learning
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Machine-Learning"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd17"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Management-Governance")
                  }
                />
                <label className="tab-label" htmlFor="rd17">
                  Management-Governance
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Management-Governance"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd18"
                  name="rd"
                  onClick={() => setSelectedTab("Media-Services")}
                />
                <label className="tab-label" htmlFor="rd18">
                  Media-Services
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Media-Services"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd19"
                  name="rd"
                  onClick={() => setSelectedTab("Migration-Transfer")}
                />
                <label className="tab-label" htmlFor="rd19">
                  Migration-Transfer
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Migration-Transfer"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd20"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Networking-Content-Delivery")
                  }
                />
                <label className="tab-label" htmlFor="rd20">
                  Networking-Content-Delivery
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                  (paletteDivs.current["Networking-Content-Delivery"
                  ] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd21"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Quantum-Technologies")
                  }
                />
                <label className="tab-label" htmlFor="rd21">
                  Quantum-Technologies
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                    (paletteDivs.current["Quantum-Technologies"] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd22"
                  name="rd"
                  onClick={() => setSelectedTab("Robotics")}
                />
                <label className="tab-label" htmlFor="rd22">
                  Robotics
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Robotics"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd23"
                  name="rd"
                  onClick={() => setSelectedTab("Satellite")}
                />
                <label className="tab-label" htmlFor="rd23">
                  Satellite
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Satellite"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd24"
                  name="rd"
                  onClick={() =>
                    setSelectedTab("Security-Identity-Compliance")
                  }
                />
                <label className="tab-label" htmlFor="rd24">
                  Security-Identity-Compliance
                </label>
                <div
                  className="tab-content"
                  ref={(el) =>
                  (paletteDivs.current["Security-Identity-Compliance"
                  ] = el)
                  }
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd25"
                  name="rd"
                  onClick={() => setSelectedTab("Storage")}
                />
                <label className="tab-label" htmlFor="rd25">
                  Storage
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["Storage"] = el)}
                />
              </div>

              <div className="tab">
                <input
                  type="radio"
                  id="rd26"
                  name="rd"
                  onClick={() => setSelectedTab("AWS_Groups")}
                />
                <label className="tab-label" htmlFor="rd26">
                  Group
                </label>
                <div
                  className="tab-content"
                  ref={(el) => (paletteDivs.current["AWS_Groups"] = el)}
                />

              </div>
            </div>
          </div>}
      </div>
    </div>
  );
});

export default Palette;
