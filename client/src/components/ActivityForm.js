import "./ActivityForm.css";

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
      machineNames: [],
      machineGroups: [],
      machineLocations: [],
      operators: [],
    };
  }

  setTimeAndClearText = () => {
    this.setState({
      maintenanceActivity: "",
      selectedDate: getHyphenatedDate(),
      selectedTime: getFormattedTime(),
    });
  };

  updateMachines = () => {
    this.setState(
      {
        machineNames: getMachinesFromList(
          this.state.selectedMachineLocation,
          this.state.selectedMachineGroup,
          this.props.machinesList
        ),
      },
      () => {
        this.setState({ selectedMachine: this.state.machineNames[0].value });
      }
    );
  };

  updateMachineGroups = () => {
    this.setState(
      {
        machineGroups: getMachineGroupsFromList(
          this.state.selectedMachineLocation,
          this.props.machinesList
        ),
      },
      () => {
        this.setState(
          { selectedMachineGroup: this.state.machineGroups[0].value },
          () => {
            this.updateMachines();
          }
        );
      }
    );
  };

  updateMachineLocations = () => {
    this.setState(
      {
        machineLocations: getMachineLocationsFromList(this.props.machinesList),
      },
      () => {
        this.setState(
          { selectedMachineLocation: this.state.machineLocations[0].value },
          () => {
            this.updateMachineGroups();
          }
        );
      }
    );
  };

  machineDropdownBuild = () => {
    if (this.props.machinesList.length) {
      this.updateMachineLocations();
    }
  };

  operatorDropdownBuild = () => {
    if (this.props.operatorsList.length) {
      this.setState(
        { operators: getOperatorsFromList(this.props.operatorsList) },
        () => {
          this.setState({
            selectedOperator:
              this.props.loggedOperator || this.state.operators[0].value,
          });
        }
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.machinesList) !==
      JSON.stringify(prevProps.machinesList)
    ) {
      this.machineDropdownBuild();
    }
    if (
      JSON.stringify(this.props.operatorsList) !==
      JSON.stringify(prevProps.operatorsList)
    ) {
      this.operatorDropdownBuild();
    }
    if (this.props.postSuccessCount !== prevProps.postSuccessCount) {
      this.setTimeAndClearText();
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
    const {
      machineLocations,
      selectedMachineLocation,
      machineGroups,
      selectedMachineGroup,
      machineNames,
      selectedMachine,
      operators,
      selectedOperator,
      maintenanceActivity,
      selectedDate,
      selectedTime,
    } = this.state;
    const { isErrored, isShown } = this.props;
    return (
      <div className="mt-3">
        {isErrored && isShown && <div>Error loading data</div>}
        {!isErrored && isShown && (
          <form onSubmit={this.handleFormSubmission}>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="input-group">
                  <Dropdown
                    label="Area"
                    labelClass="input-group-text fw-bold"
                    selected={selectedMachineLocation}
                    options={machineLocations}
                    onSelectedChange={(event) => {
                      this.handleAreaChange(event, "selectedMachineLocation");
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <Dropdown
                    label="Group"
                    labelClass="input-group-text fw-bold"
                    selected={selectedMachineGroup}
                    options={machineGroups}
                    onSelectedChange={(event) => {
                      this.handleGroupChange(event, "selectedMachineGroup");
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <Dropdown
                    label="Machine"
                    labelClass="input-group-text fw-bold"
                    selected={selectedMachine}
                    options={machineNames}
                    onSelectedChange={(event) => {
                      this.handleChange(event, "selectedMachine");
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label
                    htmlFor="datePicker"
                    className="input-group-text fw-bold"
                  >
                    Date
                  </label>
                  <input
                    className="form-control"
                    id="datePicker"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => {
                      this.handleChange(event, "selectedDate");
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label
                    htmlFor="timePicker"
                    className="input-group-text fw-bold"
                  >
                    Time
                  </label>
                  <input
                    className="form-control"
                    id="timePicker"
                    type="time"
                    value={selectedTime}
                    onChange={(event) => {
                      this.handleChange(event, "selectedTime");
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group">
                  <Dropdown
                    label="Operator/Technician"
                    labelClass="input-group-text fw-bold"
                    selected={selectedOperator}
                    options={operators}
                    onSelectedChange={(event) => {
                      this.handleChange(event, "selectedOperator");
                    }}
                  />
                </div>
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
                  value={maintenanceActivity}
                  onChange={(event) => {
                    this.handleChange(event, "maintenanceActivity");
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                id="activity-submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Form;
