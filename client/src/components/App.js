import React from "react";
import axios from "axios";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import ActivityForm from "./ActivityForm";
import ActivityDisplay from "./ActivityDisplay";

import { addYearstoCurrentDate } from "../helpers/time-functions";

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
      machinesList: [],
      operatorsList: [],
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
        this.setState(({ postSuccessCount }) => ({
          postSuccessCount: postSuccessCount + 1,
        }));
        await this.fetchActivityLog();
      }
    } catch (err) {
      console.log(err);
      alert("Form submit error");
    }
  };

  editData = async (data) => {
    try {
      const response = await axios.post(`/activity-log/edit-data`, data);

      alert(response.data.message);
      if (!response.data.error) {
        await this.fetchActivityLog();
      }
    } catch (err) {
      console.log(err);
      alert("Data could not be edited. Please report the issue");
    }
  };
  deleteData = async (data) => {
    try {
      const response = await axios.post(`/activity-log/delete-data`, data);

      alert(response.data.message);
      if (!response.data.error) {
        await this.fetchActivityLog();
      }
    } catch (err) {
      console.log(err);
      alert("Data could not be deleted. Please report the issue");
    }
  };

  async fetchActivityLog() {
    const activityLog = await this.fetchOperationData("activity-logs");
    if (activityLog.error) {
      this.setState({ tableDataError: activityLog.error });
      return;
    }
    this.setState({ activityData: activityLog.data });
  }
  async componentDidMount() {
    await this.fetchActivityLog();
    await this.fetchDropdownData();
  }
  render() {
    const {
      machinesList,
      operatorsList,
      postSuccessCount,
      activityData,
      formDataError,
      tableDataError,
    } = this.state;
    const {
      displayToggle: { showActivityForm, showActivityDisplay },
    } = this.props;
    return (
      <React.Fragment>
        <ActivityForm
          isShown={showActivityForm}
          isErrored={formDataError}
          machinesList={machinesList}
          operatorsList={operatorsList}
          onFormSubmit={this.postFormData}
          postSuccessCount={postSuccessCount}
          loggedOperator={this.props.cookies.get("logger") || null}
        />
        <ActivityDisplay
          isShown={showActivityDisplay}
          isErrored={tableDataError}
          activityData={activityData}
          machines={machinesList}
          operators={operatorsList}
          editDataHandler={this.editData}
          deleteDataHandler={this.deleteData}
        />
      </React.Fragment>
    );
  }
}

export default withCookies(App);
