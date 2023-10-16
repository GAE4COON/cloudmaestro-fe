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
    //setToggle4Value(null);

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




  useEffect(() => {

    if (
        finalToggleValue[uniqueKey] &&
        Object.keys(finalToggleValue[uniqueKey]).length == 5
      ) {

        console.log(uniqueKey, "comdone" ); // 이 부분 추가
        setSelect([
          Object.values(finalToggleValue[uniqueKey]["platform"]),
          Object.values(finalToggleValue[uniqueKey]["instanceType"]),
          Object.values(finalToggleValue[uniqueKey]["instanceSize"]),
          Object.values(finalToggleValue[uniqueKey]["billingOption"]),
        ]);
        setToggle1Value(finalToggleValue[uniqueKey]["platform"]);
        setToggle2Value(finalToggleValue[uniqueKey]["instanceType"]);
        //setToggle3Value(finalToggleValue[uniqueKey]["instanceSize"]);
        setPrice(finalToggleValue[uniqueKey]["price"]);
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
            && Object.keys(finalToggleValue[uniqueKey]).length == 5
            && !(Object.values(finalToggleValue[uniqueKey]["instanceSize"]).includes("S"))  //여기 value를 수정하면 될듯
            && !(Object.values(finalToggleValue[uniqueKey]["billingOption"]).includes("B"))
            && Object.values(finalToggleValue[uniqueKey]["price"]).includes("L")
            ) {

              console.log("instance",Object.values(finalToggleValue[uniqueKey]["instanceSize"]));

              try {
                const calculatedPrice = await ec2Price(finalToggleValue[uniqueKey]);
                console.log("calcul", calculatedPrice);
                setPrice(calculatedPrice);

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
                
                
                setSelect([
                  Object.values(finalToggleValue[uniqueKey]["platform"]),
                  Object.values(finalToggleValue[uniqueKey]["instanceType"]),
                  Object.values(finalToggleValue[uniqueKey]["instanceSize"]),
                  Object.values(finalToggleValue[uniqueKey]["billingOption"]),
                ]);
              } catch (err) {
                console.error("Error fetching platform data:", err);
              }
          } 

          // else if (

          //   finalToggleValue[uniqueKey] &&
          //   Object.keys(finalToggleValue[uniqueKey]).length == 5
          // ) {
    
          //   console.log("setselect 전 finaltoggle입니당",finalToggleValue[uniqueKey]);
          //   setSelect([
          //     Object.values(finalToggleValue[uniqueKey]["platform"]),
          //     Object.values(finalToggleValue[uniqueKey]["instanceType"]),
          //     Object.values(finalToggleValue[uniqueKey]["instanceSize"]),
          //     Object.values(finalToggleValue[uniqueKey]["billingOption"]),
    
          //   ]);
          //   setToggle1Value(Object.values(finalToggleValue[uniqueKey]["platform"]));
          //   setToggle2Value(Object.values(finalToggleValue[uniqueKey]["instanceType"]));
          //   setPrice(finalToggleValue[uniqueKey]["price"]);
          // } else {
          //   setPrice("Loading");
          //   setSelect(["Platform", "Instance Type","Size", "Billing Option"]);
          // }
        
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
        // const updated =  ["Platform", "Instance Type","Size", "Billing Option"];
        // updated[index] = newValue;
        // updated[4] ="Loading";
        
        // return { ...prev, [uniqueKey]: updated };
        const updatedEntry = {
          platform: "Platform",
          instanceType: "InstanceType",
          instanceSize: "Size",
          billingOption:"BillingOption",
          price: "Loading"
        };
        updatedEntry.platform = newValue;
        updatedEntry.price = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
 
    } else if (index === 1) {
      setToggle2Value(newValue);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instanceType = newValue;
        updatedEntry.instanceSize = "Size";
        updatedEntry.billingOption = "BilliongOption";
        updatedEntry.price = "Loading"
        return { ...prev, [uniqueKey]: updatedEntry };
        

        // const updated = [...prev[uniqueKey]];
        // updated[index] = newValue;
        // updated[2] = "Size";
        // updated[3] = "Billing Option";
        // updated[4] ="Loading";
        // return { ...prev, [uniqueKey]: updated };
      });
      setToggle3Value(null);
      setToggle4Value(null);
      console.log("2번째 성공 저장");

    } else if (index === 2) {
      setToggle3Value(newValue);
      setToggle4Options(onTypeOptions);
      setFinalToggleValue(prev => {
        // const updated = [...prev[uniqueKey]];
        // updated[index] = newValue;
        // updated[3] ="Billing Option";
        // updated[4] ="Loading";
        // console.log("Updated finalToggleValue:", updated); // 이 부분 추가
        // return { ...prev, [uniqueKey]: updated };
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instanceSize = newValue;
        updatedEntry.billingOption = "BillingOption";
        updatedEntry.price = "Loading"
        return { ...prev, [uniqueKey]: updatedEntry };


      });
      setToggle4Value(null);

    } else if (index === 3) {
      setToggle4Value(newValue);
      setFinalToggleValue(prev => {
        // const updated = [...prev[uniqueKey]];
        // updated[index] = newValue;
        // updated[4] ="Loading";
        // return { ...prev, [uniqueKey]: updated };
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.billingOption = newValue;
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
    //console.log("price로 들어가나,",price);
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
        {renderToggle(3, select[3], toggle4Value, toggle4Options)}


      
        <div className="price">
          <Item price={price} />
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(SelectToggle);