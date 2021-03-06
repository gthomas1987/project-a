import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from "./components/NotFound";
import Algos from "./components/Algos";
import ResetPassword from "./components/ResetPassword";
import Admin from "./components/Admin";
import BackTesting from "./components/BackTesting";

export default function Routes({appProps}) {
  return (
    <Switch>
        <Route path="/" exact component={Home}  />
        <Route path="/login/reset" exact component={ResetPassword}  />
        <AppliedRoute path="/signup" component={Signup} appProps={appProps}/>
        <AppliedRoute path="/login" component={Login} appProps={appProps} />
        <AppliedRoute path="/dashboard" exact component={Dashboard} appProps={appProps} />
        <AppliedRoute path="/algos" exact component={Algos} appProps={appProps} />
        <AppliedRoute path="/backtesting" exact component={BackTesting} appProps={appProps} />
        <AppliedRoute path="/admin" exact component={Admin} appProps={appProps} />
        <AppliedRoute path="/index.html" exact component={Dashboard} appProps={appProps} />
        
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>
  );
}