import "./App.css";
import React from "react";
import axios from "axios";
import ActivityForm from "./components/ActivityForm";
import ActivityDisplay from "./components/ActivityDisplay";

class App extends React.Component {
  state = {
    formDataError: false,
    tableDataError: false,
    activityData: [],
    postSuccessCount: 0,
    machinesList: null,
    operatorsList: null,
  };
  fetchOperationData = async (endPoint) => {
    try {
      const response = await axios.get(`/activity-log/${endPoint}`);
      return {
        error: response.data.serverError,
        data: response.data.data,
      };
    } catch (err) {
      return { error: true };
    }
  };

  fetchDropdownData = async () => {
    const areaAndMachines = await this.fetchOperationData("area-and-machines");
    const operators = await this.fetchOperationData("operators");

    if (areaAndMachines.error || operators.error) {
      this.setState({ formDataError: true });
      return;
    }
    this.setState({ machinesList: areaAndMachines.data });
    this.setState({ operatorsList: operators.data });
  };

  postFormData = async (data) => {
    try {
      const response = await axios.post(`/activity-log/submit-form-data`, data);
      alert(response.data.message);
      if (!response.data.error) {
        this.setState({ postSuccessCount: this.state.postSuccessCount + 1 });
      }
    } catch (err) {
      console.log(err);
      alert("Form submit error");
    }
  };
  renderForm() {
    if (this.state.formDataError) {
      return "Error loading data";
    }
    return (
      <div className="activity-form">
        <ActivityForm
          onFormMount={this.fetchDropdownData}
          machinesList={this.state.machinesList}
          operatorsList={this.state.operatorsList}
          onFormSubmit={this.postFormData}
          postSuccessCount={this.state.postSuccessCount}
        />
      </div>
    );
  }
  renderTable() {
    if (this.state.tableDataError) {
      return "Error loading data";
    }
    return (
      <div>
        <ActivityDisplay activityData={this.state.activityData} />
      </div>
    );
  }
  async componentDidMount() {
    const activityLog = await this.fetchOperationData("activity-logs");
    if (activityLog.error) {
      this.setState({ tableDataError: activityLog.error });
      return;
    }
    this.setState({ activityData: activityLog.data });
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center main-title">Activity Logger</h1>
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
