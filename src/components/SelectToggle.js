import React, { useState, useEffect } from "react";
import "../styles/SelectToggle.css";
import axios from 'axios';

const baseOptions = [
  { value: "T1", label: "linux" },
  { value: "T2", label: "windows" },
];


const onTypeOptions = [
  { value: "T3.1", label: "onDemand" },
  { value: "T3.2", label: "Spot" },
  { value: "T3.3", label: "Reserved" }
];

function fetchData(platform,setData, setOptions,setLoading, setError){
  return new Promise((resolve, reject) => {setLoading(true);
    axios({
      url: '/ec2/apiname',
      method: 'post',
      data: {
        "platform": platform
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      setData(response.data);
      console.log("response.data",response.data,"platform",platform)
      if(platform == "linux"){
        const newLinuxOptions = response.data.map(item => ({
          value:"T1."+item.id,
          label: item
        }))


        resolve(newLinuxOptions);

      }
      if(platform == "windows"){
        const newWindowsOptions = response.data.map(item => ({
          value:"T1."+item.id,
          label: item
        }))

        resolve(newWindowsOptions);

      }
      setLoading(false);
    })
    .catch(function (error) {
      console.error("Error occurred:", error);
      setError(error);
      setLoading(false);
      reject(error);
    });
  });
}


const SelectToggle = ({ uniquekey, onToggleSelect }) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);
  const [toggle4Value, setToggle4Value] = useState(null);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [toggle4Options, setToggle4Options] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = async(index, event) => {
    const newValue = event.target.value;
      
    const platformMap = {
      "T1": "linux",
      "T2": "windows",
    };
      
    if(index === 0) {
      setToggle1Value(newValue);
      if(newValue === "T1" || newValue === "T2") {
        const platform = platformMap[newValue];
        const options = await fetchData(platform, setData, setLoading, setError);
        setToggle2Options(options);
      } else {
        setToggle2Options([]);
      }
      setToggle2Value(null); // Reset toggle 2 value when toggle 1 changes
      setToggle3Value(null); // Reset toggle 3 value when toggle 1 changes
    } else if(index === 1) {
      setToggle2Value(newValue);
      setToggle3Options(onTypeOptions);
      setToggle3Value(null); // Reset toggle 3 value when toggle 2 changes
    } else if(index === 2) {
      setToggle3Value(newValue);
    }
  };

  const renderToggle = (index, Select, value, options) => (
    <select
      value={value || ""}
      onChange={(e) => handleChange(index, e)}
    >
      <option value="" disabled>{Select}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="toggle-component">
      {renderToggle(0, "PlatForm", toggle1Value, baseOptions)}
      {renderToggle(1, "Instance Type", toggle2Value, toggle2Options)}
      {renderToggle(2, "Size", toggle3Value, toggle3Options)}
      {renderToggle(3, "Billing Option", toggle4Value, toggle4Options)}
    </div>
  );
};

export default React.memo(SelectToggle);




