import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./components/Home";
import Algos from './components/Algos';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from "./components/NotFound";

export default function Routes({appProps}) {
  return (
    <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/dashboard" exact component={Dashboard} appProps={appProps} />
        <AppliedRoute path="/about" exact component={About} appProps={appProps} />
        <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AppliedRoute path="/algos" exact component={Algos} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>
  );
}