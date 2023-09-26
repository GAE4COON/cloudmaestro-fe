import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 변경된 부분
import Select from 'react-select';
import "../styles/input.css"

import { upload } from '@testing-library/user-event/dist/upload';
import * as XLSX from 'xlsx';

import { periodOptions, serviceOptions, industrialOptions, wayOptions, costplatOptions } from "../db/inputSelect";


const App = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedIndustrial, setSelectedIndustrial] = useState(null);
    const [selectedWay, setSelectedWay] = useState(null);
    const [selectedCostPlat, setSelectedCostPlat] = useState(null);

    const [uploadedFiles, setUploadedFiles] = useState([]);


    const periodOptions = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' }
    ];

    const serviceOptions = [
        { value: 'serviceA', label: 'Service A' },
        { value: 'serviceB', label: 'Service B' },
        { value: 'serviceC', label: 'Service C' }
    ];

    const navigate = useNavigate(); // 변경된 부분
    const [excelData, setExcelData] = useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUploadedFiles([file]);

        // 파일 선택 후 /draw 페이지로 리디렉션
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const bufferArray = e.target.result;

            // Parse the Excel data
            const workbook = XLSX.read(bufferArray, { type: 'buffer' });

            // Convert the first worksheet to JSON
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log("jsonjsondata",jsonData);
            setExcelData(jsonData);
            
     
        navigate('/netdraw', { state: { excelData: jsonData } });
           }; // 변경된 부분
    };

    return (
        <div className="app-container">
            <div className="horizontal-layout">
                <label>Period</label>
                <div className="select-container">
                    <Select
                        options={periodOptions}
                        onChange={setSelectedPeriod}
                        value={selectedPeriod}
                    />
                </div>
            </div>
            <div className="horizontal-layout">
                <label>Service</label>
                <div className="select-container">
                    <Select
                        options={serviceOptions}
                        onChange={setSelectedService}
                        value={selectedService}
                    />
                </div>
            </div>
            <div className="horizontal-layout">
                <label>Industrial</label>
                <div className="select-container">
                    <Select
                        options={industrialOptions}
                        onChange={setSelectedIndustrial}
                        value={selectedIndustrial}
                    />
                </div>
            </div>
            <div className="horizontal-layout">
                <label>Mygration Way</label>
                <div className="select-container">
                    <Select
                        options={wayOptions}
                        onChange={setSelectedWay}
                        value={selectedWay}
                    />
                </div>
            </div>
            <div className="horizontal-layout">
                <label>Const & Platform</label>
                <div className="select-container">
                    <Select
                        options={costplatOptions}
                        onChange={setSelectedCostPlat}
                        value={selectedCostPlat}
                    />
                </div>
            </div>
            <div>
                <label>Upload Excel or JSON</label><br/>
                <input 
                    type="file" 
                    className="file-input"
                    accept=".xlsx, .xls, .json" 
                    multiple 
                    onChange={handleFileChange} 
                />
            </div>
            <div className="file-list">
                <h4>Uploaded File</h4>
                <ul>
                    {Array.from(uploadedFiles).map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default App;
