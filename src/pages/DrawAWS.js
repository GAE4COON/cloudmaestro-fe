import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import useGoJS from "./useGoJS";
import SelectEc2Toggle from "../components/SelectEc2Toggle";
import SelectRdsToggle from "../components/SelectRdsToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/NodeAWS";
import { useLocation } from "react-router-dom";

// 페이지
import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Palette from "../components/PaletteAWS";
import "../styles/Draw.css";

function Draw() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop
    ? "palette-component"
    : "palette-component-small";
  const diagramClassName = isDesktopOrLaptop
    ? "diagram-component"
    : "diagram-component-small";

  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.
  const [showToggle, setShowToggle] = useState(true);
  const { initDiagram, diagram, showSelectToggle } =
    useGoJS(setSelectedNodeData, setShowToggle, showToggle);
  
    console.log("show", showSelectToggle.value)
  // Go to Draw page 완료
  const location = useLocation();
  //console.log("location_path",location.state);
  const file = location?.state;

  const handleNodeSelect = useCallback(
    (label) => {
      if (diagram) {
        const selectedNode = diagram.selection.first();
        if (selectedNode instanceof go.Node) {
          //const updatedData = { ...selectedNode.data, text: label };
          diagram.model.commit((model) => {
            model.set(selectedNode.data, "text", label);
          }, "updated text");
        }
      }
      setSelectedNodeData(label);
    },
    [diagram]
  );
  useReadJSON(file,diagram);

  return (
    <div>
      <div className="Draw">
        <div className="container">
          <Button diagram={diagram} showToggle={showToggle} setShowToggle={setShowToggle} />
          <div className="createspace">
          
            <div className="workspace">
             
              <div className="palette">
                <Palette
                  nodeDataArray={nodeDataArrayPalette}
                  divClassName={paletteClassName}
                />

              </div>
             
               <div className="diagram">
                  { showToggle && showSelectToggle.value && showSelectToggle.key == "Arch_Amazon-EC2_48" && (
                    <SelectEc2Toggle
                    value={selectedNodeData}
                    uniquekey={showSelectToggle.key}
                    onToggleSelect={handleNodeSelect}
                    readOnly
                  />
                  )}
                  { showToggle && showSelectToggle.value && showSelectToggle.key == "Arch_Amazon-RDS_48" && (
                    <SelectRdsToggle
                    value={selectedNodeData}
                    uniquekey={showSelectToggle.key}
                    onToggleSelect={handleNodeSelect}
                    readOnly
                  />
                  )}
                  <ReactDiagram
                  initDiagram={initDiagram}
                  divClassName={diagramClassName}
                />
              </div>
            </div>
           
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draw;