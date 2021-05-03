import React from "react";
import { getSlashedDate, getFormattedTime } from "../helpers/time-functions";
import EdittableLogItem from "./EdittableLogItem";

import "./TableDisplay.css";

const TableDisplay = ({
  activityData,
  editButtonHandler,
  deleteDataHandler,
  cancelEditHandler,
  editDataHandler,
  machines,
  operators,
}) => {
  const renderTableRows = () => {
    if (activityData.length <= 0) {
      return null;
    }
    return activityData.map((row, index) => {
      return (
        <React.Fragment key={row.pk}>
          {row.editContent ? (
            <EdittableLogItem
              pk={row.pk}
              epoch_ms={row.epoch_ms}
              machine={row.machine_name}
              operatorInitials={row.initials}
              activity={row.activity}
              machines={machines}
              editDataHandler={editDataHandler}
              cancelEditHandler={cancelEditHandler}
              operators={operators}
            />
          ) : (
            <React.Fragment>
              <tr>
                <td>{getSlashedDate(Number(row.epoch_ms))}</td>
                <td>{getFormattedTime(Number(row.epoch_ms))}</td>
                <td>{row.machine_name}</td>
                <td>{row.initials}</td>
                <td>
                  <button
                    onClick={editButtonHandler.bind(null, row.pk)}
                    className="edit-button-group btn btn-sm btn-warning"
                  >
                    Edit log
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={deleteDataHandler.bind(null, { pk: row.pk })}
                  >
                    Delete log
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="5">{row.activity}</td>
              </tr>
            </React.Fragment>
          )}
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
