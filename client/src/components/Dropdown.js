import React from "react";

const Dropdown = ({ label, selected, options, onSelectedChange }) => {
  const generatedList =
    options.length > 0
      ? options.map((option) => {
          console.log(option);
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })
      : null;

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
