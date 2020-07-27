import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

const Protected = ({ component: Component, path, exact, authenticator }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        if(authenticator.isLoginValid()) {
          return <Component {...props} authenticator={authenticator} />
        } else {
          authenticator.logout();
          return <Redirect to="/login" />
        }
      }}
    />
  );
  };

export const ProtectedRoute = withRouter(Protected);