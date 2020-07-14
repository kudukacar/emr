import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './landing_page';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import { ProtectedRoute, AuthRoute } from '../util/route_util';

const App = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <AuthRoute exact path="/login" component={Login} />
    <AuthRoute exact path="/signup" component={Signup} />
    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
  </Switch>
);

export default App;