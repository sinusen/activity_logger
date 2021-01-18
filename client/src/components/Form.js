import React from "react";
import Dropdown from "./Dropdown";
import moment from "moment";

const getFormattedDate = () => {
  return moment().format("YYYY-MM-DD");
};
const getFormattedTime = () => {
  return moment().format("LTS");
};
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maintenanceActivity: "",
      currentArea: "",
      currentMachine: "",
      selectedDate: getFormattedDate(),
      selectedTime: "",
      timeStep: null,
    };
  }
  async componentDidMount() {
    await this.props.onFormMount();
    this.setState({ timeStep: "900" });
  }

  getAreasFromList = () => {
    if (!this.props.machinesList) {
      return [];
    }
    let areas = [];
    [
      ...new Set(this.props.machinesList.map((item) => item.machine_location)),
    ].forEach((value1, value2, set) => {
      areas.push({ label: value1, value: value1 });
    });
    // if (!this.state.currentArea) {
    //   this.setState({ currentArea: array[0] });
    // }
    return areas;
  };

  getMachinesFromList = () => {
    if (!this.props.machinesList) {
      return [];
    }
    return this.props.machinesList
      .filter((item) => item.machine_location == this.state.currentArea)
      .map(({ machine_name }) => {
        return { label: machine_name, value: machine_name };
      });
  };

  handleChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value });
  };

  render() {
    console.log(this.props.machinesList);
    return (
      <form>
        <div className="row g-5">
          <div className="col-md-6">
            <Dropdown
              label="Select an area"
              selected={this.state.currentArea}
              options={this.getAreasFromList()}
              onSelectedChange={(event) => {
                this.handleChange(event, "currentArea");
              }}
            />
          </div>
          <div className="col-md-6">
            <Dropdown
              label="Select a machine"
              selected={this.state.currentMachine}
              options={this.getMachinesFromList()}
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
              step={this.state.timeStep}
              value={this.state.selectedTime}
              onChange={(event) => {
                this.handleChange(event, "selectedTime");
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
