import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import useGoJS from "./useGoJS";
import SelectToggle from "../components/cost/SelectEc2Toggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/Node";
import { useLocation } from "react-router-dom";

// 페이지
import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Palette from "../components/Palette";
import "../styles/Draw.css";
import { useFileUpload } from "../components/useFileInput";

import { Link } from "react-router-dom";

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

  const [finalToggleValue, setFinalToggleValue] = useState({});
  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.

  const { initDiagram, diagram, showSelectToggle, clickedNodeKey } = useGoJS(setSelectedNodeData);

  console.log("show", showSelectToggle.value)



  // Go to Draw page 완료

  const location = useLocation();
  const file = location.state ? location.state.file : null;
  const from = location.from;
  // console.log(file);

  useEffect(() => {
    if (file && diagram) {
      diagram.model = go.Model.fromJson(file);
    }
  }, [file, diagram]);

  return (
    <div>
      <div className="Draw">
        <div className="container">
          <Button diagram={diagram} finalToggleValue={finalToggleValue}setFinalToggleValue={setFinalToggleValue}  />
          <div className="createspace">

            <div className="workspace">

              <div className="palette">

                <Palette
                  nodeDataArray={nodeDataArrayPalette}
                  divClassName={paletteClassName}
                />

              </div>

               <div className="diagram">
                  { showSelectToggle.value && showSelectToggle.key.includes('EC2') &&(
                    <SelectToggle
                    diagram={diagram}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    readOnly
                  />
                )}
                {clickedNodeKey &&
                  <div className="clicked_key">
                    {clickedNodeKey}
                  </div>
                }

                  <ReactDiagram
                    initDiagram={initDiagram}
                    divClassName={diagramClassName}
                  />
              </div>

            </div>

          </div>
        </div>

        {from==="inputNet"&&
        <Link to={'/input/aws'}
          state={{ file: diagram.model.toJson() }}>
          Submit
        </Link>
        }
        {from==="inputAWS"&&
        <Link>
          Submit final
        </Link>
        }
      </div>
    </div>
  );
}

export default Draw;