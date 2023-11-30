import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styled from "styled-components";

import useGoJS from "../hooks/useGoJS.js";
import SelectEc2Toggle from "../components/cost/SelectEc22Toggle";
import SelectRdsToggle from "../components/cost/SelectRdsToggle";
import SelectS3Toggle from "../components/cost/SelectS3Toggle";
import SelectWafToggle from "../components/cost/SelectWafToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/Node";

import { useLocation } from "react-router-dom";
import { Alert, Space, Layout, Menu } from "antd";
import { sidebarResource } from "../apis/sidebar";
import { saveDiagram } from "../apis/fileAPI";
import { DrawResourceGuide } from "../apis/resource";
import "../styles/App.css";


// 페이지
// import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Sidebar from "../components/Sidebar";
import Palette from "../components/Palette";
import "../styles/Draw.css";
import { useFileUpload } from "../components/useFileInput";
import { summaryFile } from "../apis/fileAPI.js";
import { Link } from "react-router-dom";
import RequirementPopup from "../components/RequirementPopup";
import { DataContext, useData } from "../components/DataContext.js"; // DataContext의 경로를 수정하세요

function Draw() {
  const { data } = useFileUpload();
  //console.log("draw data ", data);
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop
    ? "palette-component"
    : "palette-component-small";
  const diagramClassName = "diagram-component";

  const [finalToggleValue, setFinalToggleValue] = useState({});
  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.
  const [showToggle, setShowToggle] = useState(true);
  const [alertMessage, setAlertMessage] = useState([]);
  const { setData } = useData();
  const [mydiagram, setmyDiagram] = useState(null);
  const [NodeGuide, setNodeGuide] = useState(null);
  const [NodeGuideLine, setNodeGuideLine] = useState({
    key: null,
    message: null,
  });

  const [diagramVersion, setDiagramVersion] = useState(0);
  const [isPopup, setIsPopup] = useState(false);

  const { isSidebarOpen, setIsSidebarOpen } = useData();

  const location = useLocation();
  const file = location.state ? location.state.file.result : null;
  const from = location.from;

  useEffect(() => {}, [diagramVersion]); // Dependency on diagramVersion

  const handleDiagramChange = useCallback((changedDiagram) => {
    // console.log("다이어그램이 변경되었습니다:", changedDiagram.model.toJson());
    setmyDiagram(changedDiagram);
    setDiagramVersion((prevVersion) => prevVersion + 1);
  });

  const handleguide = useCallback((guide) => {
    setNodeGuide(guide);
  });

  const { initDiagram, diagram, showSelectToggle, clickedNodeKey} = useGoJS(
    setShowToggle,
    handleDiagramChange,
    handleguide,
    setAlertMessage
  );

  useEffect(() => {
    if (file && diagram) {
      if (file.hasOwnProperty("cost")) {
        setFinalToggleValue(file["cost"]);
      }
      const diagramModel = go.Model.fromJson(file);
      diagram.model = diagramModel;
        }
  }, [file, diagram]);

  useEffect(() => {
    if (diagram) {
      diagram.clear(); //다른 로케이션으로 가면 다이어그램을 없앤다
    }
    setData(null);
  }, [location]);

  useEffect(() => {
    const fetchResourceGuide = async () => {
      if (NodeGuide) {
        try {
          const ResourceData = { title: NodeGuide };
          const response = await DrawResourceGuide(ResourceData);
          if (response.data.result !== "fail") {
            setNodeGuideLine({ key: NodeGuide, message: response.data.result });
          } else {
            setNodeGuideLine({
              key: NodeGuide,
              message: "추후 추가 예정",
            });
          }
        } catch (error) {
          console.error("Error fetching resource guide:", error);
        }
      } else {
        setNodeGuideLine({ key: null, message: null });
      }
    };

    fetchResourceGuide();
  }, [NodeGuide]);


  const removeAlert = (index) => {
    setAlertMessage((currentMessages) =>
      currentMessages.filter((_, i) => i !== index)
    );
    console.log("change AlertMessage:", alertMessage);
  };

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

  const handleSaveDiagram = async () => {
    try {
      let diagramData = diagram.model.toJson();
      diagramData = JSON.parse(diagramData);
      diagramData["cost"] = finalToggleValue; //ec2도 해야할 듯
      diagramData = JSON.stringify(diagramData);

      const fileName = window.prompt(
        "저장할 파일의 이름을 입력하세요.",
        "MyDiagram"
      );

      if (fileName) {
        const response = await saveDiagram(diagramData, fileName + ".json");
        alert("저장되었습니다.");
      } else {
        alert("파일 저장이 취소되었습니다.");
      }
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다: ", error);
    }
  };

  return (
    <div className="main-content">
      <div className="Draw">
        <div className="container">
          <div className="workspace">
            <div className="palette">
              <Palette
                divClassName={paletteClassName}
                diagram={mydiagram}
                diagramVersion={diagramVersion}
              />
            </div>
            <DiagramContainer>
              <div className="button-container">
                <Button
                  diagram={diagram}
                  showToggle={showToggle}
                  setShowToggle={setShowToggle}
                  finalToggleValue={finalToggleValue}
                  setFinalToggleValue={setFinalToggleValue}
                  onPopupChange={handlePopupChange}
                />
              </div>
              <StyledButton onClick={handleSaveDiagram}>Save</StyledButton>

              <StyleSpace direction="vertical">
                {alertMessage.map((message, index) => (
                  <StyleAlert
                    key={index}
                    message={message}
                    type="error"
                    showIcon
                    closable
                    onClose={() => removeAlert(index)}
                  />
                ))}
                {NodeGuideLine && NodeGuideLine.key && (
                  <StyleAlert
                    message={NodeGuideLine.key}
                    description={NodeGuideLine.message}
                    type="info"
                    closable
                    onClose={() => {
                      setNodeGuide(null);
                      setNodeGuideLine({ key: null, message: null });
                    }}
                  />
                )}
              </StyleSpace>
              {showToggle &&
                showSelectToggle.value &&
                showSelectToggle.key.includes("EC2") &&
                !showSelectToggle.key.includes(" ") && (
                  <SelectEc2Toggle
                    diagram={diagram}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    onToggleSelect={handleNodeSelect}
                    readOnly
                  />
                )}
              {showToggle &&
                showSelectToggle.value &&
                showSelectToggle.key.includes("RDS") && (
                  <SelectRdsToggle
                    diagram={diagram}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    readOnly
                  />
                )}
              {showToggle &&
                showSelectToggle.value &&
                showSelectToggle.key.includes("Simple Storage Service") && (
                  <SelectS3Toggle
                    diagram={diagram}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    readOnly
                  />
                )}
              {showToggle &&
                showSelectToggle.value &&
                showSelectToggle.key.includes("AWS_WAF") && (
                  <SelectWafToggle
                    diagram={diagram}
                    uniquekey={showSelectToggle.key}
                    finalToggleValue={finalToggleValue}
                    setFinalToggleValue={setFinalToggleValue}
                    readOnly
                  />
                )}

              <StyledDiagram>
                <ReactDiagram
                  initDiagram={initDiagram}
                  divClassName={diagramClassName}
                />
              </StyledDiagram>
            </DiagramContainer>
            {isPopup ? (
              <RequirementPopup diagram={diagram} handlePopup={handlePopup} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draw;

const StyledDiagram = styled.div`
  /* float: left; */
  margin-top: 60px;
  width: 100%;
  height: 80vh; // 원하는 높이로 설정
`;

const StyleSpace = styled(Space)`
  position: absolute;
  width: 25%;
  z-index: 100;
  left: 73%;
  top: 20%;
`;

const StyleAlert = styled(Alert)`
  position: relative;
  width: 100%;
  max-height: 100px; // Adjust as needed
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 10px;
    margin-top: 10px; // 상단 마진
    margin-bottom: 10px; // 하단 마진
  }

  .ant-alert-close-icon {
    position: absolute;
    right: 5px; // 오른쪽에서부터의 위치 조정
    top: 10px; // 상단에서부터의 위치 조정
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  margin-top: 20px;
  position: absolute;
  right: 0;
  box-sizing: border-box;
  width: 70px;
  /* margin: 10px; */
  color: #809cda;

  border: 2px solid #bbbbda;
  border-radius: 7px;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;

  line-height: 30px;
  align-items: center;
  text-align: center;

  cursor: pointer;
  &:hover {
    background: #809cda;
    color: #ffffff;
  }
`;
const DiagramContainer = styled.div`
  position: relative;
  display: inline;
  width: 75%;
  height: 75%;
`;
