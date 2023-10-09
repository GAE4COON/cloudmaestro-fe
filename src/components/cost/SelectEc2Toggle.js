import React, { useState, useEffect } from "react";
import "../../styles/SelectToggle.css";
import * as go from "gojs";
import {ec2Price, fetchPlatformData} from "./sendPrice.js";
import { isDOMComponent } from "react-dom/test-utils";
import { upload } from "@testing-library/user-event/dist/upload";

const baseOptions = [
  { value: "T1", label: "linux" },
  { value: "T2", label: "windows" },
];

const onTypeOptions = [
  { value: "T3.1", label: "on-demand" }
];




const SelectToggle = ({ diagram, uniquekey, finalToggleValue, setFinalToggleValue }) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);
  const [toggle4Value, setToggle4Value] = useState(null);
 
  const [uniqueKey,setUniqueKey] = useState(null);
  const [newvalue,setnewValue] = useState(null);
  const [select, setSelect] = useState(["Platform", "Instance Type","Size", "Billing Option"]);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [toggle4Options, setToggle4Options] = useState([]);
  const [price ,setPrice] = useState(null);

  // 통신 상태 확인 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);



  // delete with node and data 
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
    setUniqueKey(uniquekey);
    setToggle1Value(null);
    setToggle3Value(null);
    setToggle4Value(null);

  },[uniquekey]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        // toggle2Value가 없으면 함수를 실행하지 않습니다.
        if ( !toggle2Value) return;
  
        const options = await fetchPlatformData(toggle1Value, toggle2Value, setData, setLoading, setError);
        if (!options || options.length === 0) {
          // options가 없거나 빈 배열일 경우에는 추가 처리를 해주는 것이 좋습니다.
          console.warn("Received empty options.");
          return;
        }
        if(toggle2Value){
          setToggle3Value(null);
        }
  
        setToggle3Options(options);
        setToggle3Value(null);
      } catch (err) {
        console.error("Error fetching instance form data:", err);
    
      }
    }
  
    fetchOptions();
  }, [toggle2Value]);
  



  

  // 다시 불러와도 가격 안 사라지게 
  useEffect(() => {

    
    if (
        finalToggleValue[uniqueKey] &&
        finalToggleValue[uniqueKey].length === 5
      ) {

        console.log(uniqueKey, "comdone" ); // 이 부분 추가
        setSelect([
          finalToggleValue[uniqueKey][0],
          finalToggleValue[uniqueKey][1],
          finalToggleValue[uniqueKey][2],
          finalToggleValue[uniqueKey][3],
        ]);
        setToggle1Value(finalToggleValue[uniqueKey][0]);
        setToggle2Value(finalToggleValue[uniqueKey][1]);
        setPrice(finalToggleValue[uniqueKey][4]);
      } else {
        setPrice("Loading");
        setSelect(["Platform", "Instance Type","Size", "Billing Option"]);
      }



  }, [finalToggleValue, uniqueKey]);


  // 마지막 토글을 선택할때만 값이 불러와지게 수정 
  useEffect(() => {
    console.log("hello", finalToggleValue[uniqueKey]);
      const fetchPrice = async () => {
          if (finalToggleValue[uniqueKey] 
            && finalToggleValue[uniqueKey].length == 5
            && finalToggleValue[uniqueKey][2] !== "Size"
            && finalToggleValue[uniqueKey][3] !== "Billing Option"
            && finalToggleValue[uniqueKey][4] === "Loading") {

              try {
                const calculatedPrice = await ec2Price(finalToggleValue[uniqueKey]);
                console.log("calcul", calculatedPrice);

                setFinalToggleValue(prev => {
                  const updated = [...prev[uniqueKey]];
                  updated[4] = calculatedPrice;
                  return { ...prev, [uniqueKey]: updated };
                });
                setPrice(calculatedPrice);
              } catch (err) {
                console.error("Error fetching platform data:", err);
              }
          } 

          else if (
            finalToggleValue[uniqueKey] &&
            finalToggleValue[uniqueKey].length === 5
          ) {
    
            console.log(uniqueKey, "comdone" ); // 이 부분 추가
            setSelect([
              finalToggleValue[uniqueKey][0],
              finalToggleValue[uniqueKey][1],
              finalToggleValue[uniqueKey][2],
              finalToggleValue[uniqueKey][3],
            ]);
            setToggle1Value(finalToggleValue[uniqueKey][0]);
            setToggle2Value(finalToggleValue[uniqueKey][1]);
            setPrice(finalToggleValue[uniqueKey][4]);
          } else {
            setPrice("Loading");
            setSelect(["Platform", "Instance Type","Size", "Billing Option"]);
          }
        
        }
        fetchPrice();
  
  }, [finalToggleValue, uniqueKey]);
  
  
// 토글 선택할 때마다 값 변하는 부분 
  const handleChange = (index, event) => {
    const newValue = event.target.value;
    console.log(`Toggle ${index} changed to: ${newValue}`); // 이 부분 추가
    if (index === 0) {
      setToggle1Value(newValue);
     
      setFinalToggleValue(prev => {
        const updated =  ["Platform", "Instance Type","Size", "Billing Option"];
        updated[index] = newValue;
        updated[4] ="Loading";
        
        return { ...prev, [uniqueKey]: updated };
      });
 
    } else if (index === 1) {
      setToggle2Value(newValue);
      setFinalToggleValue(prev => {
        const updated = [...prev[uniqueKey]];
        updated[index] = newValue;
        updated[2] = "Size";
        updated[3] = "Billing Option";
        updated[4] ="Loading";
        return { ...prev, [uniqueKey]: updated };
      });
      setToggle3Value(null);
      setToggle4Value(null);

    } else if (index === 2) {
      setToggle3Value(newValue);
      setToggle4Options(onTypeOptions);
      setFinalToggleValue(prev => {
        const updated = [...prev[uniqueKey]];
        updated[index] = newValue;
        updated[3] ="Billing Option";
        updated[4] ="Loading";
        console.log("Updated finalToggleValue:", updated); // 이 부분 추가
        return { ...prev, [uniqueKey]: updated };
      });
      setToggle4Value(null);

    } else if (index === 3) {
      setToggle4Value(newValue);
      setFinalToggleValue(prev => {
        const updated = [...prev[uniqueKey]];
        updated[index] = newValue;
        updated[4] ="Loading";
        return { ...prev, [uniqueKey]: updated };
      });
    }
};


  const renderToggle = (index, Select, value, options) => {
  
    return (
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
  };
  

  // 가격 표시 

  const Item = ({price}) =>{
    if(!price  || price == "Loading" ) {
      return "Loading";
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
        {renderToggle(0, select[0], toggle1Value, baseOptions)}
        {renderToggle(1, select[1], toggle2Value, toggle2Options)}
        {renderToggle(2, select[2], toggle3Value, toggle3Options)}
        {renderToggle(3, select[3], toggle4Value, toggle4Options)}


      
        <div className="price">
          <Item price={price} />
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(SelectToggle);




