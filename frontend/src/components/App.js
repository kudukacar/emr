import React from 'react';
import { Route, Switch, HashRouter } from "react-router-dom";
import LandingPage from './landing_page';

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
    </Switch>
  </HashRouter>
)

export default App;