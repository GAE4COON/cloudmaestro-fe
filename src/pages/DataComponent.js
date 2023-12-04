import React, { useState, useEffect } from 'react';
import jsonData from '../db/ResourceGuide.json'; // JSON 파일 경로

const DataComponent = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(jsonData); // JSON 파일에서 데이터 가져오기
  }, []);

  const renderManage = (manage) => {
    // manage가 배열인 경우, 내용을 매핑하여 렌더링
    if (Array.isArray(manage)) {
      return manage.map((item, index) => <p key={index}>{item}</p>);
    }
    // manage가 배열이 아닌 경우 (문자열, 객체, undefined 등), 직접 렌더링
    return <p>{manage}</p>;
  };

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <h2>{key}</h2>
          <p>{value.role}</p>
          <h3>동작 방식</h3>
          {renderManage(value.operation)}
          <h3>온프레미스 매칭</h3>
          <p>{value.onpremise}</p>
          <h3>관리방법(보안 고려사항)</h3>
          {renderManage(value.manage)}
        </div>
      ))}
    </div>
  );
};

export default DataComponent;
