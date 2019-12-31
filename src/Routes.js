import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Algos from './components/Algos';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from "./components/NotFound";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/algos" component={Algos} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>
  );
}