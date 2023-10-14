import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 변경된 부분
import "../styles/inputNetwork.css"
import { Link } from "react-router-dom"
import axios from 'axios';
import { useEffect } from 'react';
import { useFileUpload, useFileDownload } from '../components/useFileInput'; // 위에서 작성한 훅들을 해당 경로로 임포트

const App = () => {
  const {
      selectedFile,
      handleInputFIleUpload,
      uploadFileFormat
  } = useFileUpload();

  const downloadExcel = useFileDownload("/assets/template/templateExcel.xlsx", "templateExcel.xlsx");
  const downloadJson = useFileDownload("/assets/template/templateJson.json", "templateJson.json");

  return (
    <div className="app-container">
      <div className="description_type">
        <div className="upper_type">
          <div className="excel_type">
            <div className="title_type">Excel</div>
            <div className="description">
              <p>온디맨드 정보 자산을 업로드 해주세요.</p>
              <br />
              <p>First</p>
              <p>
                입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가
                수정할 수 있습니다.
              </p>
              <br />
              <p>Second</p>
              <p>
                네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수 있습니다.
              </p>
            </div>
            <button className="template_button" onClick={downloadExcel}>
              템플릿 받으러가기
            </button>
            <div className="example">
              잘 모르겠다면?
              <Link
                to={"/learn"}
                state={{ type: "excel" }}
                className="example_link"
              >
                예시 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="upper_type">
          <div className="json_type">
            <div className="title_type">Json</div>
            <div className="description">
              <p>온디맨드 정보 자산을 업로드 해주세요.</p>
              <br />
              <p>First</p>
              <p>
                입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가
                수정할 수 있습니다.
              </p>
              <br />
              <p>Second</p>
              <p>
                네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수 있습니다.
              </p>
            </div>
            <button className="template_button" onClick={downloadJson}>
              템플릿 받으러가기
            </button>
            <div className="example">
              잘 모르겠다면?
              <Link
                to={"/learn"}
                state={{ type: "json" }}
                className="example_link"
              >
                예시 보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="file-upload-container">
        <div className="upload-box">
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

      <button className="submit-button" onClick={handleInputFIleUpload}>
        {/* <Link to={'/draw/network'}
                    state={{ selectedFile }}> */}
        Submit
        {/* </Link> */}
      </button>
    </div>
  );
};
export default App;
