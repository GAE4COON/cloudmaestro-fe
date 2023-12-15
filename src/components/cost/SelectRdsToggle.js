import React, { useState, useEffect } from "react";
import "../../styles/SelectToggle.css";
import axios from 'axios';
import { searchDb, searchPrice } from "../../apis/price.js";
import styled from "styled-components";

const baseOptions = [
    "PostgreSQL",
    "MySQL",
    "SQLServer",
    "AuroraPostgresMySQL",
    "MariaDB",
    "Oracle"
  ];

const onTypeOptions = [
  { value: "T3.1", label: "on-demand" }
];
 

function rdsPrice(priceElement) { 
  let dbengine=priceElement["engine"];
  let dbinstance=[priceElement["instancetype"]];
  let dbsize=[priceElement["size"]];
  let dbinstanceType=dbinstance+"."+dbsize;
  const dbData={
    "dbEngine": dbengine,
    "instanceType": dbinstanceType, 
  };
  return new Promise((resolve, reject) => {
    searchPrice(dbData)
    .then(function (response) {
      resolve(response.data[0].priceUSD);
    })
    .catch(function (error) {
      console.error("못갔어용:", error);
      reject(error);
    });
  });
}


function fetchEngineData(dbengine, instanceType, setData, setLoading, setError){ 
  const dbData={
    "engine": dbengine, 
  };
  return new Promise((resolve, reject) => {setLoading(true);
    searchDb(dbData)
    .then(function (response) {
      setData(response.data);
      
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


    const transformedData = transformData(response.data);
    if (["PostgreSQL", "MySQL", "SQLServer", "AuroraPostgresMySQL", "MariaDB", "Oracle"].includes(dbengine)) {
      resolve(transformedData);
    }

    })

    .catch(function (error) {
      console.error("Error occurred:", error);
      setError(error);
      setLoading(false);
      reject(error);
    });
  });
}


