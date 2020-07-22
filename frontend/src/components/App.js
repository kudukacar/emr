import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './landing_page';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import { ProtectedRoute } from '../services/protected_route';
import { AuthRoute } from "../services/auth_route";
import Authenticator from "../services/authenticator";

const authenticator = new Authenticator(sessionStorage);

const App = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <AuthRoute exact path="/login" component={Login} authenticator={authenticator} />
    <AuthRoute exact path="/signup" component={Signup} authenticator={authenticator}/>
    <ProtectedRoute exact path="/dashboard" component={Dashboard} authenticator={authenticator}/>
  </Switch>
);

export default App;