import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import useGoJS from "./useGoJS";
import SelectToggle from "../components/SelectToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/Node";
import { useLocation } from "react-router-dom";

// 페이지
import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Palette from "../components/Palette";
import "../styles/Draw.css";
import { useFileUpload } from "../components/useFileInput";

function Draw() {

  const { data } = useFileUpload();
  console.log("draw data ", data);

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop
    ? "palette-component"
    : "palette-component-small";
  const diagramClassName = isDesktopOrLaptop
    ? "diagram-component"
    : "diagram-component-small";

  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.

  const { initDiagram, diagram, showSelectToggle, clickedNodeKey } = useGoJS(setSelectedNodeData);

  console.log("show", showSelectToggle.value)
  // Go to Draw page 완료

  const location = useLocation();
  const file = location.state ? location.state.file : null;
  // console.log(file);

  const handleNodeSelect = useCallback(
    (label) => {
      if (diagram) {
        const selectedNode = diagram.selection.first();
        if (selectedNode instanceof go.Node) {
          console.log("use model");
          diagram.model.commit((model) => {
            model.set(selectedNode.data, "text", label);
          }, "updated text");
        }
      }
      setSelectedNodeData(label);
    },
    [diagram]
  );
  
  useEffect(() => {
    if (file && diagram) {
        diagram.model = go.Model.fromJson(file);
    }
}, [file, diagram]);

  return (
    <div>
      <div className="Draw">
        <div className="container">
          <Button diagram={diagram} />
          <div className="createspace">

            <div className="workspace">

              <div className="palette">

                <Palette
                  nodeDataArray={nodeDataArrayPalette}
                  divClassName={paletteClassName}
                />

              </div>

              <div className="diagram">

                {showSelectToggle.value && (
                  <SelectToggle
                    value={selectedNodeData}
                    uniquekey={showSelectToggle.key}
                    onToggleSelect={handleNodeSelect}
                    readOnly
                  />
                )}
                {clickedNodeKey &&
                  <div className="clicked_key">
                    {clickedNodeKey}
                  </div>
                }
                {file &&
                  <ReactDiagram
                    initDiagram={initDiagram}
                    divClassName={diagramClassName}
                  // nodeDataArray={file?.nodeDataArray}
                  // linkDataArray={file?.linkDataArray}
                  />
                }

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Draw;