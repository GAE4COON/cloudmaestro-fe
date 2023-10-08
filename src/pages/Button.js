import React, { useCallback, useState } from "react";
import * as go from "gojs";
import "../styles/Button.css"; // contains .diagram-component CSS

const Button = ({ diagram ,showToggle, setShowToggle}) => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const [savedDiagramJSON, setSavedDiagramJSON] = useState(null);
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
    let fileName = prompt("명을 입력해주세요:", "diagram.json");
    // 사용자가 프롬프트를 취소하거나 이름을 제공하지 않으면 함수 종료
    if (!fileName) {
      return;
    } else if (!fileName.endsWith(".json")) {
      fileName += ".json";
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
        background: "white",
      });
      let fileName = prompt("파일명을 입력해주세요:", "diagram.png");
      // 사용자가 프롬프트를 취소하거나 이름을 제공하지 않으면 함수 종료
      if (!fileName) {
        return;
      } else if (!fileName.endsWith(".png")) {
        fileName += ".png";
      }
      const a = document.createElement("a");
      a.href = imgData;
      a.download = fileName;
      a.click(); // 다운로드 링크 클릭
    }
  };

  const handleLoad = () => {
    if (savedDiagramJSON && diagram) {
      diagram.model = go.Model.fromJson(savedDiagramJSON);
      console.log(JSON.stringify(diagram.model));
    }
  };

  const onFileChange = (e) => {
    console.log("hello");
    if (e.target.files[0] && e.target.files[0].name.includes("json")) {
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
    } else if (e.target.files[0] && !e.target.files[0].name.includes("json")) {
      alert("Json형식의 파일을 넣어주세용 ㅜㅜ");
    }
  };

  const handleReset = () => {
    if (diagram) {
      diagram.model.nodeDataArray = [];
      diagram.model.linkDataArray = [];
      diagram.model.commitTransaction("Cleared diagram");
    }
    setShowToggle(false); // toggle 숨김
  };

  return (
    <div className="top-right-button">
      <div className="button-container">
        <div className="button-row">
          <button onClick={handleClick}>Upload File</button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="button-row">
          <button onClick={handleReset}>clear</button>
        </div>
        <div className="button-row">
          <button onClick={handleSave}>save</button>
        </div>
        <div className="button-row">
          <button onClick={localSaveImage}>Save as Image</button>
        </div>
        <div className="button-row">
          <button onClick={handleLoad}>Load</button>
        </div>
        <div className="button-row">
          <button onClick={handleLoad}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Button;
