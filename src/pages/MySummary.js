import React, { useState } from "react"; // add useState
import SideBar from "../components/MyPageSideBar";

import "../styles/MySummary.css";
import { BsChevronDown } from "react-icons/bs";
import DataTable from "../components/EC2Table";
import { headers } from "../db/EC2TableData";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/App.css";
import Summary from "./Summary";
import { useEffect } from "react";
import { summaryFile } from "../apis/fileAPI";

const MySummary = () => {

  const [costData, setCostData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetchCostData = async () => {
      if (location.state && location.state.file && location.state.file.result) {
        requestSummary(location.state.file.result.cost);
      }
    };
   
    fetchCostData();
  }, [location.state]); 

  // Asynchronous function to request summary data
  const requestSummary = async (cost) => {
    const response = await summaryFile(cost);
    setCostData(response.data);
    return response;
  };

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <SideBar />
          </div>
          <Summary costdata={costData} style={{
            margin:"0px",
            padding: "0px"
          }}/>

        </div>
      </div>
    </div>
  );
}

export default MySummary;
