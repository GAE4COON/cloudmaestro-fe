import React, { useState, useEffect } from "react";
import "../../styles/SelectToggle.css";
import axios from 'axios';

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
 

function rdsPrice(priceElement) {           //여기서 bad request가 뜬다
  console.log("price까지는 오는 거니??",priceElement);
  let dbengine=priceElement["dbEngine"];
  let dbinstance=[priceElement["instanceType"]];
  let dbsize=[priceElement["instanceSize"]]; 
  console.log("engine: "+dbengine+"instance: "+dbinstance+"size: "+dbsize);
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/v1/pricing-api/rds',
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
      resolve(response.data[0].priceUSD);
    })
    .catch(function (error) {
      console.error("못갔어용:", error);
      reject(error);
    });
  });
}


function fetchEngineData(dbengine, instanceType, setData, setLoading, setError){  //여기도 문제가 있는 듯 함
  console.log("db에 접근 엔진:",dbengine);
  return new Promise((resolve, reject) => {setLoading(true);
    axios({
      url: '/api/v1/db-api/rds',
      method: 'post',
      data: {
        "engine": dbengine,
        // "instanceType":"hello"
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      setData(response.data);
      console.log(response.data);
      
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

    if(dbengine == "PostgreSQL") {
        const transformedData=transformData(response.data);
        resolve(transformedData);
    }
    
    if(dbengine == "MySQL") {
        const transformedData=transformData(response.data);
        resolve(transformedData);
    }

    if (dbengine == "SQLServer") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }

    if (dbengine == "AuroraPostgresMySQL") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }
    
    if (dbengine == "MariaDB") {
        const transformedData=transformData(response.data);
        resolve(transformedData);    }
    
    if (dbengine == "Oracle") {
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


const SelectRdsToggle = ({ diagram, uniquekey, finalToggleValue, setFinalToggleValue}) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);

  const [uniqueKey,setUniqueKey] = useState(null);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [toggle4Options, setToggle4Options] = useState([]);
  const [price ,setPrice] = useState(null);
  const [select, setSelect] = useState(["dbEngine", "InstanceType","Size"]);

  const [dbOption, setDbOption] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  //삭제시 다이어그램에 있는 노드 데이터 삭제
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

  

  //첫번째 토글이 set 되었을때 db에 인스턴스와 size 질의
  useEffect(() => {
    if (toggle1Value) {
      async function fetchOptions() {
        try {
          console.log("엔진",toggle1Value);
          const options = await fetchEngineData(toggle1Value, null, setData, setLoading, setError);
          console.log("options",options);
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
  
  //선택한 노드의 key 저장
  useEffect(() => {
    setUniqueKey(uniquekey);
    setToggle1Value(null);
    setToggle2Value(null);
    setToggle3Value(null);
  },[uniquekey]);
  
  
  //toggle2 즉 size를 set해준다
  useEffect(() => {
    if (toggle2Value) {
    setToggle3Options(dbOption[toggle2Value]);
    setToggle3Value(null);
    }
  }, [toggle2Value]);


  useEffect(() => {          //이미 유니크키가 세팅이 완료된경우일듯
    if (
        finalToggleValue[uniqueKey] &&
        Object.keys(finalToggleValue[uniqueKey]).length === 4  
      ) {
        console.log("setselect 전 finaltoggle입니당",Object.values(finalToggleValue[uniqueKey]["dbEngine"]));
        setSelect([
          Object.values(finalToggleValue[uniqueKey]["dbEngine"]),
          Object.values(finalToggleValue[uniqueKey]["instanceType"]),
          Object.values(finalToggleValue[uniqueKey]["instanceSize"]),
        ]);
        Object.values(finalToggleValue[uniqueKey]["dbEngine"]);
        //setToggle2Value(finalToggleValue[uniqueKey][1]);  //이걸 없애면 뜨는데
        setPrice(finalToggleValue[uniqueKey]["price"]);
      } else {
        setPrice("Loading");
        setSelect(["dbEngine", "InstanceType","Size"]);
      }
  }, [finalToggleValue, uniqueKey]);

  useEffect(() => {
    console.log("hello", finalToggleValue[uniqueKey]);
      const fetchPrice = async () => {
          if (finalToggleValue[uniqueKey] 
            && Object.keys(finalToggleValue[uniqueKey]).length == 4
            && !(Object.values(finalToggleValue[uniqueKey]["instanceSize"]).includes("Size"))  //여기 value를 수정하면 될듯
            && (Object.values(finalToggleValue[uniqueKey]["price"]).includes("L"))
           ) {
              try {
                console.log(finalToggleValue[uniqueKey], "가격인데...?? 이까지 오나??" ); // 이 부분 추가

                const calculatedPrice = await rdsPrice(finalToggleValue[uniqueKey]);
                console.log("calcul", calculatedPrice);

                setFinalToggleValue(prev => {
                  if (!prev[uniqueKey] ) {
                    return prev; // 이전 상태를 반환하거나 초기 상태를 설정할 수 있습니다.
                  }
                  console.log("이까지 오니");
                  // const updated = [...prev[uniqueKey]];
                  // updated[3] = calculatedPrice;
                  // return { ...prev, [uniqueKey]: updated };
                  const updatedEntry = {...prev[uniqueKey]};
                  updatedEntry.price = calculatedPrice;
                  return { ...prev, [uniqueKey]: updatedEntry};
                });
                setPrice(calculatedPrice); //여기서 값이 잘 안들어 가는듯??
                setSelect([                 
                  Object.values(finalToggleValue[uniqueKey]["dbEngine"]),
                  Object.values(finalToggleValue[uniqueKey]["instanceType"]),
                  Object.values(finalToggleValue[uniqueKey]["instanceSize"]),
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
            console.log("setselect 전 finaltoggle입니당",finalToggleValue[uniqueKey]);
            setSelect([                 
              Object.values(finalToggleValue[uniqueKey]["dbEngine"]),
              Object.values(finalToggleValue[uniqueKey]["instanceType"]),
              Object.values(finalToggleValue[uniqueKey]["instanceSize"]),
            ]);                          
            setToggle1Value(Object.values(finalToggleValue[uniqueKey]["dbEngine"]));
            //setToggle2Value(finalToggleValue[uniqueKey][1]);
            setPrice(finalToggleValue[uniqueKey]["price"]);
          } else {
            
            setPrice("Loading");
            setSelect(["dbEngine", "InstanceType","Size"]);
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
          dbEngine: "Engine",
          instanceType: "InstanceType",
          instanceSize: "Size",
          price: "Loading"
        };
        updatedEntry.dbEngine = newValue;
        updatedEntry.price = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
        //const updated =  ["Engine","InstanceType","Size"]; //여기서 문제가 말생하네...?? 왜 발생하지
        //updated[index] = newValue;
        //updated[3] ="Loading";
        //return { ...prev, [uniqueKey]: updated };
      });
      console.log("1번 성공저장");
    } else if (index === 1) {
      console.log("전");
      setToggle2Value(newValue);
      setFinalToggleValue(prev => {
        // const updated = [...prev[uniqueKey]];
        // updated[index] = newValue;
        // updated[2] = "Size";
        // updated[3] ="Loading";
        // return { ...prev, [uniqueKey]: updated };
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instanceType = newValue;
        updatedEntry.instanceSize = "Size";
        updatedEntry.price = "Loading"
        return { ...prev, [uniqueKey]: updatedEntry };
      });
      setToggle3Value(null);
      console.log("2번째 성공 저장");
    } else if (index === 2) {
      console.log("세번째까지 오네엽")
      setToggle3Value(newValue);
      setToggle4Options(onTypeOptions);
      setFinalToggleValue(prev => {
        // const updated = [...prev[uniqueKey]];
        // updated[index] = newValue;
        // updated[3] ="Loading";
        // console.log("Updated finalToggleValue:", updated); // 이 부분 추가
        // return { ...prev, [uniqueKey]: updated };
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instanceSize = newValue;
        updatedEntry.price = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
    } 
  };


  console.log("FinalToggle",finalToggleValue);

  const renderToggle = (index, Select, value, options) => {
    return (
      <select
        value={value || ""}
        onChange={(e) => handleChange(index, e)}
      >
        <option value="" disabled>{Select}</option>
      {options.map((option, idx) => (
        <option key={idx}>
          {option}
        </option>
      ))}
    </select>
      );
    };

  const Item = ({price}) =>{

    if(!price || price.length < 1) {
      return null;
    }
    
    return (
      <div>
        {price+"USD / Hour"}
      </div>
    );
    
  }
  return (
    <div className ="ec2">
      <div className="toggle-component">
        {renderToggle(0, select[0], toggle1Value, baseOptions)}
        {renderToggle(1, select[1], toggle2Value, toggle2Options)}
        {renderToggle(2, select[2], toggle3Value, toggle3Options)}
        

        <div className="price">
          <Item price={price} />
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(SelectRdsToggle);