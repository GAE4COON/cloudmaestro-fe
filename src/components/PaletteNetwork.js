import "../styles/Palette.css";
import React, { memo, useEffect, useRef, useState } from "react";
import * as go from "gojs";
import { nodeDataArrayPalette } from "../db/NodeNetwork";


const Palette = memo(({ divClassName }) => {
  // const [setNodeDataArray] = useState([]);
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Network_icon");

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

      $(go.Shape,
        "Rectangle",
        { margin: 10, width: 50, height: 50 },
        { fill: "white", stroke: "grey", strokeWidth: 5 },
        new go.Binding("stroke")
      ),

      $(go.TextBlock,
        { font: "bold 10pt sans-serif" },
        new go.Binding("text", "key")),

    );
    let dataToUse = nodeDataArrayPalette.filter(item => item.type === selectedTab);

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
              '\n/* This CSS is used to create the accordion for the Palettes */\ninput {\n  position: absolute;\n  opacity: 0;\n  z-index: -1;\n}\n\n/* Accordion styles */\n.tabs {\n  overflow: hidden;\n}\n\n.tab {\n  width: 100%;\n  color: white;\n  overflow: hidden;\n}\n.tab-label {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.5em;\n  background: #1F4963;\n  border: solid 1px white;\n cursor: pointer;\n}\n.tab-label:hover {\n  background: #627f91;\n}\n.tab-label::after {\n  content: "❯";\n  width: 1em;\n  height: 1em;\n  text-align: center;\n  transition: all 0.35s;\n}\n.tab-content {\n  max-height: 0;\n  color: #2c3e50;\n  background: white;\n}\n.tab-close {\n  display: flex;\n  justify-content: flex-end;\n  padding: 1em;\n  font-size: 0.75em;\n  background: #2c3e50;\n  cursor: pointer;\n}\n.tab-close:hover {\n  background: #1a252f;\n}\n\ninput:checked + .tab-label {\n  background: #1a252f;\n}\ninput:checked + .tab-label::after {\n  transform: rotate(90deg);\n}\ninput:checked ~ .tab-content {\n  max-height: 100vh;\n}\n'
          }}
        />
        <div id="sample">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}>

            <div
              style={{
                width: "100%",
                // marginRight: 2,
                backgroundColor: "whitesmoke",
                // border: "solid 1px black"
              }}>
              <div className="scrollable-tabs-container">
                <div className="tabs">

                  <div className="tab">
                    <input type="radio" id="rd1" name="rd" checked onClick={() => setSelectedTab("Network_icon")}/>

                    <label className="tab-label" htmlFor="rd1">Network</label>
                    <div className="tab-content" ref={el => paletteDivs.current['Network_icon'] = el} />
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
