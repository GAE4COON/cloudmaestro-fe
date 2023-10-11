import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import useGoJS from "./useGoJS";
import SelectEc2Toggle from "../components/SelectEc2Toggle";
import SelectRdsToggle from "../components/SelectRdsToggle";
import SelectS3Toggle from "../components/SelectS3Toggle";

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

  const [finalToggleValue, setFinalToggleValue] = useState({}); //selectcost에서 쓰는 usestate
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
          <Button diagram={diagram} showToggle={showToggle} setShowToggle={setShowToggle} finalToggleValue={finalToggleValue} setFinalToggleValue={setFinalToggleValue} />
          <div className="createspace">
          
            <div className="workspace">
             
              <div className="palette">
                <Palette
                  nodeDataArray={nodeDataArrayPalette}
                  divClassName={paletteClassName}
                />

              </div>
             
               <div className="diagram">
                  { showToggle && showSelectToggle.value && showSelectToggle.key.includes("Arch_Amazon-EC2_48") && (
                    <SelectEc2Toggle
                    //여기서 다이어 그램을 넘겨주자
                    //finaltoggle usestate를 넘겨주자
                    //value={selectedNodeData}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    onToggleSelect={handleNodeSelect}
                    readOnly
                  />
                  )}
                  { showToggle && showSelectToggle.value && showSelectToggle.key.includes("Arch_Amazon-RDS_48") && (
                    <SelectRdsToggle
                    diagram={diagram}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    readOnly
                  />
                  )}
                  { showToggle && showSelectToggle.value && showSelectToggle.key.includes("Arch_Amazon-Simple-Storage-Service_48") && (
                    <SelectS3Toggle/>
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