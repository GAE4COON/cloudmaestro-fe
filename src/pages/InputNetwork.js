import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 변경된 부분
import "../styles/inputNetwork.css"
import { Link } from "react-router-dom"


const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // TODO: 업로드 로직 구현
            console.log("Uploading:", selectedFile.name);
        }
    };

    const downloadExcel = () => {
        const url = "/assets/template/templateExcel.xlsx"; // Excel 파일의 경로
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'templateExcel.xlsx'); // 원하는 다운로드 파일명 지정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const downloadJson = () => {
        const url = "/assets/template/templateJson.json"; // Excel 파일의 경로
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'templateJson.json'); // 원하는 다운로드 파일명 지정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="app-container">
            <div className='description_type'>
                <div className='upper_type'>
                    <div className='excel_type'>
                        <div className='title_type'>
                            Excel
                        </div>
                        <div className='description'>
                            온디맨드 정보 자산을 업로드 해주세요.<br /><br />
                            첫번째.<br />
                            입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가 수정할 수 있습니다.<br /><br />
                            두번째.<br />
                            네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수 있습니다.
                        </div>
                        <button className="template_button" onClick={downloadExcel}>
                            템플릿 받으러가기
                        </button>
                        <div className='example'>
                            잘 모르겠다면?
                            <Link to={'/learn'}
                                state={{ type: "excel" }}
                                className='example_link'>
                                예시 보기
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='upper_type'>

                    <div className='json_type'>
                        <div className='title_type'>
                            Json
                        </div>
                        <div className='description'>
                            온디맨드 정보 자산을 업로드 해주세요.<br /><br />
                            첫번째.<br />
                            입력하신 데이터를 기반으로 네트워크 구조가 그려지며, 사용자가 수정할 수 있습니다.<br /><br />
                            두번째.<br />
                            네트워크 구조를 기반으로 AWS의 Cloud Migration을 할 수 있습니다.
                        </div>
                        <button className="template_button" onClick={downloadJson}>
                            템플릿 받으러가기
                        </button>
                        <div className='example'>
                            잘 모르겠다면?

                            <Link to={'/learn'}
                                state={{ type: "json" }}
                                className='example_link'>
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
                    onChange={handleFileChange}
                    accept=".xlsx, .xls, .json"

                />
            </div>

            <button className="submit-button" onClick={handleUpload}>
                Submit
            </button>
        </div>
    );
}
export default App;