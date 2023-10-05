import React, { useState, useEffect } from "react";
import "../styles/SelectToggle.css";
import axios from 'axios';

const baseOptions = [
  { value: "T1", label: "Linux" },
  { value: "T2", label: "Windows" },
];

const linuxOptions = [
  { value: "T1.1", label: "Ubuntu" },
  { value: "T1.2", label: "CentOS" },
];

const windowsOptions = [
  { value: "T2.1", label: "Windows Server 2019" },
  { value: "T2.2", label: "Windows Server 2016" },
];




const SelectToggle = ({ uniquekey, onToggleSelect }) => {
  
  const [toggleValues, setToggleValues] = useState([null, null, null]);
  const [nextOptions, setNextOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  function fetchData(){
    setLoading(true);
    axios({
      url: '/ec2/platform',
      method: 'post',
      data: {
        "platform": "linux"
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      setData(response.data);
      console.log("data", response.data);
      console.log(response.data.JavaData[0].NICKNAME);
      setLoading(false);
    })
    .catch(function (error) {
      console.error("Error occurred:", error);
      setError(error);
      setLoading(false);
    });
}



const handleChange = (index, event) => {
  const newValue = event.target.value;
  const newValues = [...toggleValues];
  newValues[index] = newValue;
  console.log("nextValues",newValues);
  setToggleValues(newValues);
  onToggleSelect(newValue);

  if (index === 0) {
    if (newValue === "T1") {
      setNextOptions(linuxOptions);
    } else if (newValue === "T2") {
      setNextOptions(windowsOptions);
    } else {
      setNextOptions([]);
    }
  }
};

const renderToggle = (index) => (
  <select
    value={toggleValues[index] || ""}
    onChange={(e) => handleChange(index, e)}
  >
    <option value="" disabled>Select...</option>
    {(index === 0 ? baseOptions : nextOptions).map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

useEffect(() => {
  if (uniquekey.includes('Arch_Amazon-EC2_48')) {
    fetchData();
  }
}, [uniquekey]);

return (
  <div className="toggle-component">
    {renderToggle(0)}
    {renderToggle(1)}
    {renderToggle(2)}
  </div>
);




  
};

export default React.memo(SelectToggle);
