import React from "react";
import Dropdown from "./Dropdown";
import { getFormattedTime, getFormattedDate } from "../helpers/timeFunctions";

class Form extends React.Component {
  areas = [];
  machines = [];
  operators = [
    { label: "Sinu Sen", value: "SS" },
    { label: "Libi Varghese", value: "LV" },
  ];
  constructor(props) {
    super(props);
    this.state = {
      maintenanceActivity: "",
      currentArea: "",
      currentMachine: "",
      selectedDate: getFormattedDate(),
      selectedTime: getFormattedTime(),
      currentOperator: "",
    };
  }

  getAreasFromList = () => {
    let areas = [];
    [
      ...new Set(this.props.machinesList.map((item) => item.machine_location)),
    ].forEach((value1, value2, set) => {
      areas.push({ label: value1, value: value1 });
    });
    this.areas = areas;
    this.setState({ currentArea: this.areas[0] });
  };

  getMachinesFromList = (area) => {
    this.machines = this.props.machinesList
      .filter((item) => item.machine_location == area)
      .map(({ machine_name }) => {
        return { label: machine_name, value: machine_name };
      });
    this.setState({ currentMachine: this.machines[0] });
  };
  getOperatorsFromList = () => {
    this.operators = this.props.operatorsList.map(
      ({ name, machine_operator }) => {
        return { label: name, value: machine_operator };
      }
    );
    this.setState({ currentOperator: this.operators[0] });
  };
  getEpoch = () => {
    const dateTime = new Date(
      `${this.state.selectedDate} ${this.state.selectedTime}`
    );
    return dateTime.getTime();
  };

  async componentDidMount() {
    await this.props.onFormMount();
    this.setState({ timeStep: "900" });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.machinesList != prevProps.machinesList &&
      this.props.machinesList
    ) {
      this.getAreasFromList();
      this.getMachinesFromList(this.areas[0].value);
    }
    if (
      this.props.operatorsList != prevProps.operatorsList &&
      this.props.operatorsList
    ) {
      this.getOperatorsFromList();
    }
  }

  handleAreaChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value });
    this.getMachinesFromList(event.target.value);
  };
  handleChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value });
  };

  handleFormSubmission = (event) => {
    this.getEpoch();
    this.props.onFormSubmit({
      area: this.state.currentArea.value,
      machine: this.state.currentMachine.value,
      epochMilliSeconds: this.getEpoch(),
      operator: this.state.currentOperator.value,
      activity: this.state.maintenanceActivity,
    });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <div className="row g-5">
          <div className="col-md-6">
            <Dropdown
              label="Select an area"
              selected={this.state.currentArea}
              options={this.areas}
              onSelectedChange={(event) => {
                this.handleAreaChange(event, "currentArea");
              }}
            />
          </div>
          <div className="col-md-6">
            <Dropdown
              label="Select a machine"
              selected={this.state.currentMachine}
              options={this.machines}
              onSelectedChange={(event) => {
                this.handleChange(event, "currentMachine");
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="datePicker" className="form-label">
              Select the date
            </label>
            <input
              className="form-control"
              id="datePicker"
              type="date"
              value={this.state.selectedDate}
              onChange={(event) => {
                this.handleChange(event, "selectedDate");
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="timePicker" className="form-label">
              Select the time
            </label>
            <input
              className="form-control"
              id="timePicker"
              type="time"
              value={this.state.selectedTime}
              onChange={(event) => {
                this.handleChange(event, "selectedTime");
              }}
            />
          </div>
          <div className="col-md-12">
            <Dropdown
              label="Please input the initials"
              selected={this.state.currentOperator}
              options={this.operators}
              onSelectedChange={(event) => {
                this.handleChange(event, "currentOperator");
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="maintenanceActivities" className="form-label">
              Maintenance Activities
            </label>
            <textarea
              id="maintenanceActivities"
              className="form-control"
              placeholder="Enter activity"
              style={{ height: "200px" }}
              value={this.state.maintenanceActivity}
              onChange={(event) => {
                this.handleChange(event, "maintenanceActivity");
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
