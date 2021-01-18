import React from "react";
import axios from "axios";
import Form from "./components/Form";

class App extends React.Component {
  state = { error: false, machinesList: null };
  fetchMachines = async () => {
    try {
      const response = await axios.get("/activity-log/machines");
      this.setState({
        error: response.serverError,
        machinesList: response.data,
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
        onFormMount={this.fetchMachines}
        machinesList={this.state.machinesList}
      />
    );
  }
  render() {
    return <div className="container">{this.renderForm()}</div>;
  }
}

export default App;
