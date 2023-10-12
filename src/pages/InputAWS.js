import React, { useState } from 'react'; // 변경된 부분
import Select from 'react-select';
import "../styles/input.css"
import { periodOptions, serviceOptions, industrialOptions, wayOptions, costplatOptions } from "../db/inputSelect";

import { Link } from 'react-router-dom';
import { json, useNavigate, useLocation } from "react-router-dom";

const App = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedIndustrial, setSelectedIndustrial] = useState(null);
    const [selectedWay, setSelectedWay] = useState(null);
    const [selectedCostPlat, setSelectedCostPlat] = useState(null);

    const input = [selectedPeriod, selectedService, selectedIndustrial, selectedWay, selectedCostPlat];

    const location = useLocation();
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        navigate('/draw/aws'); // 변경된 부분
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
            <div className="horizontal-layout">
                <button onClick={handleFileChange}>
                    Upload File
                </button>
            </div>

        </div>
    );
}
export default App;