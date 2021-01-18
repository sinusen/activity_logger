import React from "react";
import axios from "axios";
import Form from "./components/Form";

class App extends React.Component {
  state = { error: false, machinesList: null };
  fetchAreaAndMachines = async () => {
    try {
      const response = await axios.get("/activity-log/area-and-machines");
      this.setState({
        error: response.data.serverError,
        machinesList: response.data.data,
      });
    } catch (err) {
      this.setState({ error: true });
    }
  };

  renderForm() {
    if (this.state.error) {
      return "Error";
    }
    return (
      <Form
        onFormMount={this.fetchAreaAndMachines}
        machinesList={this.state.machinesList}
      />
    );
  }
  render() {
    return <div className="container">{this.renderForm()}</div>;
  }
}

export default App;
