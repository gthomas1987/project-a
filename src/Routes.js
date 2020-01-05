import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from "./components/NotFound";

export default function Routes({appProps}) {
  return (
    <Switch>
        <Route path="/" exact component={Home} appProps={appProps} />
        <Route path="/signup" exact component={Signup} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/dashboard" exact component={Dashboard} appProps={appProps} />
        <AppliedRoute path="/index.html" exact component={Dashboard} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>
  );
}