import React from "react";
import axios from "axios";
import Form from "./components/Form";

class App extends React.Component {
  state = {
    fetchError: false,
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
      this.setState({ fetchError: true });
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
    if (this.state.fetchError) {
      return "Error loading data";
    }
    return (
      <Form
        onFormMount={this.fetchDropdownData}
        machinesList={this.state.machinesList}
        operatorsList={this.state.operatorsList}
        onFormSubmit={this.postFormData}
        postSuccessCount={this.state.postSuccessCount}
      />
    );
  }
  render() {
    return <div className="container">{this.renderForm()}</div>;
  }
}

export default App;
