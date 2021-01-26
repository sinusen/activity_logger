import React from "react";

const TableDisplay = ({ activityData }) => {
  const renderTableRows = () => {
    if (activityData.length <= 0) {
      return null;
    }
    return activityData.map((row, index) => {
      let dateTime = new Date(Number(row.epoch_ms));

      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{`${dateTime.getDate()}/${
            dateTime.getMonth() + 1
          }/${dateTime.getFullYear()}`}</td>
          <td>{`${dateTime.getHours()}:${dateTime.getMinutes()}`}</td>
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
