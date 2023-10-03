import React from "react";
import Select from "react-select";

const groupedOptions = [
  { label: "T1", options: [{ value: "T1", label: "instance1" }] },
  { label: "T2", options: [{ value: "T2", label: "instance2" }] },
  {
    label: "T3",
    options: [
      { value: "T3", label: "instance3" },
      { value: "T3.1", label: "instance3.1" },
      { value: "T3.2", label: "instance3.2" },
    ],
  },
];

const SelectToggle = ({ value, key, onToggleSelect }) => {
  console.log("나는 key 입니다", key)
  const selectedOption = groupedOptions
    .flatMap((group) => group.options)
    .find((option) => option.value === value);

  return (
    <div className="toggle-component">
      <Select
        options={groupedOptions}
        value={selectedOption}
        placeholder={value}
        onChange={(selected) => {
          if (selected) {
            onToggleSelect(selected.label);
          } else {
            onToggleSelect(null);
          }
        }}
      />
    </div>
  );
};
export default React.memo(SelectToggle);