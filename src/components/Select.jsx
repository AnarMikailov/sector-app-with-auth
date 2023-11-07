import React from "react";
import { useSectorContext } from "../context/SectorsContext";
import "./Select.css";

const Select = () => {
  const {
    headingOptions,
    handleSectorChange,
    selectedSectorOptions,
    userInfo,
    isValid,
  } = useSectorContext();
  return (
    <div className="select-container">
      <label className="select-label">Select a Sector*</label>
      <select
        className={`select-input ${
          !isValid && userInfo.sector_name === "" ? "error" : ""
        }`}
        value={selectedSectorOptions}
        onChange={handleSectorChange}
        name="sector_name"
      >
        <option value="">Select Heading</option>
        {headingOptions}
      </select>
    </div>
  );
};

export default Select;
