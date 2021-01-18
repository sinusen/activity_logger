import React from "react";

const Dropdown = ({ label, selected, options, onSelectedChange }) => {
  const generatedList = options.map((option) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <div>
      <label>{label}</label>
      <select
        value={selected.value}
        onChange={onSelectedChange}
        className="form-select"
        aria-label="Default select example"
      >
        {generatedList}
      </select>
    </div>
  );
};

export default Dropdown;
