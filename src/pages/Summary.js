import React, { useState } from "react"; // add useState
import { useNavigate } from "react-router-dom";
import "../styles/MyDesign.css";
import Sidebar from '../components/MyPageSideBar';
import { BsChevronDown } from "react-icons/bs";
import DataTable from '../components/EC2Table';
import { headers, items } from '../db/EC2TableData';
import { useLocation } from "react-router-dom";


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const createChart = ((array) => {
  const data = {
    labels: array.map(obj => Object.keys(obj)[0]), // Extract the keys (e.g., "Compute", "Security", etc.)

    datasets: [
      {
        label: 'cost',
        data: array.map(obj => Object.values(obj)[0]), // Extract the values (e.g., 503, 12, etc.)
        backgroundColor: [
          '#173577',
          '#3064D6',
          '#799DEE',
          '#D1DEFB'
        ],
      },
    ],
  };
  return data;
}
)
const chartOptions = {
  plugins: {
    legend: {
      display: true,
      position: 'right'
    }
  }
};


function Summary() {

  const location = useLocation();
  const file = location.state ? location.state.file : null;
  console.log(file);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleInstanceClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  var resourceCost={};
  var filteredItems={};

  Object.entries(file).map(([resourceName,valueObject])=>{
    var items=[];
    var cost = 0.0;
    Object.entries(valueObject).map(([instanceName, detail])=>{
      cost += parseFloat(detail.cost)
      items.push(detail);
      detail.cost = parseFloat(detail.cost).toFixed(2);
      detail.instance = instanceName;
      console.log("dtype ",detail);
    })
    cost = parseFloat(cost.toFixed(2));
    resourceCost[resourceName] = cost;
    filteredItems[resourceName] = items;
    console.log("filter",filteredItems);

  })

  //   const filteredItems = items.filter(item => item.type === category);


  var instanceNameArr = Object.entries(resourceCost).map(([key, value]) => ({ [key]: value }));
  const totalCost = Object.values(resourceCost).reduce((sum, value) => sum + value, 0).toFixed(2);

  return (
      <div style={{ flex: 1, padding: '20px', marginLeft:'100px', marginRight:'100px'}}>
        <div className="title1">
          도식화 히스토리
        </div>
        <div className="file-name">
          MyCompany_Cloud1
        </div>
        <div className="cost-container">
          <div className="middle-bar"></div>


          {instanceNameArr.map((instanceObj, index) => {
            const [category, cost] = Object.entries(instanceObj)[0];

            return (
              <>
                <div key={index} className="instance">
                  <div className="instance-cost-container"  onClick={() => handleInstanceClick(index)}>

                    <div className="instance-title">
                      {category}
                    </div>
                    <div className="instance-cost">
                      ${cost}/mo
                      <div className="dropdown-icon">
                        <BsChevronDown color="#cdcdcd" />
                      </div>
                    </div>
                  </div>
                  {activeDropdown === index && (
                    <div className="instance-dropdown">
                      {category}
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
            <div className="total-cost-title">
              total
            </div>
            <div className="total-cost">
              ${totalCost}/mo
            </div>
          </div>
          <div className="pie-chart">
            <Doughnut data={createChart(instanceNameArr)} options={chartOptions} />
          </div>
          <button className="export-button">
            EXPORT
        </button>
        </div>

      </div>
      

  );
}

export default Summary;
