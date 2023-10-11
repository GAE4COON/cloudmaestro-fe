import React, { useState, useEffect } from "react";
import '../styles/SelectS3Toggle.css';

const SeclectS3Toggle = ({diagram, uniquekey, finalToggleValue, setFinalToggleValue}) => {
    const [text, setText] = useState("");
    const [s3Cost, setS3Cost] = useState("");

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

    useEffect(() => {
        if ( finalToggleValue && finalToggleValue[uniquekey]) {
            setText(finalToggleValue[uniquekey].text || "");
            setS3Cost(finalToggleValue[uniquekey].cost || 0);
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
                text: value,
                cost
            }
        }));
    }

    return (
        <div className="select-s3-toggle">
           <input 
            type="text"
            onChange={onChange}
            value={text}
            placeholder="Storage (GB)"
            />
            <div><p>$ {s3Cost} /Hour</p></div> 
        </div>
    )

};

export default SeclectS3Toggle;