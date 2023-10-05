import React, { useState, useEffect } from "react";
import "../styles/SelectToggle.css";

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

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:8080/ec2/platform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // 여기에 백엔드에 보내고 싶은 데이터를 추가하세요.
          "platform":"linux",
          "instanceType":"c6g.medium"
        })
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", JSON.stringify(data));
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };



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
