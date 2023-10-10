import React, { useState, useEffect } from "react";
import "../styles/SelectToggle.css";
import axios from 'axios';

const baseOptions = [
    "PostgreSQL",
    "MySQL",
    "SQLServerStandard",
    "AuroraPostgresMySQL",
    "MariaDB",
    "OracleEnterprise"
  ];

const onTypeOptions = [
  { value: "T3.1", label: "on-demand" }
];


function rdsPrice(priceElement) {
  let dbengine=priceElement[0];
  let dbinstance=priceElement[1];
  let dbsize=priceElement[2];
  console.log("engine: "+dbengine+"instance: "+dbinstance+"size: "+dbsize);
  return new Promise((resolve, reject) => {
    axios({
      url: '/pricing-api/rds',
      method: 'post',
      data: {
        "dbEngine": dbengine,
        "instanceType": dbinstance+"."+dbsize,
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      // 가정: response에 원하는 데이터가 있음
      console.log("response",response.data[0].priceUSD);
      resolve([response.data[0].priceUSD]);
    })
    .catch(function (error) {
      console.error("Error occurred:", error);
      reject(error);
    });
  });
}


function fetchEngineData(engine, instanceType, setData, setLoading, setError){
  return new Promise((resolve, reject) => {setLoading(true);
    axios({
      url: '/db-api/rds',
      method: 'post',
      data: {
        "engine": engine,
        "instanceType":instanceType
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      setData(response.data);
      console.log(response.data);
      //console.log("response.data",response.data,"platform",platform)
      

      const transformData = (data) => {
        const { instanceType, instanceSize } = data;
        const resultMap = {};
    
        instanceType.forEach((type, index) => {
            if (!resultMap[type]) {
                resultMap[type] = [];
            }
            resultMap[type].push(instanceSize[index]);
        });
    
        return resultMap;
    };

    if(engine == "PostgreSQL") {
        const transformedData=transformData(response.data);
        resolve(transformedData);
    }
    
    if(engine == "MySQL") {
        const transformedData=transformData(response.data);
        resolve(transformedData);
    }

    if (engine == "SQLServerStandard") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }

    if (engine == "AuroraPostgresMySQL") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }
    
    if (engine == "MariaDB") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }
    
    if (engine == "OracleEnterprise") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }
        
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


const SelectRdsToggle = ({ uniquekey, onToggleSelect }) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);
  const [toggle4Value, setToggle4Value] = useState(null);
  const [finalToggleValue, setFinalToggleValue] = useState([]);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [toggle4Options, setToggle4Options] = useState([]);
  const [price ,setPrice] = useState(null);

  const [dbOption, setDbOption] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (toggle1Value) {
      async function fetchOptions() {
        try {
          const options = await fetchEngineData(toggle1Value, null, setData, setLoading, setError);
          //반환 값은 딕셔너리인데 set할때 오류가 발생하는 듯
          console.log("옵션입니당",options);
          setToggle2Options(Object.keys(options));
          setDbOption(options);
          setToggle2Value(null);
          setToggle3Value(null);
        } catch (err) {
          console.error("Error fetching engine data:", err);
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

    
    setToggle3Options(dbOption[toggle2Value]);
    setToggle3Value(null);
    }
  }, [toggle2Value]);

  useEffect(() => {

      if(finalToggleValue.length == 3)
          {
            async function priceOptions() {
              try {
                const calculatedPrice = await rdsPrice(finalToggleValue);
                console.log("calcul",calculatedPrice);
                setPrice(calculatedPrice);

              } catch (err) {
                console.error("Error fetching engine data:", err);
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
    } 
  };


  console.log("FinalToggle",finalToggleValue);

  const renderToggle = (index, Select, value, options) => (
    <select onChange={(e) => handleChange(index, e)}>
      <option disabled>{Select}</option>
      {options.map((option, idx) => (
        <option key={idx}>
          {option}
        </option>
      ))}
    </select>
  );
  

  const Item = ({price}) =>{

    if(!price || price.length < 1) {
      return null;
    }
    return (
      <div>
        {price[0]+"USD / Hour"}
      </div>
    );
    
  }
  return (
    <div className ="ec2">
      <div className="toggle-component">
        {renderToggle(0, "Engine", toggle1Value, baseOptions)}
        {renderToggle(1, "Instance Type", toggle2Value, toggle2Options)}
        {renderToggle(2, "Size", toggle3Value, toggle3Options)}
        

        <div className="price">
          <Item price={price} />
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(SelectRdsToggle);




