
import React, { useState, useCallback, useEffect } from "react";
import * as go from "gojs";

const useReadJSON = (file,diagram) => {
  if(file){
    
  }
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
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [diagram, file]); // file이 변경되면 useEffect가 다시 실행됩니다.
  if(diagram){
    diagram.model = go.Model.fromJson(data);
  }


  return data;
};

export default useReadJSON;