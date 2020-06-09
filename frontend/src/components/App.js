import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from './landing_page';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
    </Switch>
  </BrowserRouter>
)

export default App;