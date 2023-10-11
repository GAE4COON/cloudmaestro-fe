import React, { useState, useEffect } from "react";
import "../styles/SelectToggle.css";
import axios from 'axios';

const baseOptions = [
  { value: "T1", label: "linux" },
  { value: "T2", label: "windows" },
];

const onTypeOptions = [
  { value: "T3.1", label: "on-demand" }
];


function ec2Price(priceElement) {
  let instance = "aws" + "-ec2" + "-" + priceElement[1] + "_" + priceElement[2];
  console.log("instance",instance);
  return new Promise((resolve, reject) => {
    axios({
      url: '/vantage/ec2',
      method: 'post',
      data: {
        "platform": priceElement[0],
        "instance": instance,
        "lifeCycle": priceElement[3]
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      // 가정: response에 원하는 데이터가 있음
      console.log("response",response.data);
      resolve([response.data.amount, response.data.currency, response.data.unit]);
    })
    .catch(function (error) {
      console.error("Error occurred:", error);
      reject(error);
    });
  });
}




function fetchPlatformData(platform, instanceType, setData, setLoading, setError){
  return new Promise((resolve, reject) => {setLoading(true);
    axios({
      url: '/ec2/apiname',
      method: 'post',
      data: {
        "platform": platform,
        "instanceType":instanceType
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      setData(response.data);
      //console.log("response.data",response.data,"platform",platform)
      if(platform == "linux"){
        const newLinuxOptions = response.data.map(item => ({
          value: item,
          label: item
        }))


        resolve(newLinuxOptions);

      }
      if(platform == "windows"){
        const newWindowsOptions = response.data.map(item => ({
          value: item,
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
  const [finalToggleValue, setFinalToggleValue] = useState([]);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [toggle4Options, setToggle4Options] = useState([]);
  const [price ,setPrice] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (toggle1Value) {
      async function fetchOptions() {
        try {
          const options = await fetchPlatformData(toggle1Value, null, setData, setLoading, setError);
          setToggle2Options(options);
          setToggle2Value(null);
          setToggle3Value(null);
        } catch (err) {
          console.error("Error fetching platform data:", err);
        }
      }

      fetchOptions();
    } else {
      setToggle2Options([]);
      setToggle2Value(null);
      setToggle3Value(null);
    }
  }, [toggle1Value]);

  useEffect(() => {
    if (toggle2Value) {
      async function fetchOptions() {
        try {
          const options = await fetchPlatformData(toggle1Value, toggle2Value, setData, setLoading, setError);
          setToggle3Options(options);
          setToggle3Value(null);
        } catch (err) {
          console.error("Error fetching instance form data:", err);
        }
      }

      fetchOptions();
    } else {
      setToggle3Options([]);
      setToggle3Value(null);
    }
  }, [toggle2Value]);

  useEffect(() => {

      if(finalToggleValue.length == 4)
          {
            async function priceOptions() {
              try {
                const calculatedPrice = await ec2Price(finalToggleValue);
                console.log("calcul",calculatedPrice);
                setPrice(calculatedPrice);

              } catch (err) {
                console.error("Error fetching platform data:", err);
              }
             
          }
          priceOptions()
     
    }

      
  },[finalToggleValue])





  const handleChange = (index, event) => {
    const newValue = event.target.value;

    if (index === 0) {
      setToggle1Value(newValue);
      setFinalToggleValue([newValue]);
    } else if (index === 1) {
      setToggle2Value(newValue);
      setFinalToggleValue(prev => [prev[0], newValue]);
    } else if (index === 2) {
      setToggle3Value(newValue);
      setToggle4Options(onTypeOptions);
      setFinalToggleValue(prev => [prev[0],prev[1], newValue]);
    } else if (index === 3) {
      setToggle4Value(newValue);
      setFinalToggleValue(prev => [prev[0],prev[1],prev[2], newValue]);

    }
  };


  console.log("FinalToggle",finalToggleValue);


  const renderToggle = (index, Select, value, options) => (
    <select
      value={value || ""}
      onChange={(e) => handleChange(index, e)}
    >
      <option value="" disabled>{Select}</option>
      {options.map((option) => (
        <option key={option.label} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
  const Item = ({price}) =>{

    if(!price || price.length < 3) {
      return null;
    }
    return (
      <div>
        {price[0] + "/" + price[1] + "/" + price[2]}
      </div>
    );
    
  }
  return (
    <div className ="ec2">
      <div className="toggle-component">
        {renderToggle(0, "PlatForm", toggle1Value, baseOptions)}
        {renderToggle(1, "Instance Type", toggle2Value, toggle2Options)}
        {renderToggle(2, "Size", toggle3Value, toggle3Options)}
        {renderToggle(3, "Billing Option", toggle4Value, toggle4Options)}

        <div className="price">
          <Item price={price} />
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(SelectToggle);




