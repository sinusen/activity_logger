import React from "react";
import { getSlashedDate, getFormattedTime } from "../helpers/time-functions";

const TableDisplay = ({ activityData }) => {
  const renderTableRows = () => {
    if (activityData.length <= 0) {
      return null;
    }
    return activityData.map((row, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{getSlashedDate(Number(row.epoch_ms))}</td>
          <td>{getFormattedTime(Number(row.epoch_ms))}</td>
          <td>{row.machine_name}</td>
          <td>{row.machine_operator}</td>
          <td>{row.activity}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sl No</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Machine</th>
            <th scope="col">Operator</th>
            <th scope="col">Activity</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
