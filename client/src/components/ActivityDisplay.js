import React, { useState, useEffect } from "react";
import TableDisplay from "./TableDisplay";

const ActivityDisplay = ({
  activityData,
  machines,
  operators,
  editDataHandler,
  deleteDataHandler,
  isErrored,
  isShown,
}) => {
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
  console.log("Activity Display mount");
  function editButtonHandler(id) {
    setEditableActivityData(
      editableActivityData.map((entry) => {
        entry.editContent = entry.pk === id ? true : false;
        return entry;
      })
    );
  }

  function cancelEditHandler(id) {
    setEditableActivityData(
      editableActivityData.map((entry) => {
        entry.editContent = entry.pk === id ? false : entry.editContent;
        return entry;
      })
    );
  }
  return (
    <div className="mt-3">
      {isErrored && <div>Error loading data</div>}
      {!isErrored && isShown && (
        <TableDisplay
          activityData={editableActivityData}
          editButtonHandler={editButtonHandler}
          deleteDataHandler={deleteDataHandler}
          editDataHandler={editDataHandler}
          machines={machines}
          operators={operators}
          cancelEditHandler={cancelEditHandler}
        />
      )}
    </div>
  );
};

export default ActivityDisplay;
