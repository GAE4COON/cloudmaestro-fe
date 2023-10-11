import React, { useCallback, useEffect, useState } from "react";
import * as go from "gojs";
import "../styles/Button.css"; // contains .diagram-component CSS
import SelectToggle from "../../src/components/cost/SelectEc2Toggle";
import InputAWS from "./InputAWS";
import { json, useNavigate } from "react-router-dom";


const  Button = ({ diagram , finalToggleValue, setFinalToggleValue}) => {
  const hiddenFileInput = React.useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  
  const [savedDiagramJSON, setSavedDiagramJSON] = useState(null);
  const [finalToggleVal, setFinalToggleVal] = useState({});

  useEffect(() => {
    console.log("finalToggle 업데이트 후:", finalToggleVal);
    setFinalToggleValue(finalToggleVal);
  }, [finalToggleVal]);
  
  const handleSave = () => {
    if (diagram) {
      let jsonCombinedArray = diagram.model.toJson();
      jsonCombinedArray = JSON.parse(jsonCombinedArray);
      jsonCombinedArray["ec2"] = finalToggleValue;
      jsonCombinedArray = JSON.stringify(jsonCombinedArray);
      setSavedDiagramJSON(jsonCombinedArray);
      
      //setSavedDiagramJSON(jsonCombinedArray,finalToggleValue);
      console.log("저는 json이에요",jsonCombinedArray,finalToggleValue);
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
    
      //console.log("modelmodel",JSON.stringify(diagram.model));
   
      // Make a POST request to the backend
      fetch('http://localhost:8080/api/v1/file-api/network', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(diagram.model)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    
  };

  const onFileChange = (e) => {
    console.log("hello");
    if (e.target.files[0] && e.target.files[0].name.includes("json")) {
      let file = e.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
      console.log("쀼엥",fileReader.result);
      let filejson = JSON.parse(fileReader.result);
      console.log("힘들엉",filejson["ec2"]);
      setFinalToggleVal(filejson["ec2"])
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
        diagram.startTransaction("Cleared diagram");
        diagram.model.nodeDataArray = [];
        diagram.model.linkDataArray = [];
        diagram.commitTransaction("Cleared diagram");

    }
};

  return (
    <div>
     
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
            <button onClick={handleLoad}>Submit</button>
            {/* <button onClick={navigateAws}>Submit</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button;