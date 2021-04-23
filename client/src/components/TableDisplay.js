import React from "react";
import { getSlashedDate, getFormattedTime } from "../helpers/time-functions";

import "./TableDisplay.css";

const TableDisplay = ({ activityData, editHandler, editSubmitHandler }) => {
  const renderTableRows = () => {
    if (activityData.length <= 0) {
      return null;
    }
    return activityData.map((row, index) => {
      console.log(activityData);
      return (
        <React.Fragment key={row.pk}>
          <tr>
            <td contentEditable={row.editContent}>
              {getSlashedDate(Number(row.epoch_ms))}
            </td>
            <td contentEditable={row.editContent}>
              {getFormattedTime(Number(row.epoch_ms))}
            </td>
            <td>{row.machine_name}</td>
            <td>{row.initials}</td>
            <td>
              {row.editContent ? (
                <React.Fragment>
                  <button
                    onClick={editSubmitHandler.bind(null, row.pk)}
                    className="btn btn-primary btn-sm"
                  >
                    Submit
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    onClick={editHandler.bind(null, row.pk)}
                    className="edit-button-group btn btn-sm btn-warning"
                  >
                    Edit log
                  </button>
                  <button className="btn btn-sm btn-danger">Delete log</button>
                </React.Fragment>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="5" contentEditable={row.editContent}>
              {row.activity}
            </td>
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
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Machine</th>
            <th scope="col">Operator</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
