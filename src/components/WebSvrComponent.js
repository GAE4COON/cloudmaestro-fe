import React, { useState } from "react";
import { Select } from "antd";

const WebSvrComponent = ({ onDataChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    onDataChange(value); // 상위 컴포넌트에 변경 사항 전달
  };

  return (
    <div>
      <Select
        style={{ width: 200 }}
        placeholder="Select an option"
        onChange={handleSelectChange}
      >
        {/* 옵션 목록 */}
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        {/* ... 추가 옵션 ... */}
      </Select>
    </div>
  );
};

export default WebSvrComponent;
