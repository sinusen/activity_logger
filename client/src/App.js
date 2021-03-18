import "./App.css";
import React from "react";
import axios from "axios";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ActivityForm from "./components/ActivityForm";
import ActivityDisplay from "./components/ActivityDisplay";
import NavigationBar from "./components/NavigationBar";

import { addYearstoCurrentDate } from "./helpers/time-functions";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      name: (cookies && cookies.get("name")) || "Ben",
      formDataError: false,
      tableDataError: false,
      activityData: [],
      postSuccessCount: 0,
      machinesList: null,
      operatorsList: null,
    };
  }

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
    const machinesData = await this.fetchOperationData("machines_groups_areas");
    const operators = await this.fetchOperationData("operators");

    if (machinesData.error || operators.error) {
      this.setState({ formDataError: true });
      return;
    }
    this.setState({ machinesList: machinesData.data });
    this.setState({ operatorsList: operators.data });
  };

  postFormData = async (data) => {
    try {
      const response = await axios.post(`/activity-log/submit-form-data`, data);

      const { cookies } = this.props;
      cookies.set("logger", data.operatorId, {
        expires: addYearstoCurrentDate(1),
      });

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
      <div className="mt-3">
        <ActivityForm
          onFormMount={this.fetchDropdownData}
          machinesList={this.state.machinesList}
          operatorsList={this.state.operatorsList}
          onFormSubmit={this.postFormData}
          postSuccessCount={this.state.postSuccessCount}
          loggedOperator={this.props.cookies.get("logger") || null}
        />
      </div>
    );
  }
  renderTable() {
    if (this.state.tableDataError) {
      return "Error loading data";
    }
    return (
      <div className="mt-3">
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
        <Router>
          <NavigationBar />
          <Route exact path="/">
            {this.renderForm()}
          </Route>
          <Route path="/activitydisplay">{this.renderTable()}</Route>
        </Router>
      </div>
    );
  }
}

export default withCookies(App);
