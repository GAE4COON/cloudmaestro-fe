import React, { useState, useCallback, useEffect, useRef } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styled from "styled-components";
import useGoJS from "../hooks/useGoJS.js";

import TourDraw from "../components/TourDraw.js";

import { BellOutlined } from "@ant-design/icons";

import { useLocation } from "react-router-dom";
import { message, Button, notification, Space, Modal, Input, Badge, Avatar, Dropdown, Menu  } from "antd";

import { saveDiagram, updateDiagram } from "../apis/fileAPI";
import "../styles/App.css";

// 페이지
// import useReadJSON from "./useReadJSON";
import ModalButton from "../components/Button.js";
import Palette from "../components/Palette";
import "../styles/Draw.css";
import { useFileUpload } from "../components/useFileInput";
import RequirementPopup from "../components/RequirementPopup";
import { useData } from "../components/DataContext.js"; // DataContext의 경로를 수정하세요
import CostToggle from "../components/CostToggle.js";

import {
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Sidebar from "../components/Sidebar.js";

const close = () => {
  console.log("Notification was closed.");
};

message.config({
  top: 50,
  duration: 1,
});



function Draw() {
  const { data } = useFileUpload();
  //console.log("draw data ", data);
  const diagramClassName = "diagram-component";

  const [finalToggleValue, setFinalToggleValue] = useState({});
  const [selectedNodeData, setSelectedNodeData] = useState(null); // <- 상태 변수를 추가합니다.
  const [showToggle, setShowToggle] = useState(true);
  const { setData } = useData();
  const [mydiagram, setmyDiagram] = useState(null);
  const [NodeGuide, setNodeGuide] = useState(null);
  const [isSave, setIsSave] = useState(false); // 저장 여부 판단
  const [alertMessage, setAlertMessage] = useState({
    key: null,
    message: null,
    tag: null,
  });
  const [tourDraw, setTourDraw] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [handleMessageQueue, setHandleMessageQueue] = useState([]);

  const [fileName, setFileName] = useState("제목 없는 다이어그램");

  const [diagramVersion, setDiagramVersion] = useState(0);
  const [isPopup, setIsPopup] = useState(false);
  const [countAlert, setCountAlert] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [palette, setPalette] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [tempFileName, setTempFileName] = useState("");

  useEffect(() => {
    if (!palette) {
      setIsExiting(true);
      setTimeout(() => setIsExiting(false), 500); // 애니메이션 지속 시간과 동일하게 설정
    }
  }, [palette]);

  const { isSidebarOpen, setIsSidebarOpen } = useData();

  const location = useLocation();
  const info = location.state ? location.state.info : null;
  const save = location.state ? location.state.save : false;
  const onpremise = location.state ? location.state.file : null;
  useEffect(() => {}, [diagramVersion]); 

  const handleDiagramChange = useCallback((changedDiagram) => {
    setmyDiagram(changedDiagram);
    setDiagramVersion((prevVersion) => prevVersion + 1);
  });

  const {
    initDiagram,
    diagram,
    showSelectToggle,
    setShowSelectToggle,
    clickedNodeKey,
  } = useGoJS(
    setShowToggle,
    handleDiagramChange,
    // handleguide,
    setAlertMessage
  );

  useEffect(() => {
    setIsSave(save);
    if (info && diagram) {
      setFileName(info.filename);
      if (info.file.result.hasOwnProperty("cost")) {
        setFinalToggleValue(info.file.result["cost"]);
      }
      const diagramModel = go.Model.fromJson(info.file.result);
      diagram.model = diagramModel;
    }

    if (onpremise && diagram) {
      const diagramModel = go.Model.fromJson(onpremise);
      diagram.model = diagramModel;
    }
  }, [info, diagram]);

  useEffect(() => {
    if (diagram) {
      diagram.clear(); //다른 로케이션으로 가면 다이어그램을 없앤다
    }
    setData(null);
  }, [location]);

  const handleNodeSelect = useCallback(
    (label) => {
      if (diagram) {
        const selectedNode = diagram.selection.first();
        if (selectedNode instanceof go.Node) {
          //const updsPopupatedData = { ...selectedNode.data, text: label };
          diagram.model.commit((model) => {
            model.set(selectedNode.data, "text", label);
          }, "updated text");
        }
      }
      setSelectedNodeData(label);
    },
    [diagram]
  );
  // useReadJSON(file,diagram);

  //popup
  const handlePopup = () => {
    setIsSidebarOpen(!isSidebarOpen);
    return setIsPopup(!isPopup);
  };

  const handlePopupChange = (newPopupState) => {
    setIsPopup(newPopupState);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (isModalVisible) {
      setTempFileName(fileName);
    }
  }, [isModalVisible, fileName]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setFileName(tempFileName);
    setIsModalVisible(false);
    const hideLoading = message.loading("저장 중...", 0);

    try {
      let diagramData = diagram.model.toJson();
      diagramData = JSON.parse(diagramData);
      diagramData["cost"] = finalToggleValue;
      diagramData = JSON.stringify(diagramData);

      // 이미지 데이터 생성
      const img = diagram.makeImageData({
        scale: 0.6,
        background: "white",
        type: "image/png",
      });

      const base64ImageContent = img.split(",")[1];

      var response;
      if (!isSave) {
        console.log("save");
        response = await saveDiagram(diagramData, tempFileName, base64ImageContent);
      } else {
        console.log("update");
        console.log("diagramData", diagramData);
        console.log("fileName", fileName);
        console.log("base64ImageContent", base64ImageContent);
        response = await updateDiagram(
          diagramData,
          fileName,
          base64ImageContent
        );
      }

      hideLoading();

      console.log(response.data);
      if (response.data === true) {
        setFileName(tempFileName);
        message.success("저장되었습니다.");
        if (!isSave) {
          setIsSave(true);
        }
      } else {
        message.warning("중복된 이름이 존재합니다. 다시 시도해주세요.");
      }
    } catch (error) {
      hideLoading();
      message.error("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    message.info("파일 저장이 취소되었습니다.");
  };

  const handleChange = (e) => {
    setTempFileName(e.target.value);
  };

  const handleSaveDiagram = () => {
    if (!isSave) {
      //save
      showModal();
    } else {
      // update
      handleOk();
    }
  };

  const handleSaveDifDiagram = () => {
    setIsSave(false);
    showModal();
  }

  const [messageQueue, setMessageQueue] = useState([]);

  useEffect(() => {
    console.log("Updated messageQueue: ", messageQueue);
  }, [messageQueue]);

  useEffect(() => {
    if (alertMessage.message !== null) {
      const isMessageInQueue = messageQueue.some(
        (queueMessage) => queueMessage.message === alertMessage.message
      );
      if (!isMessageInQueue) {
        queueMessage(alertMessage);
      }
    }
  }, [alertMessage, setMessageQueue]);

  const resetAlertMessage = () => {
    api.destroy();
    removeMessageFromQueue(-1);
  };

  const saveDropdown = [
    {
      key: '저장',
      label: (
        <div
        onClick={() =>
          handleSaveDiagram()}
        >
          저장
        </div>
      ),
    },
    {
      key: '다른이름으로 저장',
      label: (
        <div
        onClick={() =>
          handleSaveDifDiagram()}
        >
          다른 이름으로 저장
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (isReset) {
      api.destroy();
      removeMessageFromQueue(-1);
    }
    setIsReset(false);
  });

  const removeMessageFromQueue = (keyToRemove) => {
    console.log(keyToRemove);
    if (keyToRemove === -1) {
      setMessageQueue([]);
    } else {
      setMessageQueue((currentQueue) =>
        currentQueue.filter((message) => message.key !== keyToRemove)
      );
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const [areNotificationsShown, setAreNotificationsShown] = useState(false);

  const queueMessage = (message) => {
    setMessageQueue((prevQueue) => [...prevQueue, message]);
  };

  const showAlertMessages = () => {
    console.log("refAlert");
    if (areNotificationsShown) {
      // Hide notifications
      api.destroy();
      setAreNotificationsShown(false);
    } else {
      messageQueue.forEach((alertMessage, index) => {
        setTimeout(() => {
          const key = `open${Date.now()}`;

          const btn = (
            <Space>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  api.destroy();
                  removeMessageFromQueue(-1);
                }}
              >
                모두 지우기
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  api.destroy();
                  setAreNotificationsShown(false);
                }}
              >
                모두 숨기기
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  api.destroy(key);
                  removeMessageFromQueue(alertMessage.key);
                }}
              >
                지우기
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  api.destroy(key);
                }}
              >
                숨기기
              </Button>
            </Space>
          );

          let backgroundColor;
          switch (alertMessage.tag) {
            case "Error":
              backgroundColor = "#FFF0F0"; // 에러 배경색
              break;
            case "Warn":
              backgroundColor = "#FFF8E0"; // 경고 배경색
              break;
            case "Info":
              backgroundColor = "#DFE8FF"; // 정보 배경색
              break;
            default:
              backgroundColor = "#FFFFFF"; // 기본 배경색
              break;
          }

          let backgroundTitle;
          switch (alertMessage.tag) {
            case "Error":
              backgroundTitle = (
                <>
                  <CloseCircleOutlined style={{ color: "red" }} /> Error!
                </>
              ); // 에러 배경색
              break;
            case "Warn":
              backgroundTitle = (
                <>
                  <WarningOutlined style={{ color: "orange" }} /> Warning
                </>
              ); // 경고 배경색
              break;
            case "Info":
              backgroundTitle = (
                <>
                  <InfoCircleOutlined style={{ color: "blue" }} /> Info
                </>
              ); // 정보 배경색
              break;
            default:
              backgroundTitle = "Nothing"; // 기본 배경색
              break;
          }

          api.open({
            message: backgroundTitle,
            description: alertMessage.message,
            btn,
            key,
            onClose: close,
            style: {
              backgroundColor,
              borderRadius: "8px",
              fontFamily: "Noto Sans KR",
            },
            duration: 0,
          });
        }, index * 200); // Delay each message to stagger their appearance
      });
      setAreNotificationsShown(true);
    }
    // setMessageQueue([]);
  };

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/json/network.json");
        const filejson = await response.json();
        console.log("filejson", filejson);
        setJsonData(filejson); // Store the JSON data in state
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchData();
  }, []);

  const setDiagram = async (type) => {
    diagram.clear();
    console.log(type);

    try {
      const response = await fetch(type);
      const filejson = await response.json();
      console.log("filejson", filejson);
      diagram.model = go.Model.fromJson(filejson);
      if (filejson.hasOwnProperty("cost")) {
        console.log("filejson cost", filejson["cost"]);
        setFinalToggleValue(filejson["cost"]);
      }

      
        setData(diagram.model.nodeDataArray);
      

    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const [clickedTab, setClickedTab] = useState([]);

  const refPalette = useRef(null);
  const refDiagram = useRef(null);
  const refButton = useRef(null);
  const refAlert = useRef(null);
  const refLS = useRef(null);
  const refSummary = useRef(null);
  const refOptimize = useRef(null);
  const refNetworkPalette = useRef(null);
  const refCloudPalette = useRef(null);
  const refPopup = useRef(null);
  const refCost = useRef(null);
  const refSidebar = useRef(null);
  const refSaveButton = useRef(null);
  const refDownloadBtn = useRef(null);

  const stateProps = {alertMessage, diagram, clickedTab, isOpen };
  const funcProps = {setClickedTab, showAlertMessages, setAlertMessage, resetAlertMessage, setDiagram, setIsPopup, setShowSelectToggle, setShowToggle, setIsOpen};
  const refProps = {refPalette, refDiagram, refButton, refAlert, refLS, refSummary, refOptimize, refNetworkPalette, refCloudPalette, refPopup, refCost, refSaveButton, refSidebar, refDownloadBtn};

  useEffect(() => {}, [clickedTab, diagram, isOpen]);

  const handleTourDraw = () => {
    setTourDraw(!tourDraw);
  }

  return (
    <DrawWorkSpace>
      <TourDraw
        open={tourDraw}
        setOpen={setTourDraw}
        {...stateProps}
        {...funcProps}
        {...refProps}
      />
      <div className="ant-notification">{contextHolder}</div>
      {/* </div> */}

      {/* <div className="ant-notification"></div> */}
      {palette && !isExiting && (
        <PaletteContainer ref={refPalette}>
          <Palette
            clickedTab={clickedTab}
            setClickedTab={setClickedTab}
            diagram={mydiagram}
            diagramVersion={diagramVersion}
            refNetworkPalette={refNetworkPalette}
            refCloudPalette={refCloudPalette}
          />
        </PaletteContainer>
      )}

      <DiagramContainer palette={palette}>
        <ButtonContainer palette={palette} ref={refButton}>
          <ModalButton
            refLS={refLS}
            refSummary={refSummary}
            refOptimize={refOptimize}
            refDownloadBtn={refDownloadBtn}
            setIsReset={setIsReset}
            diagram={diagram}
            showToggle={showToggle}
            setShowToggle={setShowToggle}
            isSave={isSave}
            handleSaveDiagram={handleSaveDiagram}
            setIsSave={setIsSave}
            setFileName={setFileName}
            fileName={fileName}
            finalToggleValue={finalToggleValue}
            setFinalToggleValue={setFinalToggleValue}
            onPopupChange={handlePopupChange}
            setPalette={setPalette}
            palette={palette}

          />
        </ButtonContainer>

        <CostContainer ref={refCost}>
          <CostToggle
            diagram={diagram}
            showToggle={showToggle}
            showSelectToggle={showSelectToggle}
            finalToggleValue={finalToggleValue}
            setFinalToggleValue={setFinalToggleValue}
            onToggleSelect={handleNodeSelect}
            readOnly
          />
        </CostContainer>
        <DiagramTop>
          <DiagramTopLeft>
            <FileName>파일 이름: {fileName}</FileName>
            <StyledAlertBadge
              count={messageQueue.length}
              onClick={showAlertMessages}
            >
              <Avatar
                ref={refAlert}
                style={{
                  backgroundColor: "transparent",
                  verticalAlign: "middle",
                }}
                icon={
                  <BellOutlined
                    style={{
                      color: "black",
                    }}
                  />
                }
                size="middle"
              />
            </StyledAlertBadge>
          </DiagramTopLeft>
          <DiagramTopRight>
          {isSave ? (
            <Dropdown
            menu={
             { items: saveDropdown,}
            }
              trigger={["hover"]}
              placement="bottomLeft"
            >
              <Button
                ref={refSaveButton}
                type="primary"
                style={{ marginLeft: "5px", marginBottom: "5px" }}
              >
                Save
              </Button>
            </Dropdown>
          ) : (
            <Button
              ref={refSaveButton}
              type="primary"
              onClick={handleSaveDiagram}
              style={{ marginLeft: "5px", marginBottom: "5px" }}
            >
              Save
            </Button>
          )}
            <Button
              type="primary"
              onClick={() => handleTourDraw()}
              style={{ marginLeft: "5px", marginBottom: "5px" }}
            >
              Tour
            </Button>
          </DiagramTopRight>
        </DiagramTop>

        <Modal
          title="저장할 파일의 이름을 입력하세요."
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            value={tempFileName}
            onChange={handleChange}
            placeholder="파일 이름"
          />
        </Modal>

        <StyledDiagram ref={refDiagram}>
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName={diagramClassName}
          />
        </StyledDiagram>
      </DiagramContainer>

      {isPopup ? (
        <RequirementPopup
          diagram={diagram}
          fileName={fileName}
          handlePopup={handlePopup}
          refPopup={refPopup}
        />
      ) : (
        ""
      )}
      <SidebarContainer 
            ref={refSidebar} 
      >
        <Sidebar  
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          
        />
      </SidebarContainer>
    </DrawWorkSpace>
  );
}

export default Draw;
const SidebarContainer = styled.div`
  position: absolute;
  right: 0;
  /* width: %; */
  /* height: 100%; */
  z-index: 20;
  /* height: 60vh; */
`

const CostContainer = styled.div`
  position: fixed;
  z-index: 23;
  left: 50%;
  transform: translateX(-22%);
  align-items: center;
  top: 120px;
  /* width: 500px; */
`;
const ButtonContainer = styled.div`
  background-color: white;
  /* width: 100%; */
  position: absolute;
  /* height: 100%; */
  position: absolute;
  margin-top: 40px;
  z-index: 20;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* border: 10px solid #bbbbda; */
  ${(props) =>
    props.palette &&
    `
  margin-left: 0%;
  `}
  ${(props) =>
    !props.palette &&
    `
  `}
`;


const PaletteContainer = styled.div`
  float: left;
  flex: 1;
`;

const DrawWorkSpace = styled.div`
  padding-left: 10px;
  display: flex;
  padding-top: 11vh;
  align-items: stretch;
  width: 99%;
  height: 89vh;
`;

const StyledAlertBadge = styled(Badge)`
  text-align: center;
  align-items: center;
  /* margin-top: 20px; */
  margin-left: 10px;
  /* padding-bottom: 10px; */
  z-index: 21;
`;

const DiagramTop = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const FileName = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-weight: 500;
  font-size: 15px;
  margin-left: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const DiagramTopLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const DiagramTopRight = styled.div`
  z-index: 20;
  display: flex;
`;
const StyledDiagram = styled.div`
  /* border: 1px solid red; */
  /* float: left; */
  /* margin-top: 3?0px; */
  /* width: 100%; */
  /* height: 100%; */
  height: 80vh;
`;

const StyledButton = styled.div`
  /* margin-top: 20px; */
  /* position: absolute; */
  /* right: 0; */
  box-sizing: border-box;
  width: 70px;
  /* margin: 10px; */
  color: #809cda;

  border: 2px solid #bbbbda;
  border-radius: 10px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;

  line-height: 25px;
  align-items: center;
  text-align: center;

  cursor: pointer;
  &:hover {
    background: #809cda;
    color: #ffffff;
  }
`;
const DiagramContainer = styled.div`

  ${(props) =>
    props.palette &&
    `
    flex: 4;
  height: calc(100% - 70px);
  margin-right: 4%

  `}
  ${(props) =>
    !props.palette &&
    `  
    flex: 1;
    height: calc(100% - 70px);
    margin-right: 4%
  `
  }
`;
