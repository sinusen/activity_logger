import React from "react";
import axios from "axios";
import Form from "./components/Form";

class App extends React.Component {
  state = { error: false, machinesList: null, operatorsList: null };
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
      this.setState({ error: true });
      return;
    }
    this.setState({ machinesList: areaAndMachines.data });
    this.setState({ operatorsList: operators.data });
  };

  postFormData = async (data) => {
    console.log(data);
    try {
      await axios.post(`/activity-log/submit-form-data`, data);
    } catch (err) {
      console.log(err);
      alert("Form submit error");
    }
  };
  renderForm() {
    if (this.state.error) {
      return "Error";
    }
    return (
      <Form
        onFormMount={this.fetchDropdownData}
        machinesList={this.state.machinesList}
        operatorsList={this.state.operatorsList}
        onFormSubmit={this.postFormData}
      />
    );
  }
  render() {
    return <div className="container">{this.renderForm()}</div>;
  }
}

export default App;
