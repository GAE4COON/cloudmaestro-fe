import "../styles/Palette.css";
import React, { memo, useEffect, useRef, useState } from "react";
import * as go from "gojs";

// import { nodeDataArrayPalette } from "../db/NodeAWS";
import { nodeDataArrayPalette } from "../db/Node";


const Palette = memo(({ divClassName }) => {
  // const [setNodeDataArray] = useState([]);
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [selectedTab, setSelectedTab] = useState([]);

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
      { background: "#A0BCC2" },

      $(
        go.Picture,
        { margin: 10, width: 50, height: 50, background: "white" },
        new go.Binding("source")
      )
    );

    myPalette.groupTemplate = $(
      go.Group,
      "Auto",
      { background: "#A0BCC2" },

      $(
        go.Shape,
        "Rectangle",
        { margin: 10, width: 50, height: 50 },
        { fill: "white", stroke: "grey", strokeWidth: 5 },
        new go.Binding("stroke")
      ),

      $(
        go.TextBlock,
        { font: "bold 10pt sans-serif" },
        new go.Binding("text", "key")
      )
    );
    let dataToUse = nodeDataArrayPalette.filter(
      (item) => item.type === selectedTab
    );

    myPalette.model = new go.GraphLinksModel(dataToUse);

    if (paletteDivs.current[selectedTab]) {
      myPalette.div = paletteDivs.current[selectedTab];
      console.log("current: ", selectedTab);
    }

    return () => {
      myPalette.div = null;
    };
  }, [nodeDataArray, selectedTab]);

  return (
    <div className={divClassName}>
      <div id="allSampleContent" className="p-4 w-full">
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n/* This CSS is used to create the accordion for the Palettes */\ninput {\n  position: absolute;\n  opacity: 0;\n  z-index: -1;\n}\n\n/* Accordion styles */\n.tabs {\n  overflow: hidden;\n}\n\n.tab {\n  width: 100%;\n  color: white;\n  overflow: hidden;\n}\n.tab-label {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.5em;\n  background: #1F4963;\n  border: solid 1px white;\n cursor: pointer;\n}\n.tab-label:hover {\n  background: #627f91;\n}\n.tab-label::after {\n  content: "❯";\n  width: 1em;\n  height: 1em;\n  text-align: center;\n  transition: all 0.35s;\n}\n.tab-content {\n  max-height: 0;\n  color: #2c3e50;\n  background: white;\n}\n.tab-close {\n  display: flex;\n  justify-content: flex-end;\n  padding: 1em;\n  font-size: 0.75em;\n  background: #2c3e50;\n  cursor: pointer;\n}\n.tab-close:hover {\n  background: #1a252f;\n}\n\ninput:checked + .tab-label {\n  background: #1a252f;\n}\ninput:checked + .tab-label::after {\n  transform: rotate(90deg);\n}\ninput:checked ~ .tab-content {\n  max-height: 100vh;\n}\n',
          }}
        />
        <div id="sample">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                // marginRight: 2,
                backgroundColor: "whitesmoke",
                // border: "solid 1px black"
              }}
            >
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
                      onClick={() => setSelectedTab("Arch_Analytics")}
                    />
                    <label className="tab-label" htmlFor="rd1">
                      Analytics
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Analytics"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd2"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_App-Integration")}
                    />
                    <label className="tab-label" htmlFor="rd2">
                      App-Integration
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_App-Integration"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd3"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Blockchain")}
                    />
                    <label className="tab-label" htmlFor="rd3">
                      Blockchain
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Blockchain"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd4"
                      name="rd"
                      onClick={() =>
                        setSelectedTab("Arch_Business-Applications")
                      }
                    />
                    <label className="tab-label" htmlFor="rd4">
                      Business-Applications
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Business-Applications"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd5"
                      name="rd"
                      onClick={() =>
                        setSelectedTab("Arch_Cloud-Financial-Management")
                      }
                    />
                    <label className="tab-label" htmlFor="rd5">
                      Cloud-Financial-Management
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                      (paletteDivs.current[
                        "Arch_Cloud-Financial-Management"
                      ] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd6"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Compute")}
                    />
                    <label className="tab-label" htmlFor="rd6">
                      Compute
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Compute"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd7"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Containers")}
                    />
                    <label className="tab-label" htmlFor="rd7">
                      Containers
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Containers"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd8"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Customer-Enablement")}
                    />
                    <label className="tab-label" htmlFor="rd8">
                      Customer-Enablement
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Customer-Enablement"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd9"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Database")}
                    />
                    <label className="tab-label" htmlFor="rd9">
                      Database
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Database"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd10"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Developer-Tools")}
                    />
                    <label className="tab-label" htmlFor="rd10">
                      Developer-Tools
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Developer-Tools"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd11"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_End-User-Computing")}
                    />
                    <label className="tab-label" htmlFor="rd11">
                      End-User-Computing
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_End-User-Computing"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd12"
                      name="rd"
                      onClick={() =>
                        setSelectedTab("Arch_Front-End-Web-Mobile")
                      }
                    />
                    <label className="tab-label" htmlFor="rd12">
                      Front-End-Web-Mobile
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Front-End-Web-Mobile"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd13"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Games")}
                    />
                    <label className="tab-label" htmlFor="rd13">
                      Games
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Games"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd14"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_General-Icons")}
                    />
                    <label className="tab-label" htmlFor="rd14">
                      General-Icons
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_General-Icons"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd15"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Internet-of-Things")}
                    />
                    <label className="tab-label" htmlFor="rd15">
                      Internet-of-Things
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Internet-of-Things"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd16"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Machine-Learning")}
                    />
                    <label className="tab-label" htmlFor="rd16">
                      Machine-Learning
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Machine-Learning"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd17"
                      name="rd"
                      onClick={() =>
                        setSelectedTab("Arch_Management-Governance")
                      }
                    />
                    <label className="tab-label" htmlFor="rd17">
                      Management-Governance
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Management-Governance"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd18"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Media-Services")}
                    />
                    <label className="tab-label" htmlFor="rd18">
                      Media-Services
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Media-Services"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd19"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Migration-Transfer")}
                    />
                    <label className="tab-label" htmlFor="rd19">
                      Migration-Transfer
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Migration-Transfer"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd20"
                      name="rd"
                      onClick={() =>
                        setSelectedTab("Arch_Networking-Content-Delivery")
                      }
                    />
                    <label className="tab-label" htmlFor="rd20">
                      Networking-Content-Delivery
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                      (paletteDivs.current[
                        "Arch_Networking-Content-Delivery"
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
                        setSelectedTab("Arch_Quantum-Technologies")
                      }
                    />
                    <label className="tab-label" htmlFor="rd21">
                      Quantum-Technologies
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                        (paletteDivs.current["Arch_Quantum-Technologies"] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd22"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Robotics")}
                    />
                    <label className="tab-label" htmlFor="rd22">
                      Robotics
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Robotics"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd23"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Satellite")}
                    />
                    <label className="tab-label" htmlFor="rd23">
                      Satellite
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Satellite"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd24"
                      name="rd"
                      onClick={() =>
                        setSelectedTab("Arch_Security-Identity-Compliance")
                      }
                    />
                    <label className="tab-label" htmlFor="rd24">
                      Security-Identity-Compliance
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) =>
                      (paletteDivs.current[
                        "Arch_Security-Identity-Compliance"
                      ] = el)
                      }
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd25"
                      name="rd"
                      onClick={() => setSelectedTab("Arch_Storage")}
                    />
                    <label className="tab-label" htmlFor="rd25">
                      Storage
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["Arch_Storage"] = el)}
                    />
                  </div>

                  <div className="tab">
                    <input
                      type="radio"
                      id="rd26"
                      name="rd"
                      onClick={() => setSelectedTab("group")}
                    />
                    <label className="tab-label" htmlFor="rd26">
                      Group
                    </label>
                    <div
                      className="tab-content"
                      ref={(el) => (paletteDivs.current["group"] = el)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Palette;
