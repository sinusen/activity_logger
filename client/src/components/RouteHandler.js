import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const RouteHandler = ({ children }) => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          {React.cloneElement(children, {
            displayToggle: {
              showActivityForm: true,
              showActivityDisplay: false,
            },
          })}
        </Route>
        <Route exact path="/activitydisplay">
          {React.cloneElement(children, {
            displayToggle: {
              showActivityForm: false,
              showActivityDisplay: true,
            },
          })}
        </Route>
      </Switch>
    </Router>
  );
};

export default RouteHandler;
