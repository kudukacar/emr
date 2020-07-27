import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, exact, authenticator }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !authenticator.isLoggedIn() ? (
          <Component {...props} authenticator={authenticator} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export const AuthRoute = withRouter(Auth);
