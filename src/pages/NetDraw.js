// draw.js
import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "../styles/App.css"; // contains .diagram-component CSS
import Palette from "../components/Palette";
import Button from "../pages/Button"
import useGoJS from "./useGoJS";
import SelectToggle from "../components/SelectToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/data";
import { useLocation } from "react-router-dom";

function Draw() {
  const location = useLocation();
  const file = location.state;
  console.log("file", file);

  const [data, setData] = useState(null);



  const onFileChange = (e) => {
    console.log("hello")
    if (e.target.files[0] && e.target.files[0].name.includes('json')) {
      let file = e.target.files[0];
      console.log(e.target.files[0]);
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        console.log(fileReader.result);
        if (fileReader.result && diagram) {
          diagram.model = go.Model.fromJson(fileReader.result);
          console.log(JSON.stringify(diagram.model));
        }
      };
    }
    else if (e.target.files[0] && !e.target.files[0].name.includes('json')) {
      alert("Json형식의 파일을 넣어주세용 ㅜㅜ");
    }
  };

  useEffect(() => {
    fetch(file)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  // console.log("iamdata", JSON.stringify(data, null, 2));

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop ? "palette-component" : "palette-component-small";
  const diagramClassName = isDesktopOrLaptop ? "diagram-component" : "diagram-component-small";

  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.
  // const [savedDiagramJSON, setSavedDiagramJSON] = useState(null);
  const { initDiagram, diagram, showSelectToggle } = useGoJS(setSelectedNodeData); // <-- setSelectedNodeData를 전달합니다.


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

  return (
    <div className="Draw">
      <div className="container">
        <Button diagram={diagram} />

        <div className="createspace">
          <div className="workspace">
            {showSelectToggle && (
              <SelectToggle
                value={selectedNodeData}
                onToggleSelect={handleNodeSelect}
                readOnly
              />
            )}
            <ReactDiagram
              initDiagram={initDiagram}
              divClassName={diagramClassName}
            />

          </div>
          <Palette
            nodeDataArray={nodeDataArrayPalette}
            divClassName={paletteClassName}
          />

        </div>
      </div>
    </div>
  );
}

export default Draw;
