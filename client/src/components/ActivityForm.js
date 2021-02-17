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
      selectedArea: "",
      selectedMachine: "",
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
    this.machines = getMachinesFromList(
      this.state.selectedArea,
      this.props.machinesList
    );
    this.setState({ selectedMachine: this.machines[0].value });
  };

  updateAreas = () => {
    this.areas = getAreasFromList(this.props.machinesList);
    this.setState({ selectedArea: this.areas[0].value }, () => {
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
          <div className="col-md-6">
            <Dropdown
              label="Area"
              selected={this.state.selectedArea}
              options={this.areas}
              onSelectedChange={(event) => {
                this.handleAreaChange(event, "selectedArea");
              }}
            />
          </div>
          <div className="col-md-6">
            <Dropdown
              label="Machine"
              selected={this.state.selectedMachine}
              options={this.machines}
              onSelectedChange={(event) => {
                this.handleChange(event, "selectedMachine");
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="datePicker" className="form-label">
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
            <label htmlFor="timePicker" className="form-label">
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
              selected={this.state.selectedOperator}
              options={this.operators}
              onSelectedChange={(event) => {
                this.handleChange(event, "selectedOperator");
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
