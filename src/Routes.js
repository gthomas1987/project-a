import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from "./components/NotFound";
import Algos from "./components/Algos";
import TopAlgos from "./components/TopAlgos";
import BottomAlgos from "./components/BottomAlgos";

export default function Routes({appProps}) {
  return (
    <Switch>
        <Route path="/" exact component={Home}  />
        <AppliedRoute path="/signup" component={Signup} appProps={appProps}/>
        <AppliedRoute path="/login" component={Login} appProps={appProps} />
        <AppliedRoute path="/dashboard" exact component={Dashboard} appProps={appProps} />
        <AppliedRoute path="/algos/all" exact component={Algos} appProps={appProps} />
        <AppliedRoute path="/algos/top" exact component={TopAlgos} appProps={appProps} />
        <AppliedRoute path="/algos/bottom" exact component={BottomAlgos} appProps={appProps} />
        <AppliedRoute path="/index.html" exact component={Dashboard} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>
  );
}