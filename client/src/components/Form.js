import React from "react";
import Dropdown from "./Dropdown";
import { getFormattedTime, getFormattedDate } from "../helpers/timeFunctions";

class Form extends React.Component {
  areas = [];
  machines = [];
  loggers = [
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
      currentLogger: "",
    };
  }

  getAreasFromList = () => {
    if (!this.props.machinesList) {
      this.areas = [];
      return;
    }
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
    if (!this.props.machinesList) {
      this.machines = [];
      return;
    }
    this.machines = this.props.machinesList
      .filter((item) => item.machine_location == area)
      .map(({ machine_name }) => {
        return { label: machine_name, value: machine_name };
      });
    this.setState({ currentMachine: this.machines[0] });
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
  }

  handleAreaChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value });
    this.getMachinesFromList(event.target.value);
  };
  handleChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value });
  };

  render() {
    return (
      <form>
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
              selected={this.state.currentLogger}
              options={this.loggers}
              onSelectedChange={(event) => {
                this.handleChange(event, "currentLogger");
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
        </div>
      </form>
    );
  }
}

export default Form;
