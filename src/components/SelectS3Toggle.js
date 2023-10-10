import React, { useState } from "react";
import '../styles/SelectS3Toggle.css';

function SeclectS3Toggle() {
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

    const onChange = (e) => {
        const value = e.target.value;
        setText(value);
        setS3Cost(calculateCost(Number(value)));
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
}

export default SeclectS3Toggle;
