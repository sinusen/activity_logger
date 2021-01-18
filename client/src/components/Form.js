import React from "react";
import Dropdown from "./Dropdown";
import moment from "moment";

const areasLogged = [
  {
    label: "Production",
    value: "Production",
  },
  {
    label: "Packing",
    value: "Packing",
  },
];
const machinesInArea = [
  {
    label: "Hugart",
    value: "Hugart",
  },
  {
    label: "Novapac",
    value: "Novapac",
  },
];
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
      currentArea: areasLogged[0],
      currentMachine: machinesInArea[0],
      selectedDate: getFormattedDate(),
      selectedTime: "",
      timeStep: null,
    };
  }
  async componentDidMount() {
    await this.props.onFormMount();
    this.setState({ timeStep: "900" });
  }
  handleMaintenanceActivity = (event) => {
    this.setState({ activity: event.target.value });
  };
  handleAreaSelection = (event) => {
    this.setState({ currentArea: event.target.value });
  };
  handleMachineSelection = (event) => {
    this.setState({ currentMachine: event.target.value });
  };
  handleDateChange = (event) => {
    this.setState({ selectedDate: event.target.value });
  };
  handleTimeChange = (event) => {
    this.setState({ selectedTime: event.target.value });
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
              options={areasLogged}
              onSelectedChange={this.handleAreaSelection}
            />
          </div>
          <div className="col-md-6">
            <Dropdown
              label="Select a machine"
              selected={this.state.currentMachine}
              options={machinesInArea}
              onSelectedChange={this.handleMachineSelection}
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
              onChange={this.handleDateChange}
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
              onChange={this.handleTimeChange}
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
              onChange={this.handleMaintenanceActivity}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
