import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 변경된 부분
import Select from 'react-select';
import "../styles/input.css"

const App = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
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

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUploadedFiles([file]);

        // 파일 선택 후 /draw 페이지로 리디렉션
        navigate('/netdraw', { state: { file: file } }); // 변경된 부분
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
