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
  console.log("costdata",costdata)

  const location = useLocation();
  const costData = costdata ? costdata : location.state?.costdata;
  const from = location.state.from;

  console.log("location?", location.state)

  const [isExporting, setIsExporting] = useState(false);

  console.log("costdata!!!!!!",costData)

  function exportToPDF() {
    setIsExporting(true); // Open all dropdowns

    // Small delay to ensure React re-renders with open dropdowns before capturing
    setTimeout(() => {
      const input = document.getElementById("export-container");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // const pdf = new jsPDF();

        var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
        var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF("p", "mm");
        var position = 0;

        // 첫 페이지 출력
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save("sample.pdf");
        setIsExporting(false); // Close all dropdowns after export
      });
    }, 100);
  }

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
<SummaryContainer style={{ 
  marginLeft: from === 'draw' ? '0px' : '20px' ,
  marginRight: from === 'draw' ? '0px' : '20px' ,
  marginTop: from === 'draw' ? '30px' : '' ,
  
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
              <>
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
              </>
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
          <button className="export-button" onClick={exportToPDF}>
            EXPORT
          </button>
        </div>
      </SummaryContainer>
  );
}

export default Summary;

const SummaryContainer = styled.div`
`