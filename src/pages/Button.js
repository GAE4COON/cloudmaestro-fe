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
import { BsFillImageFill } from "react-icons/bs";
import { useData } from "../components/DataContext";
import "../styles/App.css";
import { summaryFile } from "../apis/fileAPI.js";
import { Modal, Input } from "antd";

const Button = ({
  diagram,
  setShowToggle,
  handleSaveDiagram,
  isSave,
  setIsSave,
  setFileName,
  fileName,
  finalToggleValue,
  setFinalToggleValue,
  onPopupChange,
}) => {
  const navigate = useNavigate();
  const hiddenFileInput = React.useRef(null);
  const handleUpload = () => {
    hiddenFileInput.current.click();
  };

  const [api, contextHolder] = notification.useNotification();

  const [finalToggleVal, setFinalToggleVal] = useState({});
  const [clickedLoaded, setClickedLoaded] = useState(false);
  const { setData } = useData();
  const [isRehost, setIsRehost] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useData();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saveFunction, setSaveFunction] = useState(null);
  const [tmpFileName, setTmpFileName] = useState(fileName);

  const showModal = (saveFunc) => {
    setIsModalVisible(true);
    setSaveFunction(() => saveFunc);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (tmpFileName && saveFunction) {
      saveFunction(tmpFileName);
    }
    setTmpFileName(fileName);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTmpFileName(fileName);
  };

  const onChangeFileName = (e) => {
    setTmpFileName(e.target.value);
  };
  const handleOptimize = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onPopupChange(isSidebarOpen);
  };

  useEffect(
    () => {
      setFinalToggleValue(finalToggleVal);
      setTmpFileName(tmpFileName);
    },
    [finalToggleVal],
    [tmpFileName]
  );

  const handleSaveJSON = () => {
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
    showModal((tmpFileName) => {
      const blob = new Blob([target], { type: "text/json" });
      if (!tmpFileName) {
        return;
      } else if (!tmpFileName.endsWith(".json")) {
        tmpFileName += ".json";
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = tmpFileName;
      a.click();
      message.info("저장되었습니다.");
    });
  };

  const handleSaveImage = () => {
    showModal((tmpFileName) => {
      if (diagram) {
        const imgData = diagram.makeImageData({
          scale: 0.5,
          background: "white",
        });
        if (!tmpFileName) {
          return;
        } else if (!tmpFileName.endsWith(".png")) {
          tmpFileName += ".png";
        }
        const a = document.createElement("a");
        a.href = imgData;
        a.download = tmpFileName;
        a.click();
        message.info("저장되었습니다.");
      }
    });
  };

  const handleLiftNShift = async () => {
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
        message.warning("클라우드 아키텍처가 포함되어있으면 Lift&Shift를 실행할 수 없습니다.");

        return;
      }
      if (clickedLoaded) {
        message.warning("클라우드 아키텍처는 Lift&Shift를 할 수 없습니다.");
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

  const onUploadFileChange = (e) => {
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

  const handleSummary = async () => {
    if (diagram) {
      console.log("handleSummary", finalToggleValue);
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
            <Modal
              title="Enter file name"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                placeholder="File name"
                value={tmpFileName}
                onChange={onChangeFileName}
              />
            </Modal>
            <button onClick={handleUpload}>
              <BsUpload />
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={onUploadFileChange}
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
            <button onClick={handleSaveJSON}>
              <BsDownload />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip
            placement="right"
            title={"download image"}
            arrow={mergedArrow}
          >
            <button onClick={handleSaveImage}>
              <BsFillImageFill />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip
            placement="right"
            title={
              <>
                <div>
                  <strong>Lift & Shift</strong>
                </div>
                <div>
                  on-premise 정보 자산을 cloud 자산으로 1:1 대응해주는
                  기능입니다.
                </div>
              </>
            }
            arrow={mergedArrow}
          >
            <button onClick={handleLiftNShift}>
              <BsCloud />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip
            placement="right"
            title={
              <>
                <div>
                  <strong>Summary</strong>
                </div>
                <div>
                  EC2, RDS, S3 및 기타 서비스의 예상 비용을 한 눈에 확인할 수
                  있습니다.
                </div>
              </>
            }
            arrow={mergedArrow}
          >
            <button onClick={handleSummary}>
              <BsClipboard2Data />
            </button>
          </Tooltip>
        </div>
        <div className="button-row">
          <Tooltip
            placement="right"
            title={
              <>
                <div>
                  <strong>Optimize</strong>
                </div>
                <div>
                  현재 클라우드 아키텍처 기반으로 보안/로깅/고가용성 측면으로
                  추천하는 아키텍처를 볼 수 있습니다.
                </div>
              </>
            }
            arrow={mergedArrow}
          >
            <button onClick={handleOptimize}>
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
