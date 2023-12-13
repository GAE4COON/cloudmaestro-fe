import React, { useState, useEffect } from "react";
import "../../styles/SelectToggle.css";
import axios from 'axios';
import { searchEc2 } from "../../apis/price.js";
import styled from "styled-components";


const baseOptions = [
  "linux",
  "windows"
  ];

const onTypeOptions = [
  { value: "T3.1", label: "on-demand" }
];
 

function fetchEngineData(platform, instanceType, setData, setLoading, setError) {
  console.log("ec2에 접근 엔진:", platform);
  const dbData ={
    "platform":platform
  }


  return new Promise((resolve, reject) => {
    setLoading(true);
    searchEc2(dbData)
    .then(function (response) {
      setData(response.data);
      console.log(response.data);
      const ec2data = response.data; 
      console.log("전체 데이터가 들어온다.", ec2data);
      resolve(ec2data); // <-- resolve with data
    })
    .catch(function (error) {
      console.error("Error occurred:", error);
      setError(error);
      setLoading(false);
      reject(error);
    });
  });
}

const SelectEc22Toggle = ({ diagram, uniquekey, finalToggleValue, setFinalToggleValue, resourceKey}) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);

  const [uniqueKey,setUniqueKey] = useState(null);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [price ,setPrice] = useState(null);
  const [select, setSelect] = useState(["Platform", "Instance Type","Size"]);
  const [element, setElement] = useState(null);

  const [ec2Option, setEc2Option] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  let label = ["Platform", "Instance Type","Size"];

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
          console.log("Platform",toggle1Value);
          const options = await fetchEngineData(toggle1Value, null, setData, setLoading, setError);
          console.log("options",options["details"]["instanceType"]);
          setToggle2Options(options["details"]["instanceType"]);
          setEc2Option(options);
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

    //toggle2 즉 size를 set해준다
  useEffect(() => {
    if (toggle2Value) {
      //console.log("instanceType",toggle2Value);
    setToggle3Options(ec2Option["details"][toggle2Value]);
    setToggle3Value(null);
    }
  }, [toggle2Value]);


    //toggle3 즉 price를 set해준다
  useEffect(() => {
    if (toggle3Value) {
      let price = toggle2Value + "." + toggle3Value;
      console.log("price", price, ec2Option["insertEC2EntityDetails"][price]);
      if(finalToggleValue[uniqueKey] 
        && Object.keys(finalToggleValue[uniqueKey]).length == 4
        && !(Object.values(finalToggleValue[uniqueKey]["size"]).includes("s"))  //여기 value를 수정하면 될듯
        && (Object.values(finalToggleValue[uniqueKey]["cost"]).includes("L"))
       )
      {
        let ec2price = ec2Option["insertEC2EntityDetails"][price][4].split(' ')[0];
        ec2price = ec2price.slice(1);
        setFinalToggleValue(prev => {
          if (!prev[uniqueKey] ) {
            return prev; // 이전 상태를 반환하거나 초기 상태를 설정할 수 있습니다.
          }
          console.log("이까지 오니");
          const updatedEntry = {...prev[uniqueKey]};
          updatedEntry.cost = ec2price;
          return { ...prev, [uniqueKey]: updatedEntry};
        });
        //setPrice(calculatedPrice); //여기서 값이 잘 안들어 가는듯??
       
        setPrice(ec2price);
        setElement(ec2Option["insertEC2EntityDetails"][price]);
        

      }
     
    }
  }, [toggle3Value]);
  
  //선택한 노드의 key 저장
  useEffect(() => {
    setUniqueKey(uniquekey);
    setToggle1Value(null);
    setToggle2Value(null);
    setToggle3Value(null);
  },[uniquekey]);
  

//이미 유니크키가 세팅이 완료된경우일듯
  useEffect(() => {          
    if (
        finalToggleValue[uniqueKey] &&
        Object.keys(finalToggleValue[uniqueKey]).length === 4  
      ) {
        console.log("setselect 전 finaltoggle입니당",Object.values(finalToggleValue[uniqueKey]["platform"]));
        setSelect([
          Object.values(finalToggleValue[uniqueKey]["platform"]),
          Object.values(finalToggleValue[uniqueKey]["instancetype"]),
          Object.values(finalToggleValue[uniqueKey]["size"]),
        ]);
        Object.values(finalToggleValue[uniqueKey]["platform"]);
        //setToggle2Value(finalToggleValue[uniqueKey][1]);  //이걸 없애면 뜨는데
        setPrice(finalToggleValue[uniqueKey]["cost"]);
      } else {
        setPrice("Loading");
        setSelect(["platform", "Instance Type", "size"]);
      }

  }, [finalToggleValue, uniqueKey]);



  const handleChange = (index, event) => {
    const newValue = event.target.value;

    if (index === 0) {
      setToggle1Value(newValue);
      
      setFinalToggleValue(prev => {
        const updatedEntry = {
          platform: "Platform",
          instancetype: "Instance Type",
          size: "Size",
          cost: "Loading"
        };
        updatedEntry.platform = newValue;
        updatedEntry.cost = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
      //console.log("1번 성공저장");
    } else if (index === 1) {
      //console.log("전");
      setToggle2Value(newValue);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instancetype = newValue;
        updatedEntry.size = "Size";
        updatedEntry.cost = "Loading"
        return { ...prev, [uniqueKey]: updatedEntry };
      });
      setToggle3Value(null);
      //onsole.log("2번째 성공 저장");
    } else if (index === 2) {
      //console.log("세번째까지 오네엽")
      setToggle3Value(newValue);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.size = newValue;
        updatedEntry.cost = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
    } 
  };


  console.log("FinalToggle",finalToggleValue);

  const renderToggle = (index, label, Select, value, options) => {
    return (
      <div className="toggle-wrapper">
        <label>{label}</label>
        <select
            className="custom-select"
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
      </div>
    );
};



  const Item = ({price}) =>{
    if(!price || price.length<1) {
      return null;
    }
    if (price.length ==  5) {
      console.log("price", price);
      // JSX로 표시하려면 다음과 같이 수정할 수 있습니다.
      return (
        <div>
          <div>
            {price[0]} 
          </div>
          <div>
            {price[1]}
          </div>
          <div>
            {price[2]}
          </div>
          <div>
            {price[3]}
          </div>
          <div>
            On Demand
          </div>
        </div>
      );
    }

    if(!price || price!="Loading") {
      return (
        <div>
          ${price}
        </div>
      );
    }
    
    
  }


  return (
    <ResourceComponent>
        <ToggleComponent>
          <ResourceKey>{resourceKey} 비용산정</ResourceKey>
            <div className="toggle">
              {renderToggle(0, label[0], select[0], toggle1Value, baseOptions)}
              {renderToggle(1,  label[1], select[1], toggle2Value, toggle2Options)}
              {renderToggle(2, label[2], select[2], toggle3Value, toggle3Options)}
              
              <div className="price">
                <Item price={price} />
              </div>
            </div>
            <div className="element">
              <Item price={element} />
            </div>
        </ToggleComponent>
    </ResourceComponent>
  );
};
const ResourceKey = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
  font-family: "Noto Sans KR", sans-serif;
`;
const ResourceComponent = styled.div`
  z-index: 145;
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
export default React.memo(SelectEc22Toggle);