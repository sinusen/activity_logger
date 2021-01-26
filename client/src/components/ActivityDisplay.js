import React from "react";
import TableDisplay from "./TableDisplay";

const ActivityDisplay = ({ activityData }) => {
  return (
    <div>
      <TableDisplay activityData={activityData} />
    </div>
  );
};

export default ActivityDisplay;
