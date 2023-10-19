import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styled from "styled-components";

import useGoJS from "./useGoJS";
import SelectEc2Toggle from "../components/cost/SelectEc2Toggle";
import SelectRdsToggle from "../components/cost/SelectRdsToggle";
import SelectS3Toggle from "../components/cost/SelectS3Toggle";
import SelectWafToggle from "../components/cost/SelectWafToggle";
import { useMediaQuery } from "react-responsive";
import { nodeDataArrayPalette } from "../db/Node";

import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "antd";

// 페이지
// import useReadJSON from "./useReadJSON";
import Button from "./Button.js";
import Palette from "../components/Palette";
import "../styles/Draw.css";
import { useFileUpload } from "../components/useFileInput";
import { summaryFile } from "../apis/file";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Draw() {
  const navigate = useNavigate();
  const { data } = useFileUpload();
  console.log("draw data ", data);

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

  const { initDiagram, diagram, showSelectToggle, clickedNodeKey } = useGoJS(
    setSelectedNodeData,
    setShowToggle,
    showToggle
  );

  console.log("show", showSelectToggle.value);

  // Go to Draw page 완료

  const location = useLocation();
  const file = location.state ? location.state.file : null;
  const from = location.from;
  // console.log(file);

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
        console.log(response.data);
        navigate("/summary", { state: { file: response.data } });
      } catch (error) {
        console.log("error", error);
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
          <div className="alert-container">
            <Alert message="Success Tips" type="success" showIcon closable />
            <Alert
              message="Informational Notes"
              type="info"
              showIcon
              closable
            />
            <Alert message="Warning" type="warning" showIcon closable />
            <Alert message="Error" type="error" showIcon closable />
          </div>

          <div className="workspace">
            <div className="palette">
              <Palette
                nodeDataArray={nodeDataArrayPalette}
                divClassName={paletteClassName}
              />
            </div>
            <div className="diagram">
              {showToggle &&
                showSelectToggle.value &&
                showSelectToggle.key.includes("EC2") && (
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
                showSelectToggle.key.includes("WAF") && (
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

        <button onClick={summaryRequest}>Go to summary</button>
      </div>
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
