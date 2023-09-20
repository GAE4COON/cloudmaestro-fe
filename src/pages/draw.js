// draw.js
import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "../styles/App.css"; // contains .diagram-component CSS
import Palette from "../components/Palette";

import useGoJS from "./useGoJS";
import SelectToggle from "../components/SelectToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/data";
import { useLocation } from "react-router-dom";

function Draw() {
  const location = useLocation();
  const file = location.state;
  console.log("file", typeof file);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(file)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  console.log("iamdata", JSON.stringify(data, null, 2));

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop ? "palette-component" : "palette-component-small";
  const diagramClassName = isDesktopOrLaptop ? "diagram-component" : "diagram-component-small";

  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.
  const [savedDiagramJSON, setSavedDiagramJSON] = useState(null);
  const { initDiagram, diagram } = useGoJS(setSelectedNodeData); // <-- setSelectedNodeData를 전달합니다.

  const handleSave = () => {
    if (diagram) {
      const jsonCombinedArray = diagram.model.toJson();
      setSavedDiagramJSON(jsonCombinedArray);
      console.log(jsonCombinedArray);
      localSaveJSON(jsonCombinedArray);
    }
  };

  const localSaveJSON = (target) => {
    const blob = new Blob([target], { type: "text/json" });
    // make download link
    let fileName = prompt("파일명을 입력해주세요:", "diagram.json");
    // 사용자가 프롬프트를 취소하거나 이름을 제공하지 않으면 함수 종료
    if (!fileName) {
      return;
    }
    else if (!fileName.endsWith('.json')) {
      fileName += '.json';
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  };

  const localSaveImage = () => {
    if (diagram) {
      const imgData = diagram.makeImageData({
        scale: 1,
        background: "white"
      });
      let fileName = prompt("파일명을 입력해주세요:", "diagram.png");
      // 사용자가 프롬프트를 취소하거나 이름을 제공하지 않으면 함수 종료
      if (!fileName) {
        return;
      }
      else if (!fileName.endsWith('.png')) {
        fileName += '.png';
      }
      const a = document.createElement("a");
      a.href = imgData;
      a.download = fileName;
      a.click(); // 다운로드 링크 클릭
    }
  }

  const handleLoad = () => {
    if (savedDiagramJSON && diagram) {
      diagram.model = go.Model.fromJson(savedDiagramJSON);
      console.log(JSON.stringify(diagram.model));
    }
  };

  const onFileChange = (e) => {
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

  const handleReset = () => {
    if (diagram) {
      diagram.model.nodeDataArray = [];
      diagram.model.linkDataArray = [];
      diagram.model.commitTransaction('Cleared diagram');
    }
  }

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
        <div className="createspace">

          <div className="workspace">
            <SelectToggle
              value={selectedNodeData}
              onToggleSelect={handleNodeSelect}
              readOnly
            />
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
      <div className="top-right-button">
        <div className="button-container">
          <div className="button-row">
            <input type="file" onChange={onFileChange} />
            <input type="button" value="Clear" onClick={handleReset} />
          </div>
          <div className="button-row">
            <input type="button" value="Save" onClick={handleSave} />
            <input type="button" value="Save as Image" onClick={localSaveImage} />
            <input type="button" value="Load" onClick={handleLoad} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Draw;