const SelectRdsToggle = ({ diagram, uniquekey, finalToggleValue, setFinalToggleValue, resourceKey}) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);

  const [uniqueKey,setUniqueKey] = useState(null);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [toggle4Options, setToggle4Options] = useState([]);
  const [price ,setPrice] = useState(null);
  const [select, setSelect] = useState(["engine", "instancetype","size"]);

  const [dbOption, setDbOption] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleDeletKey = (uniqueKey) => {
    setFinalToggleValue((prev) => {
      const newState = {...prev};
      delete newState[uniqueKey];
      return newState;
    });
  }

  diagram.addDiagramListener("SelectionDeleting", function (e) {
      e.subject.each(function (part) {
        handleDeletKey(part.key);
      });
  });

  

  useEffect(() => {
    if (toggle1Value) {
      async function fetchOptions() {
        try {
          const options = await fetchEngineData(toggle1Value, null, setData, setLoading, setError);
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
    }
  }, [toggle1Value]);
  
 
  useEffect(() => {
    setUniqueKey(uniquekey);
    setToggle1Value(null);
    setToggle2Value(null);
    setToggle3Value(null);
  },[uniquekey]);
  
  
  useEffect(() => {
    if (toggle2Value) {
    setToggle3Options(dbOption[toggle2Value]);
    setToggle3Value(null);
    }
  }, [toggle2Value]);


  useEffect(() => {
    if (
        finalToggleValue[uniqueKey] &&
        Object.keys(finalToggleValue[uniqueKey]).length === 4  
      ) {
        setSelect([
          Object.values(finalToggleValue[uniqueKey]["engine"]),
          Object.values(finalToggleValue[uniqueKey]["instancetype"]),
          Object.values(finalToggleValue[uniqueKey]["size"]),
        ]);
        Object.values(finalToggleValue[uniqueKey]["engine"]);
        setPrice(finalToggleValue[uniqueKey]["cost"]);
      } else {
        setPrice("Loading");
        setSelect(["engine", "instancetype","size"]);
      }
  }, [finalToggleValue, uniqueKey]);

  useEffect(() => {
      const fetchPrice = async () => {
          if (finalToggleValue[uniqueKey] 
            && Object.keys(finalToggleValue[uniqueKey]).length == 4
            && !(Object.values(finalToggleValue[uniqueKey]["size"]).includes("s"))
            && (Object.values(finalToggleValue[uniqueKey]["cost"]).includes("L"))
           ) {
              try {
                const calculatedPrice = await rdsPrice(finalToggleValue[uniqueKey]);
                setFinalToggleValue(prev => {
                  if (!prev[uniqueKey] ) {
                    return prev;
                  }
                  const updatedEntry = {...prev[uniqueKey]};
                  updatedEntry.cost = calculatedPrice;
                  return { ...prev, [uniqueKey]: updatedEntry};
                });
                setPrice(calculatedPrice)
                setSelect([                 
                  Object.values(finalToggleValue[uniqueKey]["engine"]),
                  Object.values(finalToggleValue[uniqueKey]["instancetype"]),
                  Object.values(finalToggleValue[uniqueKey]["size"]),
                ]);
              } catch (err) {
                console.error("Error fetching platform data:", err);
              }
          }   

          else if (       
            finalToggleValue
            && finalToggleValue[uniqueKey]
            && Object.keys(finalToggleValue[uniqueKey]).length === 4
          ) {
            setSelect([                 
              Object.values(finalToggleValue[uniqueKey]["engine"]),
              Object.values(finalToggleValue[uniqueKey]["instancetype"]),
              Object.values(finalToggleValue[uniqueKey]["size"]),
            ]);                          
            setToggle1Value(Object.values(finalToggleValue[uniqueKey]["engine"]));
            setPrice(finalToggleValue[uniqueKey]["cost"]);
          } else {
            
            setPrice("Loading");
            setSelect(["engine", "instancetype","size"]);
          }
        
        }
        fetchPrice();
  
  }, [finalToggleValue, uniqueKey]);


  const handleChange = (index, event) => {
    const newValue = event.target.value;

    if (index === 0) {
      setToggle1Value(newValue);
      
      setFinalToggleValue(prev => {
        const updatedEntry = {
          engine: "Engine",
          instancetype: "InstanceType",
          size: "Size",
          cost: "Loading"
        };
        updatedEntry.engine = newValue;
        updatedEntry.cost = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
    } else if (index === 1) {
      setToggle2Value(newValue);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instancetype = newValue;
        updatedEntry.size = "size";
        updatedEntry.cost = "Loading"
        return { ...prev, [uniqueKey]: updatedEntry };
      });
      setToggle3Value(null);
    } else if (index === 2) {
      setToggle3Value(newValue);
      setToggle4Options(onTypeOptions);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.size = newValue;
        updatedEntry.cost = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
    } 
  };
  let label = ["Engine", "Instance Type","Size"];

  const renderToggle = (index, label, Select, value, options) => {
    return (
      <div className="toggle-wrapper">
        <label>{label}</label>
        <select
            className="custom-select"
            value={value || ""}
            onChange={(e) => handleChange(index, e)}
        >
            <option value="">{Select}</option>
            {options.map((option, idx) => (
                <option key={idx}>
                    {option}
                </option>
            ))}
        </select>
      </div>
    );
};

  // const renderToggle = (index, label, Select, value, options) => {
  //   return (
  //     <div className="toggle-wrapper">
  //     <label>{label}</label>
  //     <select
  //       value={value || ""}
  //       onChange={(e) => handleChange(index, e)}
  //     >
  //       <option value="" >{Select}</option>
  //     {options.map((option, idx) => (
  //       <option key={idx}>
  //         {option}
  //       </option>
  //     ))}
  //   </select>
  //   </div>
  //     );
  //   };

  const Item = ({price}) =>{
    

    if(!price || price.length < 1) {
      return null;
    }
    
    // return (
    //   <div>
    //     {price+"USD / Hour"}
    //   </div>
    // );

    // 되면 짱

    if(!price || price!="Loading") {
      const formattedPrice = Number(price).toFixed(3);

      return (
        <div>
          ${formattedPrice+"/ Hour"}
        </div>
      );
    }
    
  }
  return (
    <ResourceComponent>
      <ToggleComponent>
      <ResourceKey>{resourceKey} 비용산정</ResourceKey>

        <div className="toggle">
        {renderToggle(0,label[0], select[0], toggle1Value, baseOptions)}
        {renderToggle(1,label[1],  select[1], toggle2Value, toggle2Options)}
        {renderToggle(2,label[2], select[2], toggle3Value, toggle3Options)}
              
              <div className="price">
                <Item price={price} />
              </div>
            </div>
      </ToggleComponent>
      
    </ResourceComponent>
  );
};

export default React.memo(SelectRdsToggle);
const ResourceKey = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
  font-family: "Noto Sans KR", sans-serif;
`;
const ResourceComponent = styled.div`
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

const ToggleComponent = styled.div`
  padding: 3px 0 3px 5px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;  
  padding: 10px;
`;