import React, { useState, useEffect } from "react";
import '../../styles/SelectS3Toggle.css';
import styled from "styled-components";

const SeclectS3Toggle = ({diagram, uniquekey, finalToggleValue, setFinalToggleValue}) => {
    const [text, setText] = useState("");
    const [s3Cost, setS3Cost] = useState("");

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
    
    const calculateCost = (gb) => {
        let cost = 0;
        if (gb <= 50000) {
            cost = gb * 0.025;
        } else if (gb <= 500000) { 
            cost = (50000 * 0.025) + ((gb - 50000) * 0.024);
        } else {
            cost = (50000 * 0.025) + (450000 * 0.024) + ((gb - 500000) * 0.023);
        }
        return Math.trunc(cost * 100) / 100;
    }

    useEffect(() => {           //여기 문제인 듯 함
        //console.log("final: ",finalToggleValue);
        if ( finalToggleValue[uniquekey]) {
            setText(finalToggleValue[uniquekey].storage);
            setS3Cost(finalToggleValue[uniquekey].cost);
        } else {
            setText("");
            setS3Cost(0);
        }
    }, [finalToggleValue, uniquekey]);

     const onChange = (e) => {
        const value = e.target.value;
        setText(value);
        const cost = calculateCost(Number(value));
        setS3Cost(cost);

        setFinalToggleValue(prev => ({
            ...prev,
            [uniquekey]: {
                storage: value,
                cost
            }
        }));
    }

    return (
        <ResourceComponent>
           <S3Input 
            type="text"
            onChange={onChange}
            value={text}
            placeholder="Storage(GB)"
            />
            <S3Cost>${s3Cost}</S3Cost><p>/Hour</p>
        </ResourceComponent>
    )

};

const S3Input = styled.input`

    width: 100px;
    border-radius: 3px;
    border: 2px solid #999; 
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
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

export default SeclectS3Toggle;