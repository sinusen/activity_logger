import React from "react";
import Dropdown from "./Dropdown";
import {
  getFormattedTime,
  getHyphenatedDate,
  getEpoch,
} from "../helpers/time-functions";
import {
  getAreasFromList,
  getMachinesFromList,
  getOperatorsFromList,
} from "../helpers/list-handlers";

class Form extends React.Component {
  areas = [];
  machines = [];
  operators = [];
  constructor(props) {
    super(props);
    this.state = {
      maintenanceActivity: "",
      currentArea: "",
      currentMachine: "",
      selectedDate: getHyphenatedDate(),
      selectedTime: getFormattedTime(),
      currentOperator: "",
    };
  }

  setDefaultStates = () => {
    const stateDefinition = {
      ...this.state,
      maintenanceActivity: "",
      selectedDate: getHyphenatedDate(),
      selectedTime: getFormattedTime(),
    };
    this.setState(stateDefinition);
  };

  async componentDidMount() {
    await this.props.onFormMount();
  }
  updateMachines = () => {
    this.machines = getMachinesFromList(
      this.state.currentArea,
      this.props.machinesList
    );
    this.setState({ currentMachine: this.machines[0].value });
  };

  updateAreas = () => {
    this.areas = getAreasFromList(this.props.machinesList);
    this.setState({ currentArea: this.areas[0].value }, () => {
      this.updateMachines();
    });
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.machinesList !== prevProps.machinesList &&
      this.props.machinesList
    ) {
      this.updateAreas();
    }
    if (
      this.props.operatorsList !== prevProps.operatorsList &&
      this.props.operatorsList
    ) {
      this.operators = getOperatorsFromList(this.props.operatorsList);
      this.setState({ currentOperator: this.operators[0].value });
      console.log(this.operators);
    }
    if (this.props.postSuccessCount !== prevProps.postSuccessCount) {
      this.setDefaultStates();
    }
  }

  handleAreaChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value }, () => {
      this.updateMachines();
    });
  };
  handleChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    this.props.onFormSubmit({
      epochMilliSeconds: getEpoch(
        this.state.selectedDate,
        this.state.selectedTime
      ),
      machineId: Number(this.state.currentMachine),
      operatorId: Number(this.state.currentOperator),
      activity: this.state.maintenanceActivity,
    });
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
              required
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
