import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { TOKEN, EXPIRATION } from "../constants";

const Auth = ({ component: Component, path, exact }) => {
  const token = sessionStorage.getItem(TOKEN);
  return (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !token ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />)
  };

const Protected = ({ component: Component, path, exact }) => {
  const expiration = sessionStorage.getItem(EXPIRATION);

  return (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      new Date().toLocaleString() < expiration ? <Component {...props} /> : <Redirect to="/" />
    }
  />)
  };

export const ProtectedRoute = withRouter(Protected);
export const AuthRoute = withRouter(Auth);