// draw.js
import React from "react";

const Draw = (props) => {
  const json_path = props.json_path;

  return (
    <div>
      <h1>Draw Page</h1>

      <p>{json_path ? `JSON Path: ${json_path}` : "No JSON Path Provided"}</p>
    </div>
  );
};

export default Draw;
