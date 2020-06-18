import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from './landing_page';
import Login from './login';
import Signup from './signup';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
    </Switch>
  </BrowserRouter>
)

export default App;