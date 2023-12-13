import React, { useState, useEffect } from "react";
import '../../styles/SelectWafToggle.css';
import { Input } from 'antd';
import styled from "styled-components";

const SelectWafToggle = ({diagram, uniquekey, finalToggleValue, setFinalToggleValue}) => {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState(""); 
    const [wafCost, setWafCost] = useState("");
   
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
    
    const calculateCost = (value, name) => {       
        let requestCost = 0;
        let ruleCost=0;
        if(name=="rule"){
            if(finalToggleValue[uniquekey].request){           
                requestCost = finalToggleValue[uniquekey].request  * 0.6;
            }
            ruleCost = value;
        }
        else{
            if(finalToggleValue[uniquekey].rule){
                ruleCost = finalToggleValue[uniquekey].rule
            }
            requestCost = value * 0.6;  //이제 rule을 가져오자
        }
        let cost = Number(ruleCost) + Number(requestCost) + 5;
        console.log("Cost: ",Math.trunc(cost * 100) / 100);
        return Math.trunc(cost * 100) / 100;
    }

    useEffect(() => {        
        if (!finalToggleValue[uniquekey]) {
            setFinalToggleValue(prev => ({
                ...prev,
                [uniquekey]: {
                    rule: "", 
                    request: "",
                    cost: 0
                }
            }));
        }
        console.log("final: ",finalToggleValue);
        if ( finalToggleValue[uniquekey]) {
            setText1(finalToggleValue[uniquekey].rule);
            setText2(finalToggleValue[uniquekey].request);
            setWafCost(finalToggleValue[uniquekey].cost);
        } else {
            setText1("");
            setText2("");
            setWafCost(0);
        }
    }, [finalToggleValue, uniquekey]);


    const onChange1 = (e) => {
        const name="rule";
        const value = e.target.value;
        setText1(value);
        const cost = calculateCost(Number(value),name);
        setFinalToggleValue(prev => ({
            ...prev,
            [uniquekey]: {
                ...prev[uniquekey],
                rule: value,
                cost: cost
            }
        }));
    }

    const onChange2 = (e) => {
        const name = "request";
        const value = e.target.value;
        setText2(value);
        const cost = calculateCost(Number(value),name);
        setFinalToggleValue(prev => ({
            ...prev,
            [uniquekey]: {
                ...prev[uniquekey],
                request: value,
                cost: cost
            }
        }));
    }

    return (
        <ResourceComponent>
            <S3Input 
                type="text"
                onChange={onChange1}
                value={text1}
                placeholder="Rule"
            />
            <S3Input 
                type="text"
                onChange={onChange2}
                value={text2}
                placeholder="Request"
            />
            <S3Cost>${wafCost}</S3Cost><p>/Mo</p>

        </ResourceComponent>
    )

};

export default SelectWafToggle;
const S3Input = styled.input`

    width: 100px;
    border-radius: 3px;
    border: 2px solid #999; 
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    margin: 3px;
    `;
const S3Cost = styled.p`
    margin-left: 10px;
    color: #5a842d;
    font-weight: bold;
`

const ResourceComponent = styled.div`
  z-index: 100;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;  
padding-right: 10px;
padding-left: 10px;
font-family: 'Noto Sans KR', sans-serif;
`;