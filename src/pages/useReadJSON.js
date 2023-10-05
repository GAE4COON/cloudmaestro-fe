import React, { useState, useEffect } from "react";
import * as go from "gojs";


const useReadJSON = (file, diagram) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(file)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        if (diagram) {
          diagram.model = go.Model.fromJson(json);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [diagram, file]);

  return data;
};

export default useReadJSON;
