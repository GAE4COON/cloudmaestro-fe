import React, { useState } from "react"; // add useState
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
import styled from "styled-components";
import DownloadPDF from "../components/DownloadPDF";

ChartJS.register(ArcElement, Tooltip, Legend);

const createChart = (array) => {
  const data = {
    labels: array.map((obj) => Object.keys(obj)[0]),

    datasets: [
      {
        label: "cost",
        data: array.map((obj) => Object.values(obj)[0]), // Extract the values (e.g., 503, 12, etc.)
        backgroundColor: ["#173577", "#3064D6", "#799DEE", "#D1DEFB"],
      },
    ],
  };
  return data;
};
const chartOptions = {
  plugins: {
    legend: {
      display: true,
      position: "right",
    },
  },
};

const Summary = ({ costdata }) => {
  console.log("costdata", costdata)

  const location = useLocation();
  const costData = costdata ? costdata : location.state?.costdata;
  const from = location.state.from;


  const [isExporting, setIsExporting] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleInstanceClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  var resourceCost = {};
  var filteredItems = {};

  //console.log("file!!!! ", file);

  Object.entries(costData).map(([resourceName, valueObject]) => {
    var items = [];
    var cost = 0.0;
    Object.entries(valueObject).map(([instanceName, detail]) => {
      cost += parseFloat(detail.cost);
      items.push(detail);
      detail.cost = parseFloat(detail.cost).toFixed(2);
      detail.instance = instanceName;
    });
    cost = parseFloat(cost.toFixed(2));
    resourceCost[resourceName] = cost;
    filteredItems[resourceName] = items;
  });

  var instanceNameArr = Object.entries(resourceCost).map(([key, value]) => ({
    [key]: value,
  }));
  const totalCost = Object.values(resourceCost)
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);

  return (
    <div id="export-container">

    <SummaryContainer style={{
      marginLeft: from === 'draw' ? '0px' : '20px',
      marginRight: from === 'draw' ? '0px' : '20px',
      marginTop: from === 'draw' ? '30px' : '',

      width: from === 'draw' ? '' : "100%",
      paddingLeft: from === 'draw' ? '20%' : "0%",
      paddingRight: from === 'draw' ? '20%' : "0%"

    }}>
      <div className="title1">도식화 히스토리</div>
      <div className="file-name">MyCompany_Cloud1</div>
      <div className="price-container">
        <div className="middle-bar"></div>

        {instanceNameArr.map((instanceObj, index) => {
          const [category, cost] = Object.entries(instanceObj)[0];
          console.log(index, category, cost)

          return (
              <div key={index} className="instance">
                <div
                  className="instance-price-container"
                  onClick={() => handleInstanceClick(index)}
                >
                  <div className="instance-title">{category}</div>
                  <div className="instance-price">
                    ${cost}/mo
                    <div className="dropdown-icon">
                      <BsChevronDown color="#cdcdcd" />
                    </div>
                  </div>
                </div>
                {(isExporting || activeDropdown === index) && (
                  <div className="instance-dropdown">
                    <DataTable
                      headers={headers[category]}
                      items={filteredItems[category]}
                    />
                  </div>
                )}
              </div>
          );
        })}
        <div className="total-container">
          <div className="total-price-title">total</div>
          <div className="total-price">${totalCost}/mo</div>
        </div>
        <div className="pie-chart">
          <Doughnut
            data={createChart(instanceNameArr)}
            options={chartOptions}
          />
        </div>
        <div className="download-container">
        <DownloadPDF onClick={() => setIsExporting(true)} onExport={setIsExporting} />
        </div>
        </div>
    </SummaryContainer>
    </div>

  );
}

export default Summary;

const SummaryContainer = styled.div`
`