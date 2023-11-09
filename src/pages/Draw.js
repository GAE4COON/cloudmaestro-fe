import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styled from "styled-components";

import useGoJS from "./useGoJS";
import SelectEc2Toggle from "../components/cost/SelectEc22Toggle";
import SelectRdsToggle from "../components/cost/SelectRdsToggle";
import SelectS3Toggle from "../components/cost/SelectS3Toggle";
import SelectWafToggle from "../components/cost/SelectWafToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/Node";

import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Space, Layout, Menu } from "antd";

// 페이지
// import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Sidebar from '../components/Sidebar';
import Palette from "../components/Palette";
import "../styles/Draw.css";
import { useFileUpload } from "../components/useFileInput";
import { summaryFile } from "../apis/file";
import { Link } from "react-router-dom";

function Draw() {
  const navigate = useNavigate();
  const { data } = useFileUpload();
  //console.log("draw data ", data);

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 700px)" });
  const paletteClassName = isDesktopOrLaptop
    ? "palette-component"
    : "palette-component-small";
  const diagramClassName = isDesktopOrLaptop
    ? "diagram-component"
    : "diagram-component-small";

  const [finalToggleValue, setFinalToggleValue] = useState({});
  const [selectedNodeData, setSelectedNodeData] = useState(null); // <-- 상태 변수를 추가합니다.
  const [showToggle, setShowToggle] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [NodeGuideLine, setNodeGuideLine] = useState({
    key: null,
    message: null,
  });

  const {
    initDiagram,
    diagram,
    showSelectToggle,
    clickedNodeKey,
    DiagramCheck,
    NodeGuide,
  } = useGoJS(setSelectedNodeData, setShowToggle, showToggle);

  //console.log("show", showSelectToggle.value);

  // Go to Draw page 완료

  const location = useLocation();
  const file = location.state ? location.state.file : null;
  const from = location.from;
  // //console.log(file);

  useEffect(() => {
    if (NodeGuide) {
      setNodeGuideLine({ key: NodeGuide, message: "추가 예정" });
    } else {
      setNodeGuideLine({ key: null, message: null });
    }
  }, [NodeGuide]);

  useEffect(() => {
    if (
      DiagramCheck &&
      DiagramCheck.result &&
      DiagramCheck.result.status === "fail"
    ) {
      setAlertMessage(DiagramCheck.result.message);
    }
  }, [DiagramCheck]);

  useEffect(() => {
    if (file && diagram) {
      diagram.model = go.Model.fromJson(file);
    }
  }, [file, diagram]);

  const summaryRequest = async () => {
    if (diagram) {
      let jsonData = diagram.model.toJson();
      jsonData = JSON.parse(jsonData);
      jsonData.cost = finalToggleValue; // ec2도 해야할 듯

      const formData = new FormData(); // FormData 객체 생성

      // JSON 데이터를 문자열로 변환하여 FormData에 추가
      formData.append("jsonData", JSON.stringify(jsonData));

      // 파일 데이터를 FormData에 추가
      const fileData = new Blob([JSON.stringify(jsonData)], {
        type: "application/json",
      });
      formData.append("file", fileData, "diagram.json");

      try {
        // FormData를 서버에 전송
        const response = await summaryFile(formData);
        //console.log(response.data);
        navigate("/summary", { state: { file: response.data } });
      } catch (error) {
        //console.log("error", error);
      }
    }
  };

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
  // useReadJSON(file,diagram);

  return (
    <div>
      <div className="Draw">
        <div className="container">
          <div className="button-container">
            <Button
              diagram={diagram}
              showToggle={showToggle}
              setShowToggle={setShowToggle}
              finalToggleValue={finalToggleValue}
              setFinalToggleValue={setFinalToggleValue}
            />
          </div>

          <div className="workspace">
            <div className="palette">
              <Palette
                nodeDataArray={nodeDataArrayPalette}
                divClassName={paletteClassName}
              />
            </div>
            <div className="diagram">
              <StyleSpace direction="vertical">
                {alertMessage && (
                  <StyleAlert
                    message={alertMessage}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setAlertMessage(null)}
                  />
                )}
                {NodeGuideLine && NodeGuideLine.key && (
                  <StyleAlert
                    message={NodeGuideLine.key}
                    description={NodeGuideLine.message}
                    type="info"
                    // closable
                    // onClose={() =>
                    //   setNodeGuideLine({ key: null, message: null })
                    // }
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
              {clickedNodeKey && (
                <div className="clicked_key">{clickedNodeKey}</div>
              )}

              <StyledDiagram>
                <ReactDiagram
                  initDiagram={initDiagram}
                  divClassName={diagramClassName}
                />
              </StyledDiagram>
            </div>
          </div>
        </div>

        {from === "inputNet" && (
          <Link to={"/input/aws"} state={{ file: diagram.model.toJson() }}>
            Submit
          </Link>
        )}


      </div>
      <ButtonContainer>
          <StyledButton onClick={summaryRequest}>Go to summary</StyledButton>
          <StyledButton onClick={null}>Done</StyledButton>
        </ButtonContainer>
    </div>
  );
}

export default Draw;

const StyledDiagram = styled.div`
  float: left;
  width: 100%;
  height: 100%; // 원하는 높이로 설정
  border: 1px solid black;
`;

const StyleSpace = styled(Space)`
  position: absolute;
  width: 20%;
  z-index: 100;
  left: 78%;
  top: 20%;
`;

const StyleAlert = styled(Alert)`
  position: relative;
  width: 100%;
`;

const ButtonContainer = styled.div`
  // background-color:yellow;
  display: flex;
`

const StyledButton = styled.div`
margin-top: 10px;
box-sizing: border-box;
width: 200px;
padding:5px;

background: #FFFFFF;
border: 1px solid #BABABA;
border-radius: 7px;

font-family: "Noto Sans KR", sans-serif !important;
font-style: normal;
font-weight: 700;

line-height: 30px;
align-items: center;
text-align: center;

color: #809CDA;
`
