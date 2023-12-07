import React, { useCallback, useState, useEffect, useMemo } from "react";
import * as go from "gojs";
import "../styles/Button.css"; // contains .diagram-component CSS
import { json, useNavigate } from "react-router-dom";

import { rehostRequest, requirementRequest } from "../apis/fileAPI";
import {
  BsGear,
  BsClipboard2Data,
  BsCloud,
  BsUpload,
  BsDownload,
  BsEraser,
  BsSave,
} from "react-icons/bs";
import { Tooltip, message, notification, Space } from "antd";
import { BiSave } from "react-icons/bi";
import { useData } from "../components/DataContext";
import "../styles/App.css";
import { summaryFile } from "../apis/fileAPI.js";

const Button = ({
  diagram,
  setShowToggle,
  handleSaveDiagram,
  isSave,
  setIsSave,
  setFileName,
  finalToggleValue,
  setFinalToggleValue,
  onPopupChange,
}) => {
  const navigate = useNavigate();
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const [api, contextHolder] = notification.useNotification();

  const [finalToggleVal, setFinalToggleVal] = useState({});
  const [clickedLoaded, setClickedLoaded] = useState(false);
  const { setData } = useData();
  const [isRehost, setIsRehost] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useData();

  const handlePopup = () => {
    if (!isSave) {
      saveBeforeOptimization();
      return;
    }
    setIsSidebarOpen(!isSidebarOpen);
    onPopupChange(isSidebarOpen);
  };

  useEffect(() => {
    setFinalToggleValue(finalToggleVal);
  }, [finalToggleVal]);

  const saveBeforeOptimization = () => {
    api["info"]({
      message: "최적화를 하기 위해서는 저장이 필요합니다.",
      duration: 2,
      style: {
        top: 100,
        width: 410,
        fontFamily: "Noto Sans KR",
      },
    });
  };

  const handleSave = () => {
    if (diagram) {
      let jsonCombinedArray = diagram.model.toJson();
      jsonCombinedArray = JSON.parse(jsonCombinedArray);
      jsonCombinedArray["cost"] = finalToggleValue; //ec2도 해야할 듯
      jsonCombinedArray = JSON.stringify(jsonCombinedArray);

      // setSavedDiagramJSON(jsonCombinedArray,finalToggleValue);
      console.log("저는 json이에요", jsonCombinedArray, finalToggleValue);
      localSaveJSON(jsonCombinedArray);
    }
  };

  const localSaveJSON = (target) => {
    const blob = new Blob([target], { type: "text/json" });
    let fileName = prompt("명을 입력해주세요:", "diagram.json");
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
        scale: 0.5,
        background: "white",
        type: "image/png",
      });
      let fileName = prompt("파일명을 입력해주세요:", "diagram.png");
      if (!fileName) {
        return;
      } else if (!fileName.endsWith(".png")) {
        fileName += ".png";
      }
      const a = document.createElement("a");
      a.href = imgData;
      a.download = fileName;
      a.click();
    }
  };

  const handleLoad = async () => {
    try {
      const jsonString = diagram.model.toJson();
      console.log("jsonString", jsonString);
      const diagramObject = JSON.parse(jsonString);
      const types = diagramObject.nodeDataArray.map((node) => node.type);
      const otherTypes = types.filter(
        (type) =>
          type !== "Network_icon" && type !== "group" && type !== undefined
      );
      const containsOtherTypes = otherTypes.length > 0;

      if (containsOtherTypes) {
        message.warning(
          "클라우드 아키텍처가 포함되어있으면 Rehost 하지 못합니다."
        );
        return;
      }
      if (clickedLoaded) {
        message.warning("클라우드 아키텍처는 Rehost 하지 못합니다.");
        return;
      }

      const response = await rehostRequest(jsonString);
      const Jdata = response.data.result;
      diagram.model = go.Model.fromJson(Jdata);

      console.log("diagram.model", diagram.model.toJson());

      setData(diagram.model.nodeDataArray);
      setClickedLoaded(true);
      setIsRehost(true);
    } catch (error) {
      console.error("rehost error: ", error);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].name.includes("json")) {
      let file = e.target.files[0];
      let fileName = file.name;
      const lastIndex = fileName.lastIndexOf(".");
      if (lastIndex > 0) {
        fileName = fileName.substring(0, lastIndex);
      }
      setFileName(fileName);

      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = async () => {
        let filejson = JSON.parse(fileReader.result);
        if (filejson.hasOwnProperty("cost")) {
          setFinalToggleVal(filejson["cost"]);
        }
        if (fileReader.result && diagram) {
          diagram.model = go.Model.fromJson(fileReader.result);
          setData(diagram.model.nodeDataArray);
          setShowToggle(true);
          setClickedLoaded(false);
        }
      };
    } else if (e.target.files[0] && !e.target.files[0].name.includes("json")) {
      message.warning("Json형식의 파일을 넣어주세요.");
    }
    e.target.value = null;
  };

  const handleReset = async () => {
    if (diagram) {
      diagram.startTransaction("Cleared diagram");
      setFinalToggleValue({});
      diagram.clear();
      diagram.commitTransaction("Cleared diagram");
    }
    setData(diagram.model.nodeDataArray); // set the data in context
    setClickedLoaded(false);
    setShowToggle(false); // toggle 숨김
    setIsRehost(false);
    setFileName("제목 없는 다이어그램");
    setIsSave(true);
  };

  const summaryRequest = async () => {
    if (diagram) {
      console.log("summaryRequest", finalToggleValue);
      const response = await summaryFile(finalToggleValue);
      console.log(response.data);
      navigate("/summary", {
        state: { costdata: response.data, from: "draw" },
      });
    }
  };
  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <div>
      <div className="button-container">
        <div className="button-row">
          <Tooltip placement="right" title={"upload"} arrow={mergedArrow}>
            <button onClick={handleClick}>
              <BsUpload />
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </Tooltip>
        </div>

        <div className="button-row">
          <Tooltip placement="right" title={"reset"} arrow={mergedArrow}>
            <button onClick={handleReset}>
              <BsEraser />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip placement="right" title={"download"} arrow={mergedArrow}>
            <button onClick={handleSave}>
              <BsDownload />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip
            placement="right"
            title={"download as png"}
            arrow={mergedArrow}
          >
            <button onClick={localSaveImage}>
              <BiSave />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip placement="right" title={"lift & shift"} arrow={mergedArrow}>
            <button onClick={handleLoad}>
              <BsCloud />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip placement="right" title={"summary"} arrow={mergedArrow}>
            <button onClick={summaryRequest}>
              <BsClipboard2Data />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip placement="right" title={"optimize"} arrow={mergedArrow}>
            <button onClick={handlePopup}>
              <BsGear />
            </button>
          </Tooltip>
        </div>
        {contextHolder}
      </div>
    </div>
  );
};

export default Button;
