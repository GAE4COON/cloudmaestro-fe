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
import { summaryFile } from "../apis/fileAPI";

const MySummary = () => {

  const costdata = {

      "compute": {

        "EC2": {
          "platform": "windows",
          "instancetype": "r6id",
          "size": "32xlarge",
          "cost": "11.6288"
        },
      },

      "database": {
        "RDS": {
          "engine": "MySQL",
          "instancetype": "db.m6g",
          "size": "4xlarge",
          "cost": "1.6780000000"
        },
        "RDS2": {
          "engine": "AuroraPostgresMySQL",
          "instancetype": "db.r5",
          "size": "12xlarge",
          "cost": "10.9200000000"
        },
      },
      "storage": {
        "Simple Storage Service (S3)": {
          "storage": "12",
          "cost": 12
        },
      },
      "waf": {
        "AWS_WAF": {
          "rule": "12",
          "request": "12",
          "cost": 12.2
        },
      },
    
  }

  return (
    <div className="main-content">
      <div className="mypage-container">
        <div className="flex-container">
          <div className="menu-container">
            <SideBar />
          </div>
          <Summary costdata={costdata} style={{
            margin:"0px",
            padding: "0px"
          }}/>

        </div>
      </div>
    </div>

  );
}

export default MySummary;
