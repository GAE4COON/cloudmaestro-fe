import React, { useCallback, useState, useEffect } from "react";

import * as go from "gojs";
import "../styles/Button.css"; // contains .diagram-component CSS
import SelectToggle from "../../src/components/cost/SelectEc2Toggle";
import InputAWS from "./InputAWS";
import { json, useNavigate } from "react-router-dom";
import { rehostRequest } from "../apis/file";

const Button = ({
  diagram,
  showToggle,
  setShowToggle,
  finalToggleValue,
  setFinalToggleValue,
}) => {
  const hiddenFileInput = React.useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const [savedDiagramJSON, setSavedDiagramJSON] = useState(null);
  const [finalToggleVal, setFinalToggleVal] = useState({});

  useEffect(() => {
    setFinalToggleValue(finalToggleVal);
  }, [finalToggleVal]);

  const handleSave = () => {
    if (diagram) {
      let jsonCombinedArray = diagram.model.toJson();
      jsonCombinedArray = JSON.parse(jsonCombinedArray);
      jsonCombinedArray["cost"] = finalToggleValue; //ec2도 해야할 듯
      jsonCombinedArray = JSON.stringify(jsonCombinedArray);
      setSavedDiagramJSON(jsonCombinedArray);

      //setSavedDiagramJSON(jsonCombinedArray,finalToggleValue);
      console.log("저는 json이에요", jsonCombinedArray, finalToggleValue);
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

  const handleLoad = async () => {
    try {
      //console.log("modelmodel",JSON.stringify(diagram.model));

      const jsonString = diagram.model.toJson();
      console.log("jsonString", jsonString);

      const response = await rehostRequest(jsonString);
      console.log("response", response.data.result);
      const Jdata = response.data.result;

      diagram.model = go.Model.fromJson(Jdata);
    } catch (error) {
      console.error("rehost error: ", error);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].name.includes("json")) {
      let file = e.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        console.log("json", fileReader.result);
        let filejson = JSON.parse(fileReader.result);
        setFinalToggleVal(filejson["cost"]); //여기서 rds뿐이 아닌 ec2도 해줘야 할 듯
        if (fileReader.result && diagram) {
          diagram.model = go.Model.fromJson(fileReader.result);
          console.log(JSON.stringify(diagram.model));
          setShowToggle(true);
        }
      };
    } else if (e.target.files[0] && !e.target.files[0].name.includes("json")) {
      alert("Json형식의 파일을 넣어주세용 ㅜㅜ");
    }
    e.target.value = null;
  };

  const handleReset = () => {
    if (diagram) {
      diagram.startTransaction("Cleared diagram");

      setFinalToggleValue({});
      console.log("final from reset2", finalToggleVal);
      diagram.model.nodeDataArray = [];
      diagram.model.linkDataArray = [];
      diagram.commitTransaction("Cleared diagram");
    }

    setShowToggle(false); // toggle 숨김
  };

  return (
    <div>
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
  );
};

export default Button;
