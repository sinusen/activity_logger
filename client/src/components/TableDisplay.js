import React from "react";
import { getSlashedDate, getFormattedTime } from "../helpers/time-functions";

const TableDisplay = ({ activityData }) => {
  const renderTableRows = () => {
    if (activityData.length <= 0) {
      return null;
    }
    return activityData.map((row, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{getSlashedDate(Number(row.epoch_ms))}</td>
            <td>{getFormattedTime(Number(row.epoch_ms))}</td>
            <td>{row.machine_name}</td>
            <td>{row.initials}</td>
          </tr>
          <tr>
            <td colSpan="5">{row.activity}</td>
          </tr>
        </React.Fragment>
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
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
