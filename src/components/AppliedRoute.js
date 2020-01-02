import React from "react";
import { Route } from "react-router-dom";
import Login from './Login'

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return (
    !appProps.isAuthenticated
    ?<Route {...rest} render={props => <Login {...props} {...appProps} />} />
    :<Route {...rest} render={props => <C {...props} {...appProps} />} />
  );
}