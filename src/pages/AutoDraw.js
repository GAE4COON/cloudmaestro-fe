import React from "react";
import "../styles/inputNetwork.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/App.css";
import { Button } from "antd";
import { useFileUpload, useFileDownload } from "../components/useFileInput"; // 위에서 작성한 훅들을 해당 경로로 임포트

const AutoDraw = () => {
  const { selectedFile, handleInputFIleUpload, uploadFileFormat } =
    useFileUpload();

  const downloadExcel = useFileDownload(
    "/assets/template/templateExcel.xlsx",
    "templateExcel.xlsx"
  );
  const downloadJson = useFileDownload(
    "/assets/template/templateJson.json",
    "templateJson.json"
  );
  const uploadBoxClass = selectedFile
    ? "upload-box file-selected"
    : "upload-box";

  return (
    <MainContent>
      <AutoBackground>
        <div className="description_type" style={{ marginTop: "70px" }}>
          <div className="upper_type">
            <div className="excel_type">
              <div className="title_type">Excel</div>
              <div className="description">
                <p>온디맨드 정보 자산을 업로드 해주세요.</p>
                <br />
                <b>
                  <p>First</p>
                </b>
                <p>
                  입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가
                  수정할 수 있습니다.
                </p>
                <br />
                <b>
                  <p>Second</p>
                </b>
                <p>
                  네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수
                  있습니다.
                </p>
              </div>
              <Button
                type="primary"
                onClick={downloadExcel}
                style={{ marginTop: "30px" }}
              >
                템플릿 받으러가기
              </Button>
            </div>
          </div>
          <div className="upper_type">
            <div className="json_type">
              <div className="title_type">JSON</div>
              <div className="description">
                <p>온디맨드 정보 자산을 업로드 해주세요.</p>
                <br />
                <b>
                  <p>First</p>
                </b>
                <p>
                  입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가
                  수정할 수 있습니다.
                </p>
                <br />
                <b>
                  <p>Second</p>
                </b>
                <p>
                  네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수
                  있습니다.
                </p>
              </div>
              <Button
                type="primary"
                onClick={downloadJson}
                style={{ marginTop: "30px" }}
              >
                템플릿 받으러가기
              </Button>
            </div>
          </div>
        </div>

        <div className="file-upload-container">
          <div className={uploadBoxClass}>
            {selectedFile ? selectedFile.name : "Asset Upload(.xlsx, .json)"}
          </div>
          <label htmlFor="customFileUpload" className="custom-file-label">
            Upload
          </label>
          <input
            type="file"
            id="customFileUpload"
            className="custom-file-input"
            onChange={uploadFileFormat}
            accept=".xlsx, .xls, .json"
          />
        </div>

        <Button
          type="primary"
          onClick={handleInputFIleUpload}
          style={{ marginTop: "30px" }}
        >
          Submit
        </Button>
      </AutoBackground>
    </MainContent>
  );
};
export default AutoDraw;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  min-height: 100vh;
  padding-left: 10%;
  padding-right: 10%;
`;

const AutoBackground = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 100vh;
  background-color: #edf3ff;
  margin: 0 auto;
  /* 중앙 정렬을 위한 스타일 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
