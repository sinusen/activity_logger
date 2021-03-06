import React from "react";

const Dropdown = ({
  label,
  selected,
  options,
  onSelectedChange,
  labelClass = "",
}) => {
  const generatedList =
    options.length > 0
      ? options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })
      : null;

  return (
    <React.Fragment>
      <label className={labelClass}>{label}</label>
      <select
        value={selected}
        onChange={onSelectedChange}
        className="form-select"
        aria-label="Default select example"
      >
        {generatedList}
      </select>
    </React.Fragment>
  );
};

export default Dropdown;
