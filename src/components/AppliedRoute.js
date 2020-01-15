import React from "react";
import { Route } from "react-router-dom";
import Login from './Login'
import Signup from './Signup'

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  
  console.log("XXXXXXXX")
  console.log(rest.path)
  return (
    !appProps.isAuthenticated 
    ?
      rest.path==="/signup"
      ?<Route {...rest} render={props => <Signup {...props} {...appProps} />} />
      :<Route {...rest} render={props => <Login {...props} {...appProps} />} />
    :<Route {...rest} render={props => <C {...props} {...appProps} />} />
  );
}