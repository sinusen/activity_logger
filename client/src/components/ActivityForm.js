import React from "react";
import Dropdown from "./Dropdown";
import {
  getFormattedTime,
  getHyphenatedDate,
  getEpoch,
} from "../helpers/time-functions";
import {
  getMachineLocationsFromList,
  getMachineGroupsFromList,
  getMachinesFromList,
  getOperatorsFromList,
} from "../helpers/list-handlers";

class Form extends React.Component {
  machineNames = [];
  machineGroups = [];
  machineLocations = [];
  operators = [];
  constructor(props) {
    super(props);

    this.state = {
      maintenanceActivity: "",
      selectedMachine: "",
      selectedMachineGroup: "",
      selectedMachineLocation: "",
      selectedDate: getHyphenatedDate(),
      selectedTime: getFormattedTime(),
      selectedOperator: "",
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
    this.machineNames = getMachinesFromList(
      this.state.selectedMachineLocation,
      this.state.selectedMachineGroup,
      this.props.machinesList
    );
    this.setState({ selectedMachine: this.machineNames[0].value });
  };

  updateMachineGroups = () => {
    this.machineGroups = getMachineGroupsFromList(
      this.state.selectedMachineLocation,
      this.props.machinesList
    );
    this.setState({ selectedMachineGroup: this.machineGroups[0].value }, () => {
      this.updateMachines();
    });
  };

  updateMachineLocations = () => {
    this.machineLocations = getMachineLocationsFromList(
      this.props.machinesList
    );
    this.setState(
      { selectedMachineLocation: this.machineLocations[0].value },
      () => {
        this.updateMachineGroups();
      }
    );
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.machinesList !== prevProps.machinesList &&
      this.props.machinesList
    ) {
      this.updateMachineLocations();
    }
    if (
      this.props.operatorsList !== prevProps.operatorsList &&
      this.props.operatorsList
    ) {
      this.operators = getOperatorsFromList(this.props.operatorsList);
      this.setState({
        selectedOperator: this.props.loggedOperator || this.operators[0].value,
      });
    }
    if (this.props.postSuccessCount !== prevProps.postSuccessCount) {
      this.setDefaultStates();
    }
  }

  handleAreaChange = (event, stateProperty) => {
    this.setState({ [stateProperty]: event.target.value }, () => {
      this.updateMachineGroups();
    });
  };
  handleGroupChange = (event, stateProperty) => {
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
      machineId: Number(this.state.selectedMachine),
      operatorId: Number(this.state.selectedOperator),
      activity: this.state.maintenanceActivity,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <div className="row g-5">
          <div className="col-md-4">
            <Dropdown
              label="Area"
              labelClass="form-label fw-bold"
              selected={this.state.selectedMachineLocation}
              options={this.machineLocations}
              onSelectedChange={(event) => {
                this.handleAreaChange(event, "selectedMachineLocation");
              }}
            />
          </div>
          <div className="col-md-4">
            <Dropdown
              label="Group"
              labelClass="form-label fw-bold"
              selected={this.state.selectedMachineGroup}
              options={this.machineGroups}
              onSelectedChange={(event) => {
                this.handleGroupChange(event, "selectedMachineGroup");
              }}
            />
          </div>
          <div className="col-md-4">
            <Dropdown
              label="Machine"
              labelClass="form-label fw-bold"
              selected={this.state.selectedMachine}
              options={this.machineNames}
              onSelectedChange={(event) => {
                this.handleChange(event, "selectedMachine");
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="datePicker" className="form-label fw-bold">
              Date
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
            <label htmlFor="timePicker" className="form-label fw-bold">
              Time
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
              label="Operator/Technician"
              labelClass="form-label fw-bold"
              selected={this.state.selectedOperator}
              options={this.operators}
              onSelectedChange={(event) => {
                this.handleChange(event, "selectedOperator");
              }}
            />
          </div>
          <div className="col-12">
            <label
              htmlFor="maintenanceActivities"
              className="form-label fw-bold"
            >
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
