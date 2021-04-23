import React, { useState, useEffect } from "react";
import TableDisplay from "./TableDisplay";

const ActivityDisplay = ({ activityData }) => {
  const [editableActivityData, setEditableActivityData] = useState([]);
  useEffect(() => {
    if (activityData && activityData.length > 0) {
      setEditableActivityData(
        activityData.map((entry) => {
          entry.editContent = false;
          return entry;
        })
      );
    }
  }, [activityData]);

  function editHandler(id) {
    setEditableActivityData(
      editableActivityData.map((entry) => {
        entry.editContent = entry.pk === id ? true : false;
        return entry;
      })
    );
    console.log(editableActivityData);
  }

  function editSubmitHandler(id) {
    console.log(editableActivityData);
  }

  return (
    <div>
      <TableDisplay
        activityData={editableActivityData}
        editHandler={editHandler}
        editSubmitHandler={editSubmitHandler}
      />
    </div>
  );
};

export default ActivityDisplay;
