import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import SplashPage from './splash_page';

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={SplashPage}/>
    </Switch>
  </HashRouter>
);

export default App;