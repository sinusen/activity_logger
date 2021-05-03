import { Fragment, useState, useEffect } from "react";
import {
  getEpoch,
  getFormattedTime,
  getHyphenatedDate,
} from "../helpers/time-functions";

const EdittableLogItem = ({
  pk,
  epoch_ms,
  machine,
  operatorInitials,
  activity,
  machines,
  operators,
  editDataHandler,
  cancelEditHandler,
}) => {
  const [date, setDate] = useState(getHyphenatedDate(Date.now()));
  const [time, setTime] = useState(getFormattedTime(Date.now()));
  const [selectedMachine, setSelectedMachine] = useState(machine);
  const [editedActivity, setEditedActivity] = useState(activity);
  useEffect(() => {
    setTime(getFormattedTime(epoch_ms));
    setDate(getHyphenatedDate(epoch_ms));
  }, [epoch_ms]);
  const machinesList = () => {
    return machines.length > 0
      ? machines.map((machine) => {
          return (
            <option key={machine.id} value={machine.machine_name}>
              {machine.machine_name}
            </option>
          );
        })
      : null;
  };
  const onSubmitClick = (event) => {
    event.preventDefault();
    const { id: machineId } = machines.find(
      (machine) => machine.machine_name === selectedMachine
    );
    const { id: operatorId } = operators.find(
      (operator) => operator.initials === operatorInitials
    );
    if (editedActivity.replaceAll(" ", "") == "") {
      alert("The log cannot be empty");
      return;
    }
    const edittedObject = {
      pk: pk,
      epochMilliSeconds: getEpoch(date, time),
      machineId,
      activity: editedActivity,
      operatorId,
    };
    editDataHandler(edittedObject);
  };
  return (
    <Fragment>
      <tr>
        <td>
          <input
            className="form-control"
            id="datePicker"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </td>
        {/* <td>{getFormattedTime(Number(epoch_ms))}</td> */}
        <td>
          <input
            className="form-control"
            id="timePicker"
            type="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />
        </td>
        <td>
          <select
            value={selectedMachine}
            onChange={(event) => setSelectedMachine(event.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            {machinesList()}
          </select>
        </td>
        <td>{operatorInitials}</td>
        <td>
          <button
            className="btn btn-sm btn-primary edit-button-group"
            onClick={onSubmitClick}
          >
            Submit
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={cancelEditHandler.bind(null, pk)}
          >
            Cancel
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan="5">
          <textarea
            // id="maintenanceActivities"
            className="form-control"
            placeholder={editedActivity}
            //   style={{ height: "200px" }}
            value={editedActivity}
            onChange={(event) => setEditedActivity(event.target.value)}
          />
        </td>
      </tr>
    </Fragment>
  );
};

export default EdittableLogItem;
